"use client";

import useStore from "@/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSupabase } from "../supabase-provider";
import { orderDataType, orderHistory, orderItemDetail } from "@/utils/types";
import { format, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';

const OrderHistory = () => {
  const { user } = useStore();
  const { supabase } = useSupabase();
  const [ orderHistories, setOrderHistories ] = useState<Array<orderHistory>>([]) 


  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, 'yyyy/M/d(E)', { locale: ja });
  }

  useEffect(() => {
    if (user.id) {
      (async () => {
        const orderData = await getOrderData();
        const orderHistoryData: Array<orderHistory> = []
        for (let i = 0; i < orderData.length; i++) {
          const orderItems = await getOrderItemData(orderData[i] as orderDataType);
          const address = orderData[i].addresses as { name: string };
          const payment = orderData[i].payments as { amount: number };
          orderHistoryData.push({
            orderedDate: formatDate(orderData[i].created_at), 
            totalAmount: payment.amount,
            deliveryDate: orderData[i].delivery_date,
            deliveryTime: orderData[i].delivery_time,
            deliveryName: address.name,
            orderId: orderData[i].id, 
            chargeId: orderData[i].charge_id, 
            orderStatus: orderData[i].order_status,
            orderedItems: orderItems
          })
        }
        setOrderHistories(orderHistoryData);
      })()
    }
  }, [user])

  // 配送情報を取得
  const getOrderData = async () => {
    const { data: ordersData, error } = await supabase
      .from("orders")
      .select(`
        id,
        charge_id,
        delivery_id,
        payment_id,
        delivery_date,
        delivery_time,
        order_status,
        created_at,
        payments: payment_id (
          amount
        ),
        addresses: delivery_id (
          name
        )
      `)
      .eq("user_id", user.id)
      .order("id", { ascending: false });
      if (error) {
        alert('test')
        alert(error.message);
        return [];
      }
      return ordersData
  };

  const getOrderItemData = async (orderData: orderDataType) => {
    const { data: orderItemsData, error } = await supabase
      .from("order_items")
      .select(`
        id,
        order_id,
        product_id,
        quantity,
        price,
        delivery_status,
        products: product_id (
          name,
          apeal,
          image,
          price
        )
      `)
      .eq('order_id', orderData.id)
      .order("id", { ascending: true });
    if (error) {
      alert(error.message);
      return [];
    }
    
    const orderItems: Array<orderItemDetail> = []
    orderItemsData.forEach((item) => {
      const product = item.products as { name: string, apeal: string, image: string, price: number };
      orderItems.push({
        apeal: product.apeal,
        name: product.name,
        quantities: item.quantity,
        imgUrl: `${process.env.NEXT_PUBLIC_SUPABASE_BUCKETS_URL}products/${product.image.replace(/-\d+\.webp$/, "")}/${product.image}`,
        url: `/product_detail/${item.product_id}`,
        price: product.price,
        deliveryStatus: item.delivery_status,
      })
    })
    return orderItems
  };

  return (
    <div className="px-8 max-w-[1040px] mx-auto">
      <section className="my-12">
        <h1 className="mb-8">注文履歴</h1>
        {orderHistories.length ? (
          <div className="flex flex-col">
            {orderHistories.map((order, index) => (
              <div key={index} className="w-full text-xl border-x border-t border-gray-300 rounded-lg mb-10">
                  <div className="560px:hidden px-6 pt-2 border bg-gray-100" style={{ captionSide: 'top' }}>
                    <div className="text-left">
                      <dl className="mb-4">
                        <dt className="inline font-semibold">注文番号： </dt>
                        <dd className="inline">{order.orderId}</dd>
                      </dl>
                      <dl className="mb-4">
                        <dt className="inline font-semibold">合計金額： </dt>
                        <dd  className="inline">￥{order.totalAmount}</dd>
                      </dl>
                      <dl className="mb-4">
                        <dt className="inline font-semibold">注文日： </dt>
                        <dd  className="inline">{order.orderedDate}</dd>
                      </dl>
                      <dl className="mb-4">
                        <dt className="inline font-semibold">お届け先： </dt>
                        <dd  className="inline">{order.deliveryName}</dd>
                      </dl>                                                                  
                    </div>
                  </div>                
                <table className="hidden 560px:table w-full text-xl border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th align="left" className="px-6 pt-2 w-[25%]">注文番号</th>
                      <th align="left" className="px-6 pt-2 w-[15%]">合計</th>
                      <th align="left" className="px-6 pt-2 w-[20%]">注文日</th>
                      <th align="left" className="px-6 pt-2 w-[40%]">お届け先</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-100">
                    <tr>
                      <td align="left" className="font-thin px-6 pb-2">{order.orderId}</td>
                      <td align="left" className="font-thin px-6 pb-2">￥{order.totalAmount}</td>
                      <td align="left" className="font-thin px-6 pb-2">{order.orderedDate}</td>
                      <td align="left" className="font-thin px-6 pb-2">{order.deliveryName}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-xl 376px:text-xl 560px:text-xl">
                  {order.orderedItems.map((item, index) => (
                    <div key={index} className="grid grid-cols-1 place-items-center 376px:grid-cols-1 560px:grid-cols-3 560px:gap-8 376px:gap-2 w-full border-b border-gray-300 p-4">
                      <div className="p-4">
                        <img
                          src={`${item.imgUrl}`}
                          alt="注文品"
                          style={{ width: "100%", maxWidth: 120 }}
                        />
                      </div>
                      <div className="flex flex-col mb-4">
                        <h3 className="mb-4">
                          <Link href="/product_detail/1">
                            {item.apeal}
                            <br />
                            {item.name}
                          </Link>
                        </h3>
                        <div className="mb-4">
                          数量： {item.quantities}
                        </div>
                        <div className="mb-4">
                          価格： ￥{item.price}
                        </div>                      
                      </div>
                      <div className="flex flex-col gap-4 w-full">
                        {/* <div>
                          <Link
                            href="order_form"
                            className="inline-block w-full text-center p-4 text-xl 376px:text-xl 560px:text-2xl bg-green-700 text-white font-semibold rounded-md"
                          >
                            領収書ダウンロード
                          </Link>
                        </div> */}
                        <div>
                          <Link
                            href={`${item.url}`}
                            className="inline-block w-full text-center p-4 text-xl 376px:text-xl 560px:text-2xl border border-gray-400 rounded-md"
                          >
                            注文品詳細
                          </Link>
                        </div>
                        {item.deliveryStatus === 1 ? (
                          <div>
                              配達予定日: {order.deliveryDate} {order.deliveryTime}
                          </div>
                        ) : (
                          <div>
                              配達状況： <span className="bg-blue-100 text-blue-800 font-medium px-3 py-1 rounded">配達済み</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center border border-gray-300 text-center rounded-lg p-8 min-h-[120px]">
            <p>注文履歴がありません</p>
          </div>
        )}
        <div className="my-12 flex justify-center gap-12">
          <div>
            <Link
              href="/my_page"
              className="p-4 text-xl 376px:text-xl 560px:text-2xl border inline-block text-center w-48 border-gray-400 rounded-md"
            >
              マイページへ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderHistory;
