'use client'

import { Database } from "@/utils/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod'
import Loading from "@/app/loading";

type Schema = z.infer<typeof schema>

// 入力データの検証ルールを定義
const schema = z.object({
    email: z.string().email({ message: 'メールアドレスの形式ではありません。' }),
})

const ChangeEmail = ({ email }: { email: string })  => {
    const router = useRouter();
    const supabase = createClientComponentClient<Database>();
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        // 初期値
        defaultValues: { email: '' },
        // 入力値の検証
        resolver: zodResolver(schema),
      })
    
    const onSubmit: SubmitHandler<Schema> = async (data) => {
        setLoading(true)
    
        try {
          // メールアドレス変更メールを送信
          const { error: updateUserError } = await supabase.auth.updateUser(
            { email: data.email },
            { emailRedirectTo: `${location.origin}/changed_email_confirm` }
          )
    
          // エラーチェック
          if (updateUserError) {
            alert('エラーが発生しました。' + updateUserError.message)
            return
          }
    
          // ログアウト
          const { error: signOutError } = await supabase.auth.signOut()
    
          // エラーチェック
          if (signOutError) {
            alert('エラーが発生しました。' + signOutError.message)
            return
          }
    
          router.push('/changed_email_confirm')
        } catch (error) {
          alert('エラーが発生しました。' + error)
          return
        } finally {
          setLoading(false)
          router.refresh()
        }
    }
    
    return (
      <div className="px-8 max-w-[1040px] mx-auto">
        <section className="my-12">
          <h1 className="mb-8">メールアドレス変更</h1>
          <div className="space-y-12">
            <div className="pb-12">
              <div className="mb-20">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col justify-center items-center"
                >
                  <div className="min-w-[540px] p-16 border rounded-lg">
                    <div className="mb-4">
                      <label
                        htmlFor="currentEmail"
                        className="block font-medium required"
                      >
                        現在のメールアドレス
                      </label>
                      <div className="p-2">
                        <div>{email}</div>
                      </div>
                    </div>                    
                    <div className="mb-4">
                      <label
                        htmlFor="newEmail"
                        className="block font-medium required"
                      >
                        新しいメールアドレス
                      </label>
                      <div className="p-2">
                        <input
                          type="email"
                          id="newEmail"
                          className="w-full px-3 py-1 border border-gray-300 rounded"
                          {...register("email", { required: true })}
                        />
                        <div className="my-3 text-center text-[12px] text-red-500">
                          {errors.email?.message}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="my-12 flex justify-center gap-12">
                    <div>
                      <Link
                        href="/my_page"
                        className="p-4 text-xl 376px:text-xl 560px:text-2xl border inline-block text-center w-48 border-gray-400 rounded-md"
                      >
                        マイページへ
                      </Link>
                    </div>
                    <div>
                      {loading ? (
                        <button
                          type="submit"
                          disabled
                          className="p-4 text-xl 376px:text-xl 560px:text-2xl inline-block text-center w-44 bg-red-700 text-white font-semibold rounded-md hover:opacity-80"
                        >
                          <Loading color="white" />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="p-4 text-xl 376px:text-xl 560px:text-2xl inline-block text-center w-44 bg-red-700 text-white font-semibold rounded-md hover:opacity-80"
                        >
                          変更
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
}

export default ChangeEmail;