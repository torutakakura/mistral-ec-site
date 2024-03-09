import Link from "next/link";
import { FC } from "react";

type Props = {
  apeal: string;
  productName: string;
  price: number;
  imgPath: string;
  path: string;
};

const OriginalCard: FC<Props> = (props) => {
  return (
    <div>
      <Link href={props.path}>
        <div className="h-[126px] 376px:h-[200px] 560px:h-[260px] 960px:h-[230px] overflow-hidden">
          <img className="w-full h-full object-cover" src={props.imgPath} alt="" />
        </div>
      </Link>
      <div className="pt-6 leading-relaxed">
        <h2 className="text-xl">{props.apeal}</h2>
        <h3 className="p-2 text-2xl">{props.productName}</h3>
        <p className="text-right text-red-600">
          <span>{props.price}円</span>
          <span className="text-xl">（税込み）</span>
        </p>
      </div>
    </div>
  );
};

export default OriginalCard;
