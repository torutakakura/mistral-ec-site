"use client";

import { BsBoxArrowInRight } from "react-icons/bs";
import Link from "next/link";
import { useState } from "react";
import { useSupabase } from "../supabase-provider";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

const Login = () => {
  const { supabase } = useSupabase();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    console.log(email);
    console.log(password);

    // ログイン処理
    // 認証はクライアントコンポーネントで行う
    const { error: signinError } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (signinError) {
      alert(signinError.message);
      setLoading(false);
      return;
    }

    // トップページ遷移
    window.location.href = "/";
  };
  return (
    <div className="px-8 max-w-[1040px] mx-auto">
      <section className="my-12">
        <h1 className="text-center text-4xl mb-8">ログイン</h1>
        <div className="flex justify-around">
          <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-8">
            <div className="mb-4">
              <h2 className="mb-2 font-semibold flex items-center text-3xl">
                <BsBoxArrowInRight />
                <span className="ml-4">会員の方</span>
              </h2>
              <p className="text-2xl">
                メールアドレスとパスワードを入力して、ログインしてください。
              </p>
            </div>
            <form onSubmit={onSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block">
                  メールアドレス:
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block">
                  パスワード:
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="my-8">
                {loading ? (
                  <button
                  disabled
                  className="w-full py-2 bg-red-700 text-white font-semibold rounded-md hover:opacity-80"
                >
                  <Loading color="white" />
                </button>
                ) : (
                  <button
                    className="w-full py-2 bg-red-700 text-white font-semibold rounded-md hover:opacity-80"
                    type="submit"
                  >
                    ログイン
                  </button>
                )}
              </div>
            </form>
            <p className="mt-4">
              <Link
                className="text-blue-500 hover:underline"
                href="/password_forgot"
              >
                パスワードをお忘れですか？
              </Link>
            </p>
          </div>
        </div>
        <div className="my-6 text-center">
          <Link className="text-blue-500 hover:underline" href="/new_member">
            はじめてご利用の方はこちらへ
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Login;
