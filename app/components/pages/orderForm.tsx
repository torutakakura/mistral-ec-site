"use client";

import Link from "next/link";
import { FC, useEffect, useState } from "react";
import MemberOrderForm from "../organisms/memberOrderForm";
import DeliveryOrderForm from "../organisms/deliveryOrderForm";
import useStore from "@/store";
import { useSupabase } from "../supabase-provider";
import { useAddress } from "@/hooks/useAddress";
import { DeliveryAddressType, ProfileType } from "@/utils/types";
import { useRouter } from "next/navigation";
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from "react-hook-form";
import Loading from "@/app/loading";
import { format, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';
import Stepper from 'react-stepper-horizontal';
import { STEPS } from "@/config/config";
import StepIndicator from "../molecules/stepIndicator";

type Props = {
  addressData: any;
};

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
    whatUsing: z.string(),
    orderRequest: z.string(),
    deliveryDate: z.string().min(1, 'お届け日付は必須です'),
    deliveryTime: z.string().min(1, 'お届け時間帯は必須です'),
    addAddress: z.union([z.literal('yes'), z.literal('no')]),    
  });


const OrderForm: FC<Props> = (props) => {
  const { addressData } = props
  const { user } = useStore();
  const router = useRouter();
  const activeStep = 2;

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue
  } = useForm({
    defaultValues: {
      // myaddress
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
      whatUsing: "",
      orderRequest: "",
      deliveryDate: "",
      deliveryTime: "",
      addAddress: "no" as "yes" | "no",
    },
    resolver: zodResolver(schema),
  });
  const { myprofile, setMyprofile } = useAddress();
  const { supabase } = useSupabase();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [ checkedDisabled, setCheckedDisabled ] = useState<boolean>(false);

  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, 'yyyy/M/d(E)', { locale: ja });
  }

  const formatDateWithoutWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }  
  
  useEffect(() => {
    if (user.id) {
      // セッションが残っている場合
      if (myprofile) {
        setProfileData(myprofile);
      } else {
        getProfile();
      }
      setEmail(user.email!);
    }
    const delivery_address_jsonStr = sessionStorage.getItem("delivery_address");
    const sessionDeliveryAddress = JSON.parse(delivery_address_jsonStr as string);  
    if (sessionDeliveryAddress) {
      setDeliveryData(sessionDeliveryAddress);
      setValue('whatUsing', sessionDeliveryAddress.what_using);
      setValue('deliveryDate', formatDateWithoutWeekday(sessionDeliveryAddress.delivery_date));
      setValue('deliveryTime', sessionDeliveryAddress.delivery_time);
      setValue('addAddress', sessionDeliveryAddress.add_address);
      setValue('orderRequest', sessionDeliveryAddress.order_request);
    }  else if (addressData) {
      setCheckedDisabled(true);
      setValue('addAddress', 'no');
      setDeliveryData(addressData);
    }
  }, [user]);

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
  
  const setDeliveryData = (addressData: DeliveryAddressType) => {
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
    // 宅配ボックスの使用するか
    if (addressData.use_postbox) {
      setValue('toChoicePostBox', addressData.use_postbox);
    }
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

  const onClickSetMyAddress = () => {
    // 名前(漢字)設定
    setValue('toLastName', getValues('lastName'));
    setValue('toFirstName', getValues('firstName'));
    // 名前(カナ)設定
    setValue('toLastNameKana', getValues('lastNameKana'));
    setValue('toFirstNameKana', getValues('firstNameKana'));
    // 都道府県設定
    setValue('toPostcode', getValues('postcode'));
    // 都道府県設定
    setValue('toPrefecture', getValues('prefecture'));
    // 市区町村・番地設定
    setValue('toCityStreetAddress', getValues('cityStreetAddress'));
    // ビル・マンション名設定
    setValue('toBuildingApartment', getValues('buildingApartment'));
    // 会社・部署名設定
    setValue('toCompanyDepartment', getValues('companyDepartment'));
    // 電話番号設定
    setValue('toPhoneNumber', getValues('phoneNumber'));
    // 宅配ボックス利用設定
    setValue('toChoicePostBox', getValues('choicePostBox'));

    setCheckedDisabled(true);
    setValue('addAddress', 'no');    
  }

  const onClickSelectAddress = () => {
    setCheckedDisabled(true);
    setValue('addAddress', 'no');
    router.push(`/delivery_addresses?list_type=select`);
    router.refresh();
  }
  

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);
    sessionStorage.setItem(
      "myaddress",
      JSON.stringify({
        name: data.lastName + " " + data.firstName,
        name_kana: data.lastNameKana + " " + data.firstNameKana,
        email: email,
        postcode: data.postcode,
        prefecture: data.prefecture,
        city_street_address: data.cityStreetAddress,
        building_apartment: data.buildingApartment,
        company_department: data.companyDepartment,
        phone_number: data.phoneNumber,

      })
    );
    sessionStorage.setItem(
      "delivery_address",
      JSON.stringify({
        name: data.toLastName + " " + data.toFirstName,
        name_kana: data.toLastNameKana + " " + data.toFirstNameKana,
        postcode: data.toPostcode,
        prefecture: data.toPrefecture,
        city_street_address: data.toCityStreetAddress,
        building_apartment: data.toBuildingApartment,
        company_department: data.toCompanyDepartment,
        phone_number: data.toPhoneNumber,
        use_postbox: data.toChoicePostBox,
        what_using: data.whatUsing,
        order_request: data.orderRequest,
        delivery_date: formatDate(data.deliveryDate),
        delivery_time: data.deliveryTime,
        add_address: data.addAddress
      })
    );
    router.push('/order_confirm');
    router.refresh();
  };

  return (
    <div className="px-8 max-w-[1040px] mx-auto">
      <h1 className="mt-8 560px:text-5xl">ご注文内容入力</h1>
      <div className="my-12">
        <div className="flex flex-col ml-4 376px:hidden">
            {STEPS.map((item, index) => (
              <div key={index}>
                <StepIndicator
                  step={index + 1}
                  label={item.title}
                  active={index === 2}
                  completed={index < 2}
                  isLast={STEPS.length -1 === index}
                />
              </div>
            ))}
          </div>        
          <div className="hidden 376px:flex justify-around">
              <div className="w-full">
                <Stepper
                  steps={STEPS}
                  activeStep={2}
                  activeColor="rgb(21 128 61)"
                  completeColor="rgb(21 128 61)"
                />
              </div>
          </div>
        </div>
      <div className="flex justify-center">
        <section className="my-12 w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-12">
              <div className="pb-12">
                <p className="mb-12 leading-normal text-xl 376px:text-xl 560px:text-2xl">
                  下記の情報を入力して次のページへお進みください。
                  <br />
                  必須は必須項目です。必ず入力してください。
                </p>
                <div className="mb-20">
                  <h2 className="mb-6 font-semibold leading-7 text-gray-900">
                    ご注文者情報
                  </h2>
                  <MemberOrderForm
                    isOrder={true}
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
                </div>

                <div className="mb-12">
                  <h2 className="mb-6 leading-7 font-semibold text-gray-900">
                    お届け先情報
                  </h2>
                  <div className="my-6 flex justify-start gap-4">
                    <button
                      type="button"
                      className="p-4 text-xl 376px:text-xl 560px:text-2xl bg-red-700 text-white font rounded-md hover:opacity-80"
                      onClick={() => onClickSetMyAddress()}
                    >
                      ご自宅に送る
                    </button>
                    <button
                      type="button"
                      onClick={() => onClickSelectAddress()}
                      className="p-4 text-xl 376px:text-xl 560px:text-2xl bg-red-700 text-white font rounded-md hover:opacity-80"
                    >
                      アドレス帳から選択する
                    </button>
                  </div>
                  <DeliveryOrderForm
                    isOrder={true}
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
                    registerWhatUsing={{...register("whatUsing")}}
                    registerOrderRequest={{...register("orderRequest")}}
                    registerDeliveryDate={{...register("deliveryDate")}}
                    registerDeliveryTime={{...register("deliveryTime")}}
                    registerAddAddress={{...register("addAddress")}}
                    checkedDisabled={checkedDisabled}
                    errors={errors}
                  />
                </div>
                <div className="my-12 flex justify-center items-center gap-12">
                  <div>
                    <Link
                      href="/cart"
                      className="p-4 text-xl w-44 376px:text-xl 560px:text-2xl border border-gray-400 rounded-md bg-gray-100"
                    >
                      カートに戻る
                    </Link>
                  </div>
                  <div>
                    {loading ? (
                    <button
                      type="button"
                      disabled
                      className="p-4 text-xl w-52 376px:text-xl 560px:text-2xl bg-red-700 text-white font-semibold rounded-md hover:opacity-80"
                    >
                      <Loading color="white" />
                    </button>
                    ) : (
                      <button
                        type="submit"
                        className="p-4 text-xl w-52 376px:text-xl 560px:text-2xl bg-red-700 text-white font-semibold rounded-md hover:opacity-80"
                      >
                        確認画面へ進む
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};
export default OrderForm;
