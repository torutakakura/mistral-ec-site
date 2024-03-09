"use client";

import Link from "next/link";
import DeliveryOrderForm from "../organisms/deliveryOrderForm";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useStore from "@/store";
import { useSupabase } from "../supabase-provider";
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import Loading from "@/app/loading";

type Props = {
  addressData: any
}

type Schema = z.infer<typeof schema>
const schema = z
.object({
    toLastName: z.string().min(1, '姓は必須です').max(50, '50文字以内で入力してください'),
    toFirstName: z.string().min(1, '名は必須です').max(50, '50文字以内で入力してください'),
    toLastNameKana: z.string().min(1, 'セイは必須です').max(50, '50文字以内で入力してください'),
    toFirstNameKana: z.string().min(1, 'メイは必須です').max(50, '50文字以内で入力してください'),
    toPostcode: z.string().length(7, '7桁の郵便番号を入力してください'),
    toPrefecture: z.string().min(1, '都道府県名は必須です'),
    toCityStreetAddress: z.string().min(1, '住所は必須です'),
    toBuildingApartment: z.string().optional(),
    toCompanyDepartment: z.string().optional(),
    toPhoneNumber: z.string().regex(/^(?:\d{10}|\d{11})$/, '電話番号は10桁または11桁で入力してください'),
    toChoicePostBox: z.boolean(),
  });


const NewDeliveryAddress: FC<Props> = (props) => {
  const { addressData } = props;
  const router = useRouter();
  const { supabase } = useSupabase();
  const { user } = useStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: {
      // delivery address
      toLastName: "",
      toFirstName: "",
      toLastNameKana: "",
      toFirstNameKana: "",
      toPostcode: "",
      toPrefecture: "",
      toCityStreetAddress: "",
      toBuildingApartment: "",
      toCompanyDepartment: "",
      toPhoneNumber: "",
      toChoicePostBox: false,
    },
    resolver: zodResolver(schema),
  });  
  
  useEffect(() => {
    if (addressData) {
      // 名前(漢字)設定
      if (addressData.name) {
        setValue('toLastName', addressData.name.split(" ")[0]);
        setValue('toFirstName', addressData.name.split(" ")[1]);
      }
      // 名前(カナ)設定
      if (addressData.name_kana) {
        setValue('toLastNameKana', addressData.name_kana.split(" ")[0]);
        setValue('toFirstNameKana', addressData.name_kana.split(" ")[1]);
      }    
      // 郵便番号設定
      if (addressData.postcode) {
        setValue('toPostcode', addressData.postcode);
      }
      // 都道府県設定
      if (addressData.prefecture) {
        setValue('toPrefecture', addressData.prefecture);
      }
      // 市区町村・番地設定
      if (addressData.city_street_address) {
        setValue('toCityStreetAddress', addressData.city_street_address);
      }
      // ビル・マンション名設定
      if (addressData.building_apartment) {
        setValue('toBuildingApartment', addressData.building_apartment);
      }
      // 会社・部署名設定
      if (addressData.company_department) {
        setValue('toBuildingApartment', addressData.company_department);
      }
      // 電話番号設定
      if (addressData.phone_number) {
        setValue('toPhoneNumber', addressData.phone_number);
      }
      // 宅配ボックス設定
      if (addressData.use_postbox) {
        setValue('toChoicePostBox', addressData.use_postbox);
      }
      setIsUpdate(true);
    }
  }, [])

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);

    if (user.id) {
      if (isUpdate) {
        // 住所情報を更新
        const { error: updateError } = await supabase
          .from("addresses")
          .update({
            user_id: user.id,
            name: data.toLastName + " " + data.toFirstName,
            name_kana: data.toLastNameKana + " " + data.toFirstNameKana,
            postcode: data.toPostcode,
            prefecture: data.toPrefecture,
            city_street_address: data.toCityStreetAddress,
            building_apartment: data.toBuildingApartment,
            company_department: data.toCompanyDepartment,
            phone_number: data.toPhoneNumber,
            use_postbox: data.toChoicePostBox,
          })
          .eq("id", addressData.id);
        if (updateError) {
          alert(updateError.message);
          setLoading(false);
          return;
        }
        toast.success("アドレス情報は正常に変更しました！");
      } else {
        // 住所情報を新規作成
        const { error: insertError } = await supabase.from("addresses").insert({
          user_id: user.id,
          name: data.toLastName + " " + data.toFirstName,
          name_kana: data.toLastNameKana + " " + data.toFirstNameKana,
          postcode: data.toPostcode,
          prefecture: data.toPrefecture,
          city_street_address: data.toCityStreetAddress,
          building_apartment: data.toBuildingApartment,
          company_department: data.toCompanyDepartment,
          phone_number: data.toPhoneNumber,
          is_ordered: false,
          use_postbox: data.toChoicePostBox,
        });

        if (insertError) {
          alert(insertError.message);
          setLoading(false);
          return;
        }
        toast.success("アドレス帳に住所を追加しました！");
      }
      setTimeout(() => {
        setLoading(false);
        router.push("/delivery_addresses");
        router.refresh();
      }, 1000); // 1秒後に実行      

    }
  };

  return (
    <div className="px-8 max-w-[1040px] mx-auto">
      <section className="my-12">
        <h1 className="mb-8">新規アドレス帳登録</h1>
        <div className="space-y-12">
          <div className="pb-12">
          <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-20">
                <DeliveryOrderForm
                  isOrder={false}
                  registerToLastName={{...register("toLastName")}}
                  registerToFirstName={{...register("toFirstName")}}
                  registerToLastNameKana={{...register("toLastNameKana")}}
                  registerToFirstNameKana={{...register("toFirstNameKana")}}
                  registerToPostcode={{...register("toPostcode")}}
                  registerToPrefecture={{...register("toPrefecture")}}
                  registerToCityStreetAddress={{...register("toCityStreetAddress")}}
                  registerToBuildingApartment={{...register("toBuildingApartment")}}
                  registerToCompanyDepartment={{...register("toCompanyDepartment")}}
                  registerToPhoneNumber={{...register("toPhoneNumber")}}
                  registerToChoicePostBox={{...register("toChoicePostBox")}}
                  errors={errors}
                />
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
                  {loading ? (
                    <button
                    type="button"
                    className="p-4 text-xl 376px:text-xl 560px:text-2xl inline-block text-center w-44 bg-red-700 text-white font-semibold rounded-md hover:opacity-80"
                  >
                    <Loading color="white" />
                  </button>
                  ) : (
                    <button
                      type="submit"
                      className="p-4 text-xl 376px:text-xl 560px:text-2xl inline-block text-center w-44 bg-red-700 text-white font-semibold rounded-md hover:opacity-80"
                    >
                      {isUpdate ? (
                        <>変更</>
                      ) : (
                        <>登録</>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewDeliveryAddress;
