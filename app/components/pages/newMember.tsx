"use client";

import { useState } from "react";
import { useSupabase } from "../supabase-provider";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

const NewMember = () => {
  const { supabase } = useSupabase();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (password !== rePassword) {
      alert("確認パスワードが一致しませんでした！！");
      return;
    }

    // supabaseサインアップ
    const { error: signupError } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (signupError) {
      alert(signupError.message);
      setLoading(false);
      return;
    }
    // トップページに遷移
    router.push("/signup_complete");
    router.refresh();
    setLoading(false);
  };
  return (
    <div className="px-8 max-w-[1040px] mx-auto">
      <section className="my-12">
        <h1 className="text-center text-4xl mb-8">会員登録</h1>
        <div className="flex justify-around">
          <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-8">
            <div className="mb-4">
              <h2 className="mb-2 font-semibold flex items-center text-3xl">
                はじめてご利用の方
              </h2>
              <p className="text-2xl">
                メールアドレスとパスワードを入力して「送信する」ボタンを教えてください。
                <br />
                メールアドレス宛に確認のメールが配信されます。
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
              <div className="mb-6">
                <label htmlFor="password_confirmation" className="block">
                  パスワード確認:
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  type="password"
                  id="password_confirmation"
                  onChange={(e) => setRePassword(e.target.value)}
                  required
                />
              </div>
              <div className="my-8">
                {loading ? (
                  <button
                    className="w-full py-2 bg-red-700 text-white font-semibold rounded-md hover:opacity-80"
                    type="submit"
                  >
                    <Loading color="white" />
                  </button>
                ) : (
                  <button
                    className="w-full py-2 bg-red-700 text-white font-semibold rounded-md hover:opacity-80"
                    type="submit"
                  >
                    送信する
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewMember;
