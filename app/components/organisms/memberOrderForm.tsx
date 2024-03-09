"use client";

import { prefectures47 } from "@/config/config";
import { profileFormData } from "@/utils/types";
import { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { FieldErrors } from 'react-hook-form';

type Props = {
  isOrder: boolean;
  registerLastName: UseFormRegisterReturn;
  registerFirstName: UseFormRegisterReturn;
  registerLastNameKana: UseFormRegisterReturn;
  registerFirstNameKana: UseFormRegisterReturn;
  registerPostcode: UseFormRegisterReturn;
  registerPrefecture: UseFormRegisterReturn;
  registerCityStreetAddress: UseFormRegisterReturn;
  registerBuildingApartment: UseFormRegisterReturn;
  registerCompanyDepartment: UseFormRegisterReturn;
  registerPhoneNumber: UseFormRegisterReturn;
  registerChoicePostBox: UseFormRegisterReturn;
  errors: FieldErrors<profileFormData>;
};

const MemberOrderForm: FC<Props> = (props) => {
  const {
    isOrder,
    registerLastName,
    registerFirstName,
    registerLastNameKana,
    registerFirstNameKana,
    registerPostcode,
    registerPrefecture,
    registerCityStreetAddress,
    registerBuildingApartment,
    registerCompanyDepartment,
    registerPhoneNumber,
    registerChoicePostBox,
    errors
  } = props;
  return (
    <div className="p-12 border rounded-lg">
      <div>
        <h3 className="font-medium required">氏名（漢字）</h3>
        <div className="grid grid-cols-1 p-2 376px:grid-cols-2 gap-1 376px:gap-8 mb-4">
          <div>
            <label htmlFor="lastName" className="block">
              姓
            </label>
            <input
              type="text"
              id="lastName"
              className="w-full px-3 py-1 border border-gray-300 rounded"
              {...registerLastName}
            />
            <div className="my-3 text-center text-[12px] text-red-500">{errors.lastName?.message}</div>
          </div>
          <div>
            <label htmlFor="firstName" className="block">
              名
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full px-3 py-1 border border-gray-300 rounded"
              {...registerFirstName}
            />
            <div className="my-3 text-center text-[12px] text-red-500">{errors.firstName?.message}</div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-medium required">氏名（カナ）</h3>
        <div className="grid grid-cols-1 p-2 376px:grid-cols-2 gap-1 376px:gap-8 mb-4">
          <div>
            <label htmlFor="lastNameKana" className="block">
              セイ
            </label>
            <input
              type="text"
              id="lastNameKana"
              className="w-full px-3 py-1 border border-gray-300 rounded"
              {...registerLastNameKana}
            />
            <div className="my-3 text-center text-[12px] text-red-500">{errors.lastNameKana?.message}</div>
          </div>
          <div>
            <label htmlFor="firstNameKana" className="block">
              メイ
            </label>
            <input
              type="text"
              id="firstNameKana"
              className="w-full px-3 py-1 border border-gray-300 rounded"
              {...registerFirstNameKana}
            />
            <div className="my-3 text-center text-[12px] text-red-500">{errors.firstNameKana?.message}</div>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="postcode" className="block font-medium required">
          郵便番号
        </label>
        <div className="p-2">
          <input
            type="postcode"
            id="postcode"
            className="w-1/2 px-3 py-1 border border-gray-300 rounded"
            {...registerPostcode}
          />
          <div className="my-3 text-[12px] text-red-500">{errors.postcode?.message}</div>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="prefecture" className="block font-medium required">
          都道府県
        </label>
        <div className="p-2">
          <select
            id="prefecture"
            {...registerPrefecture}
            className="w-1/2 px-3 py-2 border border-gray-300 rounded"
          >
            <option value="">都道府県を選択してください</option>
            {prefectures47.map((item, idx) => (
              <option
                key={idx}
                value={item.name}
              >
                {item.name}
              </option>
            ))}
          </select>
          <div className="my-3 text-[12px] text-red-500">{errors.prefecture?.message}</div>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="building" className="block font-medium required">
          市区町村・番地
        </label>
        <div className="p-2">
          <input
            type="text"
            id="building"
            className="w-full px-3 py-1 border border-gray-300 rounded"
            {...registerCityStreetAddress}
          />
          <div className="my-3 text-center text-[12px] text-red-500">{errors.cityStreetAddress?.message}</div>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="building" className="block font-medium">
          ビル・マンション名
        </label>
        <div className="p-2">
          <input
            type="text"
            id="building"
            className="w-full px-3 py-1 border border-gray-300 rounded"
            {...registerBuildingApartment}
          />
          <div className="my-3 text-center text-[12px] text-red-500">{errors.buildingApartment?.message}</div>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="company" className="block font-medium">
          会社・部署名
        </label>
        <div className="p-2">
          <input
            type="text"
            id="company"
            className="w-full px-3 py-1 border border-gray-300 rounded"
            {...registerCompanyDepartment}
          />
          <div className="my-3 text-center text-[12px] text-red-500">{errors.companyDepartment?.message}</div>
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="phone" className="block  font-medium required">
          電話番号
        </label>
        <div className="p-2">
          <input
            type="tel"
            id="phone"
            className="w-full px-3 py-1 border border-gray-300 rounded"
            {...registerPhoneNumber}
          />
          <div className="my-3 text-center text-[12px] text-red-500">{errors.phoneNumber?.message}</div>
        </div>
      </div>
      {!isOrder && (
        <div className="mb-6">
          <label className="block">宅配BOX</label>
          <div className="p-2">
            <input
              type="checkbox"
              id="deliveryBox"
              className="mr-2"
              {...registerChoicePostBox}
            />
            <label htmlFor="deliveryBox">不在時に宅配ボックスを利用</label>
            <div className="my-3 text-center text-[12px] text-red-500">{errors.choicePostBox?.message}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberOrderForm;
