"use client";

import { FC } from "react";

type Props = {
  heading: string;
  imagePath: string;
  alt: string;
};

const HeadingImage: FC<Props> = (props) => {
  return (
    <div className="relative">
      <img src={props.imagePath} alt={props.alt} width={"100%"} />
      <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
        {props.heading}
      </h1>
    </div>
  );
};

export default HeadingImage;
