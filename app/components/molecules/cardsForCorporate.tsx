"use client";

import { FC } from "react";

type Props = {
  title: string;
  content: string;
  imgPath: string;
};
const CardsForCorporate: FC<Props> = (props) => {
  return (
    <div className="rounded overflow-hidden shadow-lg bg-white">
      <div className="overflow-hidden">
        <img
          className="w-full object-cover transform duration-500 ease-in-out hover:scale-110"
          src={props.imgPath}
          alt={props.title}
        />
      </div>
      <div className="p-6">
        <h2 className="font-semibold text-3xl mb-2">{props.title}</h2>
        <p>{props.content}</p>
      </div>
    </div>
  );
};

export default CardsForCorporate;
