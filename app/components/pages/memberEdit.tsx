"use client";

import Link from "next/link";
import MemberOrderForm from "../organisms/memberOrderForm";
import { useEffect, useState } from "react";
import useStore from "../../../store";
import { useSupabase } from "../supabase-provider";
import { useRouter } from "next/navigation";
import { useAddress } from "@/hooks/useAddress";
import * as z from 'zod'
import { ProfileType } from "@/utils/types";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast'
import { profileFormData } from "@/utils/types";
import Loading from "@/app/loading";

type Schema = z.infer<typeof schema>
const schema = z
.object({
    lastName: z.string().min(1, '姓は必須です').max(50, '50文字以内で入力してください'),
    firstName: z.string().min(1, '名は必須です').max(50, '50文字以内で入力してください'),
    lastNameKana: z.string().min(1, 'セイは必須です').max(50, '50文字以内で入力してください'),
    firstNameKana: z.string().min(1, 'メイは必須です').max(50, '50文字以内で入力してください'),
    postcode: z.string().length(7, '7桁の郵便番号を入力してください'),
    prefecture: z.string().min(1, '都道府県名は必須です'),
    cityStreetAddress: z.string().min(1, '住所は必須です'),
    buildingApartment: z.string().optional(),
    companyDepartment: z.string().optional(),
    phoneNumber: z.string().regex(/^(?:\d{10}|\d{11})$/, '電話番号は10桁または11桁で入力してください'),
    choicePostBox: z.boolean(),
  });


const MemberEdit = () => {

  const { user } = useStore();
  const router = useRouter();
  const { myprofile, setMyprofile } = useAddress();
  const { supabase } = useSupabase();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<profileFormData>({
    defaultValues: { 
      lastName: "",
      firstName: "",
      lastNameKana: "",
      firstNameKana: "",
      postcode: "",
      prefecture: "",
      cityStreetAddress: "",
      buildingApartment: "",
      companyDepartment: "",
      phoneNumber: "",
      choicePostBox: false,
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (user.id) {
      if (myprofile ) {
        setProfileData(myprofile)
      } else {
        getProfile();
      }
    }
  }, [user, myprofile]);

  // プロフィール取得
  const getProfile = async () => {
    const { data: profileData, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", user.id)
      .single();

    // プロフィール取得失敗
    if (error) {
      alert(error.message);
      return;
    }
    setMyprofile(profileData);
    setProfileData(profileData);
  };  

  const setProfileData = (profileData: ProfileType) => {
    // 名前(漢字)設定
    if (profileData.name) {
      setValue('lastName', profileData.name.split(" ")[0]);
      setValue('firstName', profileData.name.split(" ")[1]);
    }
    // 名前(カナ)設定
    if (profileData.name_kana) {
      setValue('lastNameKana', profileData.name_kana.split(" ")[0]);
      setValue('firstNameKana', profileData.name_kana.split(" ")[1]);
    }
    // 郵便番号設定
    if (profileData.postcode) {
      setValue('postcode', profileData.postcode);
    }
    // 都道府県設定
    if (profileData.prefecture) {
      setValue('prefecture', profileData.prefecture);
    }
    // 市区町村・番地設定
    if (profileData.city_street_address) {
      setValue('cityStreetAddress', profileData.city_street_address);
    }
    // ビル・マンション名設定
    if (profileData.building_apartment) {
      setValue('buildingApartment', profileData.building_apartment);
    }
    // 会社・部署名設定
    if (profileData.company_department) {
      setValue('companyDepartment', profileData.company_department);
    }
    // 電話番号設定
    if (profileData.phone_number) {
      setValue('phoneNumber', profileData.phone_number);
    }
    // 宅配ボックス設定
    if (profileData.use_postbox) {
      setValue('choicePostBox', profileData.use_postbox);
    }
  };

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);
    if (user.id) {
      // プロフィールアップデート
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          name: data.lastName + " " + data.firstName,
          name_kana: data.lastNameKana + " " + data.firstNameKana,
          postcode: data.postcode,
          prefecture: data.prefecture,
          city_street_address: data.cityStreetAddress,
          building_apartment: data.buildingApartment,
          company_department: data.companyDepartment,
          phone_number: data.phoneNumber,
          use_postbox: data.choicePostBox,
        })
        .eq("id", user.id);

      if (updateError) {
        alert(updateError.message);
        setLoading(false);
        return;
      }
      // トップページ遷移
      setMyprofile({
        id: user.id,
        email: user.email!,
        name: data.lastName + " " + data.firstName,
        name_kana: data.lastNameKana + " " + data.firstNameKana,
        postcode: data.postcode,
        prefecture: data.prefecture,
        city_street_address: data.cityStreetAddress,
        building_apartment: data.buildingApartment!,
        company_department: data.companyDepartment!,
        phone_number: data.phoneNumber,
        use_postbox: data.choicePostBox,
        updated_at: new Date().toISOString(),
        created_at: myprofile?.created_at!
      });      
      toast.success('会員情報は正常に変更しました！');
      router.refresh();
    }
    setLoading(false);
  };
  return (
    <div className="px-8 max-w-[1040px] mx-auto">
      <section className="my-12">
        <h1 className="mb-8">会員情報変更</h1>
        <div className="space-y-12">
          <div className="pb-12">
            <div className="mb-20">
              <form onSubmit={handleSubmit(onSubmit)}>
                <MemberOrderForm
                  isOrder={false}
                  registerLastName={{...register("lastName")}}
                  registerFirstName={{...register("firstName")}}
                  registerLastNameKana={{...register("lastNameKana")}}
                  registerFirstNameKana={{...register("firstNameKana")}}
                  registerPostcode={{...register("postcode")}}
                  registerPrefecture={{...register("prefecture")}}
                  registerCityStreetAddress={{...register("cityStreetAddress")}}
                  registerBuildingApartment={{...register("buildingApartment")}}
                  registerCompanyDepartment={{...register("companyDepartment")}}
                  registerPhoneNumber={{...register("phoneNumber")}}
                  registerChoicePostBox={{...register("choicePostBox")}}
                  errors={errors}
                />
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
                        type="button"
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
};

export default MemberEdit;
