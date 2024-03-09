"use client";

import {
  addAddressListRadioButtons,
  deliveryTimes,
  prefectures47,
  requestPlaceholder,
  usingList,
} from "@/config/config";
import { deliveryFormData } from "@/utils/types";
import { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { FieldErrors } from 'react-hook-form';

type Props = {
  isOrder: boolean;
  registerToLastName: UseFormRegisterReturn,
  registerToFirstName: UseFormRegisterReturn,
  registerToLastNameKana: UseFormRegisterReturn,
  registerToFirstNameKana: UseFormRegisterReturn,
  registerToPostcode: UseFormRegisterReturn,
  registerToPrefecture: UseFormRegisterReturn,
  registerToCityStreetAddress: UseFormRegisterReturn,
  registerToBuildingApartment: UseFormRegisterReturn,
  registerToCompanyDepartment: UseFormRegisterReturn,
  registerToPhoneNumber: UseFormRegisterReturn,
  registerToChoicePostBox: UseFormRegisterReturn,
  registerWhatUsing?: UseFormRegisterReturn,
  registerOrderRequest?: UseFormRegisterReturn,
  registerDeliveryDate?: UseFormRegisterReturn,
  registerDeliveryTime?: UseFormRegisterReturn,
  registerAddAddress?: UseFormRegisterReturn,
  checkedDisabled?: boolean;
  errors: FieldErrors<deliveryFormData>;
};

const DeliveryOrderForm: FC<Props> = (props) => {

  const getThreeDaysLaterDate = () => {
    const today = new Date();
    const threeDaysLater = new Date(today);
    threeDaysLater.setDate(today.getDate() + 3);
    return threeDaysLater.toISOString().split('T')[0];
  }

  const {
    isOrder,
    registerToLastName,
    registerToFirstName,
    registerToLastNameKana,
    registerToFirstNameKana,
    registerToPostcode,
    registerToPrefecture,
    registerToCityStreetAddress,
    registerToBuildingApartment,
    registerToCompanyDepartment,
    registerToPhoneNumber,
    registerToChoicePostBox,
    registerWhatUsing,
    registerOrderRequest,
    registerDeliveryDate,
    registerDeliveryTime,
    registerAddAddress,
    checkedDisabled,
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
              className="w-full px-3 border border-gray-300 rounded"
              {...registerToLastName}
            />
            <div className="my-3 text-center text-[12px] text-red-500">{errors.toLastName?.message}</div>
          </div>
          <div>
            <label htmlFor="firstName" className="block">
              名
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full px-3 border border-gray-300 rounded"
              {...registerToFirstName}
            />
            <div className="my-3 text-center text-[12px] text-red-500">{errors.toFirstName?.message}</div>
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
              className="w-full px-3 border border-gray-300 rounded"
              {...registerToLastNameKana}
            />
            <div className="my-3 text-center text-[12px] text-red-500">{errors.toLastNameKana?.message}</div>
          </div>
          <div>
            <label htmlFor="firstNameKana" className="block">
              メイ
            </label>
            <input
              type="text"
              id="firstNameKana"
              className="w-full px-3 border border-gray-300 rounded"
              {...registerToFirstNameKana}
            />
            <div className="my-3 text-center text-[12px] text-red-500">{errors.toFirstNameKana?.message}</div>
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
            className="w-1/2 px-3 border border-gray-300 rounded"
            {...registerToPostcode}
          />
          <div className="my-3 text-[12px] text-red-500">{errors.toPostcode?.message}</div>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="prefecture" className="block font-medium required">
          都道府県
        </label>
        <div className="p-2">
          <select
            id="prefecture"
            {...registerToPrefecture}
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
          <div className="my-3 text-[12px] text-red-500">{errors.toPrefecture?.message}</div>
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
            className="w-full px-3 border border-gray-300 rounded"
            {...registerToCityStreetAddress}
          />
          <div className="my-3 text-center text-[12px] text-red-500">{errors.toCityStreetAddress?.message}</div>
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
            className="w-full px-3 border border-gray-300 rounded"
            {...registerToBuildingApartment}
          />
          <div className="my-3 text-center text-[12px] text-red-500">{errors.toBuildingApartment?.message}</div>
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
            className="w-full px-3 border border-gray-300 rounded"
            {...registerToCompanyDepartment}
          />
          <div className="my-3 text-center text-[12px] text-red-500">{errors.toCompanyDepartment?.message}</div>
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
            className="w-full px-3 border border-gray-300 rounded"
            {...registerToPhoneNumber}
          />
          <div className="my-3 text-center text-[12px] text-red-500">{errors.toPhoneNumber?.message}</div>
        </div>
      </div>
      <div className="mb-6">
        <label className="block">宅配BOX</label>
        <div className="p-2">
          <input
            type="checkbox"
            id="deliveryBox"
            className="mr-2"
            {...registerToChoicePostBox}
            />
          <label htmlFor="deliveryBox">不在時に宅配ボックスを利用</label>
          <div className="my-3 text-center text-[12px] text-red-500">{errors.toChoicePostBox?.message}</div>
        </div>
      </div>
      {isOrder && (
        <>
          <div className="grid grid-cols-1 p-2 376px:grid-cols-2 gap-1 376px:gap-8 mb-6 ">
            <div>
              <label htmlFor="deliveryTime" className="block font-medium required">
                お届け希望日時
              </label>
              <input
                type="date"
                id="lastName"
                className="w-full px-3 border border-gray-300 rounded"
                min={getThreeDaysLaterDate()}
                {...registerDeliveryDate}
              />
              <div className="my-3 text-center text-[12px] text-red-500">{errors.deliveryDate?.message}</div>
            </div>
            <div>
              <br />
              <select
                id="deliveryTime"
                {...registerDeliveryTime}
                className="w-full px-3 border border-gray-300 rounded py-1"
              >
                <option value="">選択してください</option>
                {deliveryTimes.map((item, idx) => (
                  <option key={idx} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
              <div className="my-3 text-center text-[12px] text-red-500">{errors.deliveryTime?.message}</div>
            </div>
          </div>      
          <div className="mb-6">
            <label htmlFor="purpose" className="block font-medium">
              ご利用の用途
            </label>
            <div className="p-2">
              <select
                id="purpose"
                {...registerWhatUsing}
                className="w-full px-3 border border-gray-300 rounded py-1"
              >
                <option value="">選択してください</option>
                {usingList.map((item, idx) => (
                  <option key={idx} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
              <div className="my-3 text-center text-[12px] text-red-500">{errors.whatUsing?.message}</div>
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="purpose" className="block font-medium">
              ご要望
            </label>
            <div className="p-2">
              <textarea
                placeholder={requestPlaceholder}
                rows={3}
                id="company"
                className="w-full px-3 border border-gray-300 rounded placeholder:text-2xl placeholder:leading-normal"
                {...registerOrderRequest}
              >
              </textarea>
              <div className="my-3 text-center text-[12px] text-red-500">{errors.orderRequest?.message}</div>
            </div>
          </div>          
          <div className="mb-6">
            <label className="block">アドレス帳に追加</label>
            <div className="p-2">
              {addAddressListRadioButtons.map((radio, idx) => (
                <div key={idx}>
                  <input
                    disabled={checkedDisabled && radio.value === 'yes'}
                    type="radio"
                    id={radio.id}
                    className="mr-2"
                    value={radio.value}
                    {...registerAddAddress}
                 />
                  <label htmlFor={radio.id}>{radio.label}</label>
                  <div className="my-3 text text-[12px] text-red-500">{errors.addAddress?.message}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DeliveryOrderForm;
