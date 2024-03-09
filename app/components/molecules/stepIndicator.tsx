import React, { FC } from "react";

type Props = {
  step: number;
  label: string;
  active: boolean;
  completed: boolean;
  isLast: boolean;
};
const StepIndicator: FC<Props> = ({ step, label, active, completed, isLast }) => {
  const activeStyle = "text-white bg-green-600 border border-green-600";
  const completedStyle = "text-white bg-green-700 border border-green-700";
  const inactiveStyle = "bg-white border border-gray-300";

  const style = completed
    ? completedStyle
    : active
    ? activeStyle
    : inactiveStyle;

  return (
    <div className={`flex items-center gap-4 border-x ${isLast ? 'border-y' : 'border-t'} border-gray-200 p-2`}>
      <div
        className={`border mb-2 inline-block rounded-full pt-1 text-center w-14 h-14 ${style}`}
      >
        {step}
      </div>
      <div className="text-lg text-[14px] 560px:text-[16px]">{label}</div>
    </div>
  );
};

export default StepIndicator;
