"use client";

import Link from "next/link";
import { useState } from "react";
import { useSupabase } from "../supabase-provider";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

type tableDataType = {
  head: string;
  data: Array<string>;
};

const AddressDeleteConfirm = ({
  tableData,
  address_id,
}: {
  tableData: Array<tableDataType>;
  address_id: number;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { supabase } = useSupabase();
  const router = useRouter();

  const onClickDeleteAddress = async () => {
    // ブログ削除
    setLoading(true);

    // supabaseアドレス削除
    const { error } = await supabase
      .from("addresses")
      .delete()
      .eq("id", address_id);

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    toast.success("アドレス情報は正常に削除しました！");
    setTimeout(() => {
      setLoading(false);
      router.push("/delivery_addresses");
      router.refresh();
    }, 1000); // 1秒後に実行    

  };
  return (
    <div className="px-8 max-w-[1040px] mx-auto">
      <section className="my-12">
        <h1 className="mb-8">アドレス帳情報削除</h1>
        <div className="my-12">
          <div className="relative m-4 overflow-x-auto hidden 376px:hidden 560px:block">
            <table className="w-full text-left">
              <tbody>
                {tableData.map((item, idx) => (
                  <tr key={idx}>
                    <th className="p-4 border border-gray-400 bg-gray-200">
                      {item.head}
                    </th>
                    <td className="p-4 border border-gray-400">
                      {item.data.map((sentence) => (
                        <>
                          {sentence}
                          <br />
                        </>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mb-8 relative overflow-x-auto block 376px:block 560px:hidden">
            <table className="table-auto w-full">
              {tableData.map((item, idx) => (
                <tr key={idx}>
                  <th className="block py-2 px-4 text-left border border-gray-400 bg-gray-200 ">
                    {item.head}
                  </th>
                  <td className="block p-4 border border-gray-400 min-h-[44px]">
                    {item.data.map((sentence) => (
                      <>{sentence}<br /></>
                    ))}
                  </td>
                </tr>
              ))}
            </table>
          </div>

          <div className="my-12 flex justify-center gap-12">
            <div>
              <Link
                href="/my_page"
                className="p-4 text-xl 376px:text-xl 560px:text-2xl border inline-block text-center border-gray-400 rounded-md w-48"
              >
                マイページへ
              </Link>
            </div>
            <div>
              <button
                type="button"
                onClick={() => onClickDeleteAddress()}
                className="p-4 text-xl 376px:text-xl 560px:text-2xl inline-block text-center w-44 bg-red-700 text-white font-semibold rounded-md hover:opacity-80"
              >
                削除
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddressDeleteConfirm;
