"use client";

import HeadingImage from "../molecules/headingImage";
import { contactWayRadioButtons } from "@/config/config";
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { contactFormData } from "@/utils/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "@/app/loading";

type Schema = z.infer<typeof schema>

// 入力データの検証ルールを定義
const schema = z
  .object({
    name: z.string().min(1, 'お名前は必須です').max(50, '50文字以内で入力してください'),
    nameKana: z.string().min(1, 'フリガナは必須です').max(50, '50文字以内で入力してください'),
    email: z.string().email({ message: 'メールアドレスの形式ではありません。' }),
    phoneNumber: z.string().optional(),
    contents: z.string().min(1, 'お問い合わせ内容は必須です').max(500, '500文字以内で入力してください'),
    contactWay: z.union([z.literal('tel'), z.literal('mail'), z.literal('both')]),
    agreePrivacy: z.boolean().refine(value => value === true, {message: 'プライバシーポリシーに同意する必要があります。'}),
  })


const Contact = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<contactFormData>({
    // 初期値
    defaultValues: { 
      name: '',
      nameKana: '',
      email: '',
      phoneNumber: '',
      contents: '',
      contactWay: 'both',
      agreePrivacy: false,
    },
    // 入力値の検証
    resolver: zodResolver(schema),
  })  

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        reset();
        router.push('/contact_complete');
        router.refresh();
        // フォームをリセット
      } else {
        alert("エラーが発生しました。\n下記の電話番号にお問い合わせください。\n090-8504-7816");
      }
    } catch (error) {
      alert("エラーが発生しました。\n下記の電話番号にお問い合わせください。\n090-8504-7816");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeadingImage
        heading="問い合わせ"
        imagePath="/images/contact-us.jpg"
        alt="問い合わせの見出し画像"
      />
      <div className="px-12">
        {/* <!-- お問い合わせフォーム --> */}
        <section className="my-24">
          {/* <!-- STATIC FORMSのフォームタグ --> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="376px:block 560px:flex mb-8">
              <div className="mb-2">
                <label
                  className="font-bold inline-block required"
                  style={{ width: 200 }}
                >
                  お名前
                </label>
              </div>
              <div>
                <input
                  id="name"
                  type="text"
                  placeholder="入力してください"
                  className="border border-gray-300 p-2 rounded form-size"
                  {...register("name")}
                />
                <div className="my-3 text-[12px] text-red-500">{errors.name?.message}</div>
              </div>
            </div>
            <div className="376px:block 560px:flex mb-8">
              <div className="mb-2">
                <label
                  className="font-bold inline-block required"
                  style={{ width: 200 }}
                >
                  フリガナ
                </label>
              </div>
              <div>
                <input
                  id="furigana"
                  type="text"
                  placeholder="入力してください"
                  className="border border-gray-300 p-2 rounded form-size"
                  {...register("nameKana")}
                />
                <div className="my-3 text-[12px] text-red-500">{errors.nameKana?.message}</div>
              </div>
            </div>
            <div className="376px:block 560px:flex mb-8">
              <div className="mb-2">
                <label
                  className="font-bold inline-block required"
                  style={{ width: 200 }}
                >
                  メールアドレス
                </label>
              </div>
              <div>
                <input
                  id="email"
                  type="text"
                  placeholder="入力してください"
                  className="border border-gray-300 p-2 rounded form-size"
                  {...register("email")}
                />
                <div className="my-3 text-[12px] text-red-500">{errors.email?.message}</div>
              </div>
            </div>
            <div className="376px:block 560px:flex mb-8">
              <div className="mb-2">
                <label
                  className="font-bold inline-block"
                  style={{ width: 200 }}
                >
                  電話番号
                </label>
              </div>
              <div>
                <input
                  id="phoneNumber"
                  type="text"
                  placeholder="入力してください"
                  className="border border-gray-300 p-2 rounded form-size"
                  {...register("phoneNumber")}
                />
                <div className="my-3 text-[12px] text-red-500">{errors.phoneNumber?.message}</div>
              </div>
            </div>
            <div className="376px:block 560px:flex mb-8">
              <div className="mb-2">
                <label
                  className="font-bold inline-block required"
                  style={{ width: 200 }}
                >
                  お問い合わせ内容
                </label>
              </div>
              <div>
                <textarea
                  id="message"
                  placeholder="入力してください"
                  className="border border-gray-300 p-2 rounded form-size"
                  {...register("contents")}
                  ></textarea>
                <div className="my-3 text-[12px] text-red-500">{errors.contents?.message}</div>
              </div>
            </div>
            <div className="376px:block 560px:flex mb-8">
              {}
              <div className="mb-2">
                <label
                  className="font-bold inline-block required"
                  style={{ width: 200 }}
                >
                  ご希望の連絡先
                </label>
              </div>
              <div className="flex">
                {contactWayRadioButtons.map((item, idx) => (
                  <div key={idx}>
                    <input
                      id={`${item.id}`}
                      className="form-radio mr-2"
                      type="radio"
                      value={item.value}
                      {...register("contactWay")}
                  />
                  <label htmlFor={`${item.id}`} className="mr-4">{item.label}</label>
                  <div className="my-3 text-[12px] text-red-500">{errors.contactWay?.message}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="mb-2">
                <label className="font-bold">個人情報の取り扱い</label>
              </div>
              <div>
                <details>
                  <summary>
                    お問い合わせフォームの個人情報の取り扱いについて
                  </summary>
                  <div>
                    <span>１．組織の名称又は氏名</span>
                    <br />
                    有限会社ミストラル
                    <br />
                    <br />
                    <span>
                      ２．個人情報保護管理者（若しくはその代理人）の氏名又は職名、所属及び連絡先
                      高倉 徹 システム開発部
                    </span>
                    <br />
                    メールアドレス：takakuratoru0@gmail.com
                    <br />
                    TEL：090-8504-7816
                    <br />
                    <span>３．個人情報の利用目的</span>
                    <br />
                    ・本サービス及び本サービスに関連する情報の提供又はそれらに関する連絡のため
                    <br />
                    ・ユーザーの本人確認のため
                    <br />
                    ・当社サービスのご案内のため
                    <br />
                    ・当社の商品等の広告または宣伝（電子メールによるものを含むものとします。）
                    <br />
                    <br />
                    <span>４．個人情報の取り扱い業務の委託</span>
                    <br />
                    個人情報の取扱業務の全部または一部を外部に業務委託する場合があります。
                    <br />
                    その際、弊社は、個人情報を適切に保護できる管理体制を敷き実行していることを条件として
                    <br />
                    委託先を厳選したうえで、機密保持契約を委託先と締結し、お客様の個人情報を厳密に管理させます。
                    <br />
                    <br />
                    <span>５．個人情報の開示等の請求</span>
                    <br />
                    お客様は、弊社に対してご自身の個人情報の開示等（利用目的の通知、開示、内容の訂正・追加・削除、利用の停止または消去、第三者への提供の停止）に関して、当社問合わせ窓口に申し出ることができます。
                    <br />
                    その際、弊社はお客様ご本人を確認させていただいたうえで、合理的な期間内に対応いたします。
                    <br />
                    <br />
                    なお、個人情報に関する弊社問合わせ先は、次の通りです。
                    <br />
                    <br />
                    有限会社ミストラル　個人情報問合せ窓口
                    <br />
                    〒150-0001 東京都渋谷区神宮前3-42-3 1F
                    <br />
                    メールアドレス：mail@flower-mistral.com　TEL：03-3423-4187
                    <br />
                    <br />
                    <span>６．個人情報を提供されることの任意性について</span>
                    <br />
                    <br />
                    お客様がご自身の個人情報を弊社に提供されるか否かは、お客様のご判断によりますが、もしご提供されない場合には、適切なサービスが提供できない場合がありますので予めご了承ください。
                  </div>
                </details>
                <input
                  id="agree"
                  type="checkbox"
                  className="mr-3"
                  {...register("agreePrivacy")}
                />
                <span>
                  個人情報の取り扱いについてご同意いただける場合は、チェックをしてください。
                </span>
                <div className="my-3 text-[12px] text-red-500">{errors.agreePrivacy?.message}</div>
              </div>
            </div>
            <div>
              {loading ? (
                <button
                type="button"
                disabled
                className="bg-red-700 hover:opacity-80 text-white font-bold py-4 px-10 rounded"
              >
                <Loading color="white" />
              </button>
              ) : (
                <button
                  type="submit"
                  className="bg-red-700 hover:opacity-80 text-white font-bold py-4 px-10 rounded"
                >
                  <svg
                    style={{ verticalAlign: "-5px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-envelope inline"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                  </svg>
                  &nbsp;&nbsp;送信 →
                </button>
              )}
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default Contact;
