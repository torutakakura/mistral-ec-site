"use client";

import useStore from "@/store";
import Link from "next/link";
import { FC, useEffect } from "react";
import { useSupabase } from "../supabase-provider";
import { useAddress } from "@/hooks/useAddress";


type Props = {
  listType: string;
}

const DeliveryAddresses: FC<Props> = (props) => {
  const { listType } = props;
  const { deliveryAddresses, setDeliveryAddresses } = useAddress();
  const { user } = useStore();
  const { supabase } = useSupabase();

  useEffect(() => {
    if (user.id) {
      // 住所一覧取得
      const getAddresses = async () => {
        const { data: addressesData, error } = await supabase
          .from("addresses")
          .select()
          .eq("user_id", user.id)
          .eq("is_ordered", false)
          .order("id", { ascending: true });

        // 住所一覧取得失敗
        if (error) {
          alert(error.message);
          return;
        }
        setDeliveryAddresses(addressesData);
      };
      getAddresses();
    }
  }, [user]);
  
  return (
    <div className="px-8 max-w-[1040px] mx-auto">
      <section className="my-12">
        <h1 className="mb-20">アドレス帳</h1>
        <div className="my-12 flex flex-row justify-between flex-wrap gap-3">
          <div>
            <p>全 {deliveryAddresses.length} 件を表示しています。</p>
            <div className="flex gap-4">
              <label htmlFor="inputPassword6" className="block">
                表示件数:
              </label>
              <div>
                <select className="rounded border border-gray-300">
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                </select>
              </div>
            </div>
          </div>
          {listType === "select" ? (
            null
          ) : (
            <div>
              <Link
                href="/new_delivery_address"
                className="p-4 text-xl 376px:text-xl inline-block text-center w-44 bg-red-700 text-white font-semibold rounded-md hover:opacity-80"
              >
                アドレスを追加
              </Link>
            </div>
          )}
        </div>
        {deliveryAddresses?.length ? (
          <div className="grid grid-cols-1 560px:grid-cols-3 gap-8 mb-12">
            {deliveryAddresses?.map((item, idx) => (
              <div
                key={idx}
                className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.name}
                </h5>
                <hr />
                <ul className="mt-4 leading-normal">
                  <li>〒 {item.postcode}</li>
                  <li>{`${item.prefecture}${item.city_street_address}${item.building_apartment}`}</li>
                  <li>電話番号：{item.phone_number}</li>
                  <li>会社・部署名：{item.company_department}</li>
                  <li>
                    宅配BOX：{item.use_postbox ? "不在時に宅配BOXを利用" : ""}
                  </li>
                </ul>
                <div className="my-12 flex justify-center gap-12">
                  {listType === "select" ? (
                    <div>
                      <Link
                        href={{
                          pathname: "order_form",
                          query: { address_id: item.id },
                        }}
                        className="inline-block text-center w-36 p-4 text-xl 376px:text-xl 560px:text-2xl border border-gray-400 rounded-md"
                      >
                        選択
                      </Link>
                    </div>
                  ) : (
                    <>
                    <div>
                      <Link
                        href={{
                          pathname: "address_delete_confirm",
                          query: { address_id: item.id },
                        }}
                        className="inline-block text-center w-36 p-4 text-xl 376px:text-xl 560px:text-2xl border border-gray-400 rounded-md"
                      >
                        削除
                      </Link>
                    </div>
                    <div>
                      <Link
                        href={{
                          pathname: "new_delivery_address",
                          query: { address_id: item.id },
                        }}
                        className="inline-block text-center w-36 p-4 text-xl 376px:text-xl 560px:text-2xl bg-red-700 text-white font-semibold rounded-md"
                      >
                        変更
                      </Link>
                    </div>
                    </>
                  )}                  
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center border border-gray-300 text-center rounded-lg p-8 min-h-[120px]">
            <p>アドレス情報がありません</p>
          </div>          
        )}
        <div className="my-12 flex justify-center gap-12">
          <div>
            {listType === "select" ? (
              <Link
                href="/order_form"
                className="p-4 text-xl 376px:text-xl 560px:text-2xl border inline-block text-center w-48 border-gray-400 rounded-md"
              >
                戻る
              </Link>
            ) : (
              <Link
                href="/my_page"
                className="p-4 text-xl 376px:text-xl 560px:text-2xl border inline-block text-center w-48 border-gray-400 rounded-md"
              >
                マイページへ
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeliveryAddresses;
