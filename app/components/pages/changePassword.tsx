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
import { toast } from "react-hot-toast";

type Schema = z.infer<typeof schema>

const schema = z
.object({
    password: z.string().min(6, {message: '6文字以上入力する必要があります。'}),
    confirmation: z.string().min(6, {message: '6文字以上入力する必要があります。'})
})
.refine((data) => data.password === data.confirmation, {
    message: '新しいパスワードと確認用パスワードが一致しません。',
    path: ['confirmation']
})

const ChangePassword = () => {
    const router = useRouter();
    const supabase = createClientComponentClient<Database>();
    const [loading, setLoading] = useState(false);
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      defaultValues: { password: "", confirmation: "" },
      resolver: zodResolver(schema),
    });
    
    const onSubmit: SubmitHandler<Schema> = async (data) => {
        setLoading(true);
        
        try {
          const { error } = await supabase.auth.updateUser({
            password: data.password
          })
          
          if (error) {
            alert('エラーが発生しました。' + error.message)
            return
          }
          
          reset();
          toast.success('パスワードは正常に変更されました。');
          
        } catch (error) {
            alert('エラーが発生しました。' + error);
            return
        } finally {
            setLoading(false);
            router.refresh();
        }
    }
    
    return (
      <div className="px-8 max-w-[1040px] mx-auto">
        <section className="my-12">
          <h1 className="mb-8">パスワード変更</h1>
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
                        htmlFor="newPassword"
                        className="block font-medium required"
                      >
                        新しいパスワード
                      </label>
                      <div className="p-2">
                        <input
                          type="password"
                          id="newPassword"
                          className="w-full px-3 py-1 border border-gray-300 rounded"
                          {...register("password", { required: true })}
                        />
                        <div className="my-3 text-center text-[12px] text-red-500">
                          {errors.password?.message}
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="passwordConfirm"
                        className="block font-medium required"
                      >
                        確認用パスワード
                      </label>
                      <div className="p-2">
                        <input
                          type="password"
                          id="passwordConfirm"
                          className="w-full px-3 py-1 border border-gray-300 rounded"
                          {...register("confirmation", { required: true })}
                        />
                        <div className="my-3 text-center text-[12px] text-red-500">
                          {errors.confirmation?.message}
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
                          <Loading color="white"/>
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

export default ChangePassword;