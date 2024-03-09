"use client";

import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import Link from "next/link";
import useStore from "@/store";
import { useSupabase } from "../supabase-provider";
import { STEPS, orderTypeItems } from "@/config/config";
import { useEffect, useState } from "react";
import { Order, OrderDeliveryAddressType, paymentMethodsData } from "@/utils/types";
import { BsBank } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import Stepper from 'react-stepper-horizontal';
import Loading from "@/app/loading";
import { useAddress } from "@/hooks/useAddress";
import StepIndicator from "../molecules/stepIndicator";

const OrderConfirm = () => {
  const { user } = useStore();
  const { supabase } = useSupabase();
  const { cart } = useCart();
  const { myprofile, setMyprofile } = useAddress();
  const [ deliveryAddress, setDeliveryAddress ] = useState<OrderDeliveryAddressType>();
  const [orderType, setOrderType] = useState<Order>("Credit-Card");
  const [ paymentMethodId, setPaymentMethodId ] = useState<number>(1);
  const [ paymentData, setPaymentData ] = useState<Array<paymentMethodsData>>();
  const [ shippingMethodId, setShippingMethodId ] = useState<number | null>(null);
  const [ loading, setLoading ] = useState<boolean>(false);
  const elements = useElements();
  const stripe = useStripe();
  const router = useRouter();
  const { removeCartAll } = useCart();
  const [ deliveryfee, setDeliveryfee ] = useState<number>(0);
  const [ totalAmount, setTotalAmount ] = useState<number>(0);
  const [ errorMessageNumber, setErrorMessageNumber ] = useState<string | null>(null);;
  const [ errorMessageExpire, setErrorMessageExpire ] = useState<string | null>(null);;
  const [ errorMessageCvc, setErrorMessageCvc ] = useState<string | null>(null);;

  const stripeStyles = {
    style: {
      base: {
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "16px",
        letterSpacing: "1px",
        color: "#333333",
        "::placeholder": {
          color: "#a9a9a9",
        },
      },
    },
  };

  const onClickOrderDecide = async () => {

    // カード情報のバリデーション
    let token = null;
    if (orderType === 'Credit-Card') {
      const cardNumberElement = elements?.getElement(CardNumberElement!);
      token = await stripe?.createToken(cardNumberElement!);
      if (token.error) {
        if (token.error.code === "incomplete_number") {
          setErrorMessageNumber(token.error.message);
        } else {
          setErrorMessageNumber(null);
        }
        if (token.error.code === "incomplete_expiry") {
          setErrorMessageExpire(token.error.message);
        } else {
          setErrorMessageExpire(null);
        }
        if (token.error.code === "incomplete_cvc") {
          setErrorMessageCvc(token.error.message);
        } else {
          setErrorMessageCvc(null);
        }
        return
      } else {
        setErrorMessageNumber(null);
        setErrorMessageExpire(null);
        setErrorMessageCvc(null);
      }
    }
    
    setLoading(true);
    // 注文詳細、購入数、小計を作成
    let details: string = '';
    cart.forEach((item) => {
      details += `${item.name} 数量: ${item.quantity} 価格: ${item.price}\n`
    });
    details += `送料: ${deliveryfee}円\n`
    details += `小計: ${totalAmount}円\n`

    // 注文API呼び出し
    const orderBody = JSON.stringify({
      amount: totalAmount,
      token: token,
      orderType: orderType,
    });
    const responseOrder = await fetch(`/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: orderBody,
    });
    if (!responseOrder.ok) {
      alert(
        "支払い時にエラーが発生しました。\n下記の電話番号にお問い合わせください。\n090-8504-7816"
      );
      return;
    }
    const responseData = await responseOrder.json();
    console.log(responseData)
    // 支払いレコード挿入
    const { data: paymentData, error: insertPaymentsError } = await supabase.from('payments').insert({
      payment_method_id: paymentMethodId,
      amount: totalAmount,
      status: '支払い完了'
    })
    .select()
    if (insertPaymentsError) {
      alert(insertPaymentsError.message);
      return;
    }

    // 住所情報を新規作成
    let insertData = {
      user_id: user.id,
      name: deliveryAddress?.name,
      name_kana: deliveryAddress?.name_kana,
      postcode: deliveryAddress?.postcode,
      prefecture: deliveryAddress?.prefecture,
      city_street_address: deliveryAddress?.city_street_address,
      building_apartment: deliveryAddress?.building_apartment,
      company_department: deliveryAddress?.company_department,
      phone_number: deliveryAddress?.phone_number,
      is_ordered: true,
      use_postbox: deliveryAddress?.use_postbox,
    }
    const { data: deliveryData, error: insertError } = await supabase.from("addresses").insert(insertData).select();
    if (insertError) {
      alert(insertError.message);
      setLoading(false);
      return;
    }
    // アドレス帳に追加
    if (deliveryAddress?.add_address === 'yes') {
      insertData['is_ordered'] = false;
      const { error: insertError } = await supabase.from("addresses").insert(insertData);
      if (insertError) {
        alert(insertError.message);
        setLoading(false);
        return;
      }
    }

    // 注文レコード挿入
    const { data: orderData, error: insertOrderError } = await supabase.from('orders').insert({
      user_id: user.id,
      charge_id: orderType === 'PayPay' ? responseData.result.data.merchantPaymentId : responseData.result.id,
      payment_id: paymentData[0].id,
      shipping_method_id: shippingMethodId,
      payment_method_id: paymentMethodId,
      delivery_id: deliveryData[0].id,
      delivery_date: deliveryAddress?.delivery_date,
      delivery_time: deliveryAddress?.delivery_time,      
      what_using: deliveryAddress?.what_using,
      order_request: deliveryAddress?.order_request,
      order_status: '支払い完了',
    })
    .select()
    if (insertOrderError) {
      alert(insertOrderError.message);
      return;
    }

    for (let i=0; cart.length > i; i++) {
      const { error: insertOrderItemError } = await supabase.from('order_items').insert({
        order_id: orderData[0].id,
        product_id: cart[i].id,
        quantity: cart[i].quantity,
        delivery_status: 1,
        price: Number(cart[i].price) * Number(cart[i].quantity)
      })
      if (insertOrderItemError) {
        alert(insertOrderItemError.message);
        return;
      }
    }
    
    const orderNotificationBody = JSON.stringify({
      // ご注文者様 情報
      name: myprofile?.name,
      nameKana: myprofile?.name_kana,
      email: myprofile?.email,
      address: `〒${myprofile?.postcode} ${myprofile?.prefecture}${myprofile?.city_street_address}${myprofile?.building_apartment}`,
      companyDepartment: myprofile?.company_department,
      phoneNumber: myprofile?.phone_number,
      // お届け先 情報
      toName: deliveryAddress?.name,
      toNameKana: deliveryAddress?.name_kana,
      toAddress: `〒${deliveryAddress?.postcode} ${deliveryAddress?.prefecture}${deliveryAddress?.city_street_address}${deliveryAddress?.building_apartment}`,
      toCompanyDepartment: deliveryAddress?.company_department,
      toPhoneNumber: deliveryAddress?.phone_number,
      usePostbox: deliveryAddress?.use_postbox ? "不在時は宅配ボックスを利用" : "",
      orderRequest: deliveryAddress?.order_request,
      whatUsing: deliveryAddress?.what_using,
      deliveryDate: deliveryAddress?.delivery_date,
      deliveryTime: deliveryAddress?.delivery_time,
      // 注文詳細
      details: details
    });
    // 注文通知API呼び出し
    const response = await fetch('/api/order_notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: orderNotificationBody,
    });
    if (!response.ok) {
      alert("エラーが発生しました。\n下記の電話番号にお問い合わせください。\n090-8504-7816");
      return;
    }

    removeCartAll();
    if (orderType === 'PayPay') {
      // QRコードのURLを取得
      const qrUrl = responseData.result.data.url;
      // QRコード決済画面へ遷移
      window.location.href = qrUrl;
    } else {
      router.push("/order_complete");
      router.refresh();
    }
  }

  const onChnagePaymentMenthods = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderType(e.target.value as Order);
    const paymentDetails = paymentData?.find((item) => (
      item.name === e.target.value
    ))
    setPaymentMethodId(Number(paymentDetails?.id))
  }

  useEffect(() => {
    // セッションから取得したご注文者様データを設定
    const myaddress_jsonStr = sessionStorage.getItem("myaddress");
    const sesstionMyaddress = JSON.parse(myaddress_jsonStr as string);
    setMyprofile(sesstionMyaddress);
    // セッションから取得したお届け先データを設定
    const delivery_address_jsonStr = sessionStorage.getItem("delivery_address");
    const sessionDeliveryAddress = JSON.parse(delivery_address_jsonStr as string);
    setDeliveryAddress(sessionDeliveryAddress);
    let boughtDetails: string = '';
    let productAmount: number = 0;
    cart.forEach((item) => {
      boughtDetails += `${item.name} 価格: ${item.price} 数量: ${item.quantity}\n`
      productAmount += Number(item.price) * Number(item.quantity);
    });
    if (user.id) {
      // 配送情報を取得
      const getShipingMethods = async () => {
        const { data: shipingMethodsData, error } = await supabase
          .from("shipping_methods")
          .select("*")
          .order("id", { ascending: true });
          if (error) {
            alert(error.message);
            return;
          }
          const shippingDetails = shipingMethodsData?.find((item) => (
            item.prefecture === sesstionMyaddress.prefecture
          ));
          setDeliveryfee(Number(shippingDetails.price));
          console.log(Number(shippingDetails.price) + productAmount)
          setTotalAmount(Number(shippingDetails.price) + productAmount);
          setShippingMethodId(Number(shippingDetails.id));
      };
      getShipingMethods();
      // 支払い方法を取得
      const getPaymentMethods = async () => {
        const { data: paymentMethodsData, error } = await supabase
          .from("payment_methods")
          .select("*")
          .order("id", { ascending: true });
        if (error) {
          alert(error.message);
          return;
        }
        setPaymentData(paymentMethodsData);
      };
      getPaymentMethods();
    }
  }, [user, cart])

  return (
    <div className="px-8 max-w-[1040px] mx-auto">
      <h1 className="mt-8 560px:text-5xl">ご注文内容確認</h1>
      <div className="my-12">
        <div className="flex flex-col ml-4 376px:hidden">
            {STEPS.map((item, index) => (
              <div key={index}>
                <StepIndicator
                  step={index + 1}
                  label={item.title}
                  active={index === 3}
                  completed={index < 3}
                  isLast={STEPS.length -1 === index}
                />
              </div>
            ))}
          </div>        
          <div className="hidden 376px:flex justify-around">
              <div className="w-full">
                <Stepper
                  steps={STEPS}
                  activeStep={3}
                  activeColor="rgb(21 128 61)"
                  completeColor="rgb(21 128 61)"
                />
              </div>
          </div>
        </div>           
      <section className="my-12 w-full">
        
      <div className="mb-20 leading-relaxed">
          <h2 className="mb-6 font-semibold leading-7 text-gray-900">
            ご注文品詳細
          </h2>
          <div className="my-12">
            <div className="relative m-4 overflow-x-auto hidden 376px:hidden 560px:block">
              <table className="w-full text-left">
                <tbody>
                  <tr>
                    <th className="p-4 border border-gray-400 bg-gray-200 w-96">
                      商品
                    </th>
                    <td className="p-4 border border-gray-400">
                      {cart.map((item, index) => (
                        <ul key={index} className="text-right grid grid-rows-1 grid-cols-3 ">
                          <li className="text-left">{item.name}</li>
                          <li className="text-center">数量: {item.quantity}</li>
                          <li className="text-right">
                            {item.price}円
                            <span className="text-xl">（税込み）</span>
                          </li> 
                        </ul>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <th className="p-4 border border-gray-400 bg-gray-200 w-96">
                      送料
                    </th>
                    <td className="p-4 border border-gray-400 text-right">
                     {deliveryfee} 円
                     <span className="text-xl">（税込み）</span>
                    </td>
                  </tr>
                  <tr>
                    <th className="p-4 border border-gray-400 bg-gray-200 w-96">
                      小計
                    </th>
                    <td className="p-4 border border-gray-400 text-right text-red-600">
                      <span>{totalAmount}円</span>
                      <span className="text-xl">（税込み）</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mb-8 relative block 376px:block 560px:hidden">
              <div className="mb-2">
                <h3 className="font-semibold before:border-l-8 before:border-red-500 before:mr-3">
                  商品詳細
                </h3>
                <p className="font-normal pl-6">
                {cart.map((item, index) => (
                    <p key={index}>
                      {item.name}　数量: {item.quantity}　
                        {item.price}円　<span className="text-xl">(税込み)</span>
                    </p>
                  ))}
                </p>
              </div>
              <div className="mb-2">
                <h3 className="font-semibold before:border-l-8 before:border-red-500 before:mr-3">
                  送料
                </h3>
                <p className="font-normal pl-6">
                  {deliveryfee} 円
                  <span className="text-xl">（税込み）</span>
                </p>
              </div>
              <div className="mb-2">
                <h3 className="font-semibold before:border-l-8 before:border-red-500 before:mr-3">
                  小計
                </h3>
                <p className="pl-6 text-red-600">
                  <span>{totalAmount} 円</span>
                  <span className="text-xl">（税込み）</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-20 leading-relaxed">
          <h2 className="mb-6 font-semibold leading-7 text-gray-900">
            ご注文者情報
          </h2>
          <div className="my-12">
            <div className="relative m-4 overflow-x-auto hidden 376px:hidden 560px:block">
              <table className="w-full text-left">
                <tbody>
                  <tr>
                    <th className="p-4 border border-gray-400 bg-gray-200 w-96">
                      氏名（漢字）
                    </th>
                    <td className="p-4 border border-gray-400">
                      {myprofile?.name}
                    </td>
                  </tr>
                  <tr>
                    <th className="p-4 border border-gray-400 bg-gray-200 w-96">
                      氏名（カナ）
                    </th>
                    <td className="p-4 border border-gray-400">
                      {myprofile?.name_kana}
                    </td>
                  </tr>
                  <tr>
                    <th className="p-4 border border-gray-400 bg-gray-200 w-96">
                      メールアドレス
                    </th>
                    <td className="p-4 border border-gray-400">
                      {myprofile?.email}
                    </td>
                  </tr>
                  <tr>
                    <th className="p-4 border border-gray-400 bg-gray-200 w-96">
                      住所
                    </th>
                    <td className="p-4 border border-gray-400">
                      {`〒${myprofile?.postcode} ${myprofile?.prefecture}${myprofile?.city_street_address}${myprofile?.building_apartment}`}
                    </td>
                  </tr>
                  {myprofile?.company_department && (
                    <tr>
                      <th className="p-4 border border-gray-400 bg-gray-200 w-96">
                        会社・部署名
                      </th>
                      <td className="p-4 border border-gray-400">
                        {myprofile?.company_department}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <th className="p-4 border border-gray-400 bg-gray-200 w-96">
                      電話番号
                    </th>
                    <td className="p-4 border border-gray-400">
                      {myprofile?.phone_number}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mb-8 relative overflow-x-auto block 376px:block 560px:hidden">
              <div className="mb-2">
                <h3 className="font-semibold before:border-l-8 before:border-red-500 before:mr-3">
                  氏名（漢字）
                </h3>
                <p className="font-normal pl-6">{myprofile?.name}</p>
              </div>
              <div className="mb-2">
                <h3 className="font-semibold before:border-l-8 before:border-red-500 before:mr-3">
                  氏名（カナ）
                </h3>
                <p className="font-normal pl-6">{myprofile?.name_kana}</p>
              </div>
              <div className="mb-2">
                <h3 className="font-semibold before:border-l-8 before:border-red-500 before:mr-3">
                  メールアドレス
                </h3>
                <p className="font-normal pl-6">{myprofile?.email}</p>
              </div>
              <div className="mb-2">
                <h3 className="font-semibold before:border-l-8 before:border-red-500 before:mr-3">
                  住所
                </h3>
                <p className="font-normal pl-6">{`〒${myprofile?.postcode} ${myprofile?.prefecture}${myprofile?.city_street_address}${myprofile?.building_apartment}`}</p>
              </div>
              {deliveryAddress?.company_department !== "" && (
                <div className="mb-2">
                  <h3 className="font-semibold before:border-l-8 before:border-red-500 before:mr-3">
                    会社・部署名
                  </h3>
                  <p className="font-normal pl-6">
                    {myprofile?.company_department}
                  </p>
                </div>
              )}
              <div className="mb-2">
                <h3 className="font-semibold before:border-l-8 before:border-red-500 before:mr-3">
                  電話番号
                </h3>
                <p className="font-normal pl-6">
                  {myprofile?.phone_number}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-20 leading-relaxed">
          <h2 className="mb-6 font-semibold leading-7 text-gray-900">
            お届け先情報
          </h2>
          <div className="my-12">
            <div className="relative m-4 overflow-x-auto hidden 376px:hidden 560px:block">
              <table className="w-full text-left">
                <tbody>
                  <tr>
                    <th className="p-4 border border-gray-400 bg-gray-200 w-96">
                      氏名（漢字）
                    </th>
                    <td className="p-4 border border-gray-400">
                      {deliveryAddress?.name}
                    </td>
                  </tr>
                  <tr>
                    <th className="p-4 border border-gray-400 bg-gray-200 w-96">
                      氏名（カナ）
                    </th>
                    <td className="p-4 border border-gray-400">
                      {deliveryAddress?.name_kana}
                    </td>
                  </tr>
                  <tr>
                    <th className="p-4 border border-gray-400 bg-gray-200 w-96">
                      住所
                    </th>
                    <td className="p-4 border border-gray-400">
                      {`〒${deliveryAddress?.postcode} ${deliveryAddress?.prefecture}${deliveryAddress?.city_street_address}${deliveryAddress?.building_apartment}`}
                    </td>
                  </tr>
                  {deliveryAddress?.company_department !== "" && (
                    <tr>
                      <th className="p-4 border border-gray-400 bg-gray-200 w-96">
                        会社・部署名
                      </th>
                      <td className="p-4 border border-gray-400">
                        {deliveryAddress?.company_department}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <th className="p-4 border border-gray-400 bg-gray-200 w-96">
                      電話番号
                    </th>
                    <td className="p-4 border border-gray-400">
                      {deliveryAddress?.phone_number}
                    </td>
                  </tr>
                  <tr>
                    <th className="p-4 border border-gray-400 bg-gray-200 w-96">
                      宅配Box
                    </th>
                    <td className="p-4 border border-gray-400">
                      {deliveryAddress?.use_postbox
                        ? "不在時に宅配ボックスを利用"
                        : ""}
                    </td>
                  </tr>
                  <tr>
                    <th className="p-4 border border-gray-400 bg-gray-200 w-96">
                      ご利用の用途
                    </th>
                    <td className="p-4 border border-gray-400">
                      {deliveryAddress?.what_using}
                    </td>
                  </tr>
                  <tr>
                    <th className="p-4 border border-gray-400 bg-gray-200 w-96">
                      ご要望
                    </th>
                    <td className="p-4 border border-gray-400">
                      {deliveryAddress?.order_request}
                    </td>
                  </tr>                  
                  <tr>
                    <th className="p-4 border border-gray-400 bg-gray-200 w-96">
                      お届け希望日時
                    </th>
                    <td className="p-4 border border-gray-400">
                    {deliveryAddress?.delivery_date} {deliveryAddress?.delivery_time}
                    </td>
                  </tr>
                  <tr>
                    <th className="p-4 border border-gray-400 bg-gray-200 w-96">
                      アドレス帳に追加
                    </th>
                    <td className="p-4 border border-gray-400">
                      {deliveryAddress?.add_address === "yes"
                        ? "追加"
                        : "追加しない"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mb-8 relative overflow-x-auto block 376px:block 560px:hidden">
              <div className="mb-2">
                <h3 className="font-semibold before:border-l-8 before:border-red-500 before:mr-3">
                  氏名（漢字）
                </h3>
                <p className="font-normal pl-2">{deliveryAddress?.name}</p>
              </div>
              <div className="mb-2">
                <h3 className="font-semibold before:border-l-8 before:border-red-500 before:mr-3">
                  氏名（カナ）
                </h3>
                <p className="font-normal pl-2">{deliveryAddress?.name_kana}</p>
              </div>
              <div className="mb-2">
                <h3 className="font-semibold before:border-l-8 before:border-red-500 before:mr-3">
                  住所
                </h3>
                <p className="font-normal pl-2">{`〒${deliveryAddress?.postcode} ${deliveryAddress?.prefecture}${deliveryAddress?.city_street_address}${deliveryAddress?.building_apartment}`}</p>
              </div>
              {deliveryAddress?.company_department !== "" && (
                <div className="mb-2">
                  <h3 className="font-semibold before:border-l-8 before:border-red-500 before:mr-3">
                    会社・部署名
                  </h3>
                  <p className="font-normal pl-2">
                    {deliveryAddress?.company_department}
                  </p>
                </div>
              )}
              <div className="mb-2">
                <h3 className="font-semibold before:border-l-8 before:border-red-500 before:mr-3">
                  電話番号
                </h3>
                <p className="font-normal pl-2">
                  {deliveryAddress?.phone_number}
                </p>
              </div>
              <div className="mb-2">
                <h3 className="font-semibold before:border-l-8 before:border-red-500 before:mr-3">
                  宅配Box
                </h3>
                <p className="font-normal pl-2">
                  {deliveryAddress?.use_postbox
                    ? "不在時に宅配ボックスを利用"
                    : ""}
                </p>
              </div>
              <div className="mb-2">
                <h3 className="font-semibold before:border-l-8 before:border-red-500 before:mr-3">
                  ご利用の用途
                </h3>
                <p className="font-normal pl-2">
                  {deliveryAddress?.what_using}
                </p>
              </div>
              <div className="mb-2">
                <h3 className="font-semibold before:border-l-8 before:border-red-500 before:mr-3">
                  ご要望
                </h3>
                <p className="font-normal pl-2">
                  {deliveryAddress?.order_request}
                </p>
              </div>
              <div className="mb-2">
                <h3 className="font-semibold before:border-l-8 before:border-red-500 before:mr-3">
                  お届け希望日時
                </h3>
                <p className="font-normal pl-2">
                {deliveryAddress?.delivery_date} {deliveryAddress?.delivery_time}
                </p>
              </div>
              <div className="mb-2">
                <h3 className="font-semibold before:border-l-8 before:border-red-500 before:mr-3">
                  アドレス帳に追加
                </h3>
                <p className="font-normal pl-2">
                  {deliveryAddress?.add_address === "yes"
                    ? "追加"
                    : "追加しない"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-12 leading-relaxed">
          <h2 className="mb-6 font-semibold leading-7 text-gray-900">
            お支払情報
          </h2>
          <div className="my-12">
            <div className="p-2">
              {orderTypeItems.map((item, idx) => (
                <div key={idx} className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="card"
                    name="orderType"
                    value={item.value}
                    className="mr-2"
                    checked={item.value == orderType}
                    required
                    onChange={(e) => onChnagePaymentMenthods(e)}
                  />
                  <label htmlFor="card" className="mr-4">
                    {item.label}
                  </label>
                  {item.imgPath ? (
                    <img
                      src={item.imgPath}
                      width={item.width}
                      height="auto"
                    />
                  ) : (
                    <BsBank className="text-gray-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border p-8">
          {orderType == "Credit-Card" && (
            <>
              <div className="mb-6">
                <label htmlFor="addToAddressBookYes">カード番号</label>
                <CardNumberElement
                  className="base-stripe w256"
                  options={stripeStyles}
                />
                {errorMessageNumber && <div className="my-3 text-[12px] text-red-500">{errorMessageNumber}</div>}
              </div>
              <div className="mb-6">
                <label htmlFor="addToAddressBookYes">有効期限</label>
                <CardExpiryElement
                  className="base-stripe w144"
                  options={stripeStyles}
                />
                {errorMessageExpire && <div className="my-3 text-[12px] text-red-500">{errorMessageExpire}</div>}
              </div>
              <div className="mb-6">
                <label htmlFor="addToAddressBookYes">
                  セキュリティコード
                </label>
                <CardCvcElement
                  className="base-stripe w144"
                  options={stripeStyles}
                />
                {errorMessageCvc && <div className="my-3 text-[12px] text-red-500">{errorMessageCvc}</div>}
              </div>
            </>
          )}
          {orderType == "PayPay" && (
            <>
              <div className="mb-4">
                <h4>【PayPayでのお支払について】</h4>
                <p>
                  「注文を確定」ボタンをクリックしてください。クリック後、自動的にPayPayの決済画面に遷移し、お客様が登録されているPayPayアカウントを利用して決済が行われます。
                  お支払いの確認が取れ次第、商品の発送手続きを進めさせて頂きます。ご不明な点がございましたら、お気軽に弊社までお問い合わせください。
                </p>
              </div>
              <div className="mb-4">
                <h4>【ご注意事項】</h4>
                <ul className="ml-4 pl-12 list-disc list-outside">
                  <li>
                    ご注文内容を最終確認いただいた上で、「注文を確定」ボタンをクリックしてください。クリック後、自動的にPayPayの決済画面に遷移し、お客様が登録されているPayPayアカウントを利用して決済が行われます。
                  </li>
                  <li>
                    決済の際、PayPay残高や連携されたクレジットカード、デビットカードなどから自動的に引き落としが行われます。
                    <br />
                    ご利用可能な支払い方法を事前にご確認ください。
                  </li>
                </ul>
              </div>
            </>
          )}
          {/* {orderType == "bank" && (
            <>
              <div className="mb-4">
                <h4>【口座振込みについて】</h4>
                <p>
                  ご注文が確定次第、お客様の登録メールアドレス宛に振込先の口座情報をお送りいたします。メールに記載されている口座情報を確認の上、指定の金額をお振込みください。お振込みが確認でき次第、商品の発送手続きを進めさせていただきます。
                  振込先の口座情報が記載されたメールをお待ちいただき、お手続きをお願いいたします。ご不明な点がございましたら、お気軽に弊社までお問い合わせください。
                </p>
              </div>
              <div className="mb-4">
                <h4>【ご注意事項】</h4>
                <ul className="ml-4 pl-12 list-disc list-outside">
                  <li>
                    お振込み手数料はお客様負担となりますので、ご了承ください。
                  </li>
                  <li>
                    お振込みの際は、お客様情報（お名前、ご注文番号等）をお振込み時の通信欄に記載いただくようお願いいたします。
                    <br />
                    これにより、お支払いの確認がスムーズに行われます。
                  </li>
                  <li>
                    ご注文確定後、5日以内にお振込みをお願いいたします。5日を過ぎてもお振込みが確認できない場合、ご注文をキャンセルさせていただくことがございます。
                  </li>
                </ul>
              </div>
            </>
          )} */}          
        </div>
        <div className="my-12 flex justify-center gap-12">
          <div>
            <Link
              aria-disabled={loading}
              href={{ pathname: "order_form" }}
              className="inline-block w-56 text-center p-4 text-xl 376px:text-xl 560px:text-2xl border border-gray-400 rounded-md bg-gray-100"
            >
              入力画面へ戻る
            </Link>
          </div>
          <div>
            {loading ? (
            <button
              disabled
              className="inline-block w-44 text-center p-4 text-xl 376px:text-xl 560px:text-2xl bg-red-700 text-white font-semibold rounded-md"
              >
              <Loading color="white" />
            </button>
            ) : (
            <button
              onClick={() => onClickOrderDecide()}
              className="inline-block w-44 text-center p-4 text-xl 376px:text-xl 560px:text-2xl bg-red-700 text-white font-semibold rounded-md"
            >
              注文を確定
            </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderConfirm;
