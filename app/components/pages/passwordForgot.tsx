"use client";

import { useState } from "react";

const PasswordForgot = () => {
  const [email, setEmail] = useState<string>("");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email);
  };
  return (
    <div className="px-8 max-w-[1040px] mx-auto">
      <section className="my-12">
        <h1 className="text-center text-4xl mb-8">パスワードをお忘れの方</h1>
        <div className="flex justify-around">
          <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-8">
            <div className="mb-8">
              <p className="text-2xl">
                メールアドレスを入力して「送信する」ボタンを押してください。
                <br />
                登録されているメールアドレス宛にメールが送信されます。
                <br />
                URLをクリックしパスワード変更画面からパスワードを変更してください。
              </p>
            </div>
            <form onSubmit={onSubmit}>
              <div className="mb-8">
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
                <button
                  className="w-full py-2 bg-red-700 text-white font-semibold rounded-md hover:opacity-80"
                  type="submit"
                >
                  送信
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PasswordForgot;
