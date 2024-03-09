"use client";

import OriginalCard from "../molecules/originalCard";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { productType } from "@/utils/product.types";
import { useSupabase } from "../supabase-provider";
import { useRouter } from "next/navigation";
import Stepper from 'react-stepper-horizontal';
import { STEPS } from "@/config/config";
import StepIndicator from "../molecules/stepIndicator";

const Cart = () => {
  const { cart, removeCart, changeQuantity } = useCart();
  const router = useRouter()
  const [ recommendProducts, setRecommendProducts ] = useState<Array<productType>>()
  const { supabase } = useSupabase();
  const activeStep = 0;

  const calcPrice = () => {
    let sumPrice: number = 0;
    for (let i = 0; i < cart.length; i++) {
      sumPrice = sumPrice + cart[i].price * cart[i].quantity;
    }
    return sumPrice;
  };

  const calcQuantities = () => {
    let sumQuantities: number = 0;
    for (let i = 0; i < cart.length; i++) {
      sumQuantities += cart[i].quantity;
    }
    return sumQuantities;
  };
  
const randomSelect = (array: any, num: number) => {
  let newArray = [];

  while (newArray.length < num && array.length > 0) {
    // 配列からランダムな要素を選ぶ
    const rand = Math.floor(Math.random() * array.length);
    // 選んだ要素を別の配列に登録する
    newArray.push(array[rand]);
    // もとの配列からは削除する
    array.splice(rand, 1);
  }

  return newArray;
};  
  
  useEffect(() => {
    (async () => {
      // products詳細取得
      const { data: productsData } = await supabase
        .from("products")
        .select("*")
        .or(
          `is_recommended.eq.${true}, for_restaurant.eq.${true}, for_present.eq.${true}`
        );

      // productsが存在しない場合
      if (!productsData) return notFound();

      const filterRecommend = productsData?.filter((item) => {
        return item.is_recommended === true;
      });
      const recommendCardData = randomSelect(filterRecommend, 4);
      setRecommendProducts(recommendCardData);
    })();
  }, [])

  const onClickOrderForm = () => {
    sessionStorage.removeItem("myaddress");
    sessionStorage.removeItem("delivery_address");
    router.push("/order_form");
    router.refresh();
  }  

  return (
    <div className="px-8 max-w-[1040px] mx-auto">
      <section className="my-12">
        <h1 className="mb-8">カート</h1>
        <div className="my-12">
        <div className="flex flex-col ml-4 376px:hidden">
            {STEPS.map((item, index) => (
              <div key={index}>
                <StepIndicator
                  step={index + 1}
                  label={item.title}
                  active={index === 0}
                  completed={index < 0}
                  isLast={STEPS.length -1 === index}
                />
              </div>
            ))}
          </div>
          <div className="justify-around hidden 376px:flex">
              <div className="w-full">
                <Stepper
                  steps={STEPS}
                  activeStep={activeStep}
                  activeColor="rgb(21 128 61)"
                />
              </div>
          </div>
        </div>
        <div className="my-12">
          <div className="relative m-4 overflow-x-auto">
            {cart.length ? (
              <table className="w-full text-left">
                <thead className="hidden 376px:hidden 560px:table-header-group">
                  <tr>
                    <th className="p-6 text-center">商品情報</th>
                    <th className="p-6 w-36">価格</th>
                    <th className="p-6 w-36">数量</th>
                    <th className="p-6 w-36"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, idx) => (
                    <tr key={idx}>
                      <td className="text-left p-6 border-b border-t border-grey-500">
                        <div className="flex justify-center gap-8">
                          <div style={{ minWidth: 96 }}>
                            <img
                              src={item.image}
                              alt=""
                              style={{ width: 96, height: "auto" }}
                            />
                          </div>
                          <div className="w-full text-xl 376px:text-xl 560px:text-2xl">
                            <h3 className="mb-4">{item.name}</h3>
                            <p className="mb-4 text-gray-500 w-full text-xl 376px:text-xl 560px:text-2xl">
                              商品の配送は、地震や台風をはじめとする自然災害が発生した場合、配送の遅れや一時的な中断が生じる可能性がございます。予めご理解とご了承のほど、お願い申し上げます。
                            </p>
                            <p className="mb-4">
                              価格 {item.price} 円
                              <span className="text-gray-500 text-lg">
                                （税込）
                              </span>
                            </p>
                            <div className="flex 376px:flex 560px:hidden justify-end items-center gap-4">
                              <div>
                                <label className="inline" htmlFor="productNum">
                                  数量：
                                </label>
                                <select
                                  className="border inline border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 p-2"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    changeQuantity(
                                      item.id,
                                      parseInt(e.target.value)
                                    )
                                  }
                                >
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                  <option value="7">7</option>
                                  <option value="8">8</option>
                                  <option value="9">9</option>
                                  <option value="10">10</option>
                                </select>
                              </div>
                              <button
                                onClick={() => removeCart(item.id)}
                                className="border border-gray-400 p-2"
                                type="button"
                              >
                                削除
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        valign="top"
                        className="text-left p-6 border-b border-t border-grey-500  hidden 376px:hidden 560px:table-cell"
                      >
                        {item.price}円
                      </td>
                      <td
                        valign="top"
                        className="text-left p-6 border-b border-t border-grey-500  hidden 376px:hidden 560px:table-cell"
                      >
                        <select
                          className="border border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 block p-2"
                          value={item.quantity}
                          onChange={(e) =>
                            changeQuantity(item.id, parseInt(e.target.value))
                          }
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                      </td>
                      <td
                        valign="top"
                        className="text-left p-6 border-b border-t border-grey-500  hidden 376px:hidden 560px:table-cell"
                      >
                        <button
                          onClick={() => removeCart(item.id)}
                          className="bg-gray-100 border border-gray-400 rounded-md px-2"
                          type="button"
                        >
                          削除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td
                      align="right"
                      valign="middle"
                      colSpan={4}
                      className="p-6 text-gray-500 text-xl 376px:text-xl 560px:text-2xl"
                    >
                      小計（{calcQuantities()}点）
                      <span className="text-2xl 376px:text-2xl 560px:text-3xl text-red-500">
                        {calcPrice()}
                      </span>
                      （税込）
                    </td>
                  </tr>
                </tfoot>
              </table>
            ) : (
              <div className="flex justify-center items-center border border-gray-300 text-center rounded-lg p-8 min-h-[120px]">
                <p>カートの中身は空です</p>
              </div>              
            )}
          </div>
          <div className="my-12 flex justify-center gap-12">
            <div>
              <Link
                href="/product_list"
                className="p-4 text-xl 376px:text-xl 560px:text-2xl bg-gray-100 border border-gray-400 rounded-md"
              >
                買い物を続ける
              </Link>
            </div>

            <div>
              <button
                type="button"
                disabled={!cart.length}
                onClick={() => onClickOrderForm()}
                className="p-4 text-xl 376px:text-xl 560px:text-2xl bg-red-700 text-white font-semibold rounded-md hover:opacity-80 disabled:bg-gray-500 disabled:hover:opacity-100 disabled:cursor-not-allowed"
              >
                ご注文手続きへ進む
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="my-16">
        <h2 className="text-center my-6">おすすめ商品</h2>
        <div className="grid-rows-1 grid grid-cols-2 760px:grid-cols-4 gap-8">
          {recommendProducts?.map((data, idx) => (
            <OriginalCard
              key={idx}
              apeal={data.apeal}
              productName={data.name}
              price={data.price}
              imgPath={`${process.env.NEXT_PUBLIC_SUPABASE_BUCKETS_URL}products/${data.image.replace(/-\d+\.webp$/, "")}/${data.image}`}
              path={`/product_detail/${data.id}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Cart;
