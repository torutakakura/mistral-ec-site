"use client";

import Loading from "@/app/loading";
import Link from "next/link";
import { useState } from "react";
import { useSupabase } from "../supabase-provider";
import { useRouter } from "next/navigation";
import useStore from "@/store";

const MyPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { supabase } = useSupabase();
  const router = useRouter();
  const { user } = useStore();

  const onClickLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
    setLoading(false);
  };

  return (
    <div className="px-8 max-w-[1040px] mx-auto">
      <section className="my-12">
        <h1 className="mb-8">マイページ</h1>
        <div className="flex justify-between">
          <h3>{user.name ? user.name : user.email} 様のマイページ</h3>
          <div>
            {loading ? (
              <button
                type="button"
                disabled
                className="py-2 px-4 text-xl font-semibold 376px:text-xl 560px:text-2xl border border-red-400 rounded-md hover:opacity-80 text-red-600"
              >
                <Loading color="red" />
              </button>              
            ) : (
              <button
                type="button"
                onClick={onClickLogout}
                className="py-2 px-4 text-xl font-semibold 376px:text-xl 560px:text-2xl border border-red-400 rounded-md hover:opacity-80 text-red-600"
              >
                ログアウト
              </button>
            )}
          </div>
        </div>
        <div className="my-12">
          <div className="grid grid-cols-1 560px:grid-cols-3 gap-8 mb-12">
            <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                会員情報
              </h5>
              <hr />
              <div className="flex flex-col">
                <Link
                  href="/member_edit"
                  className="mt-3 font-normal text-gray-700 dark:text-gray-400"
                >
                  会員情報の確認・編集
                </Link>
                <Link
                  href="/change_email"
                  className="mt-3 font-normal text-gray-700 dark:text-gray-400"
                >
                  メールアドレス変更
                </Link>
                <Link
                  href="/change_password"
                  className="mt-3 font-normal text-gray-700 dark:text-gray-400"
                >
                  パスワード変更
                </Link>
              </div>
            </div>
            <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                お届け先情報
              </h5>
              <hr />
              <div className="flex flex-col">
                <Link
                  href="/delivery_addresses"
                  className="mt-3 font-normal text-gray-700 dark:text-gray-400"
                >
                  登録済アドレス一覧
                </Link>
                <Link
                  href="/new_delivery_address"
                  className="font-normal text-gray-700 dark:text-gray-400"
                >
                  アドレス新規追加
                </Link>
              </div>
            </div>
            <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                注文履歴
              </h5>
              <hr />
              <Link
                href="/order_history"
                className="mt-3 font-normal text-gray-700 dark:text-gray-400"
              >
                注文履歴参照
              </Link>
            </div>
          </div>
          <div className="">
            <Link
              href="/"
              className="mt-3 font-normal text-gray-700 dark:text-gray-400"
            >
              退会手続きはこちら ＞
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyPage;
