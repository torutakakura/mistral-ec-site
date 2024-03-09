"use client";

import { productType } from "@/utils/product.types";
import { FC, useEffect, useState } from "react";
import { BsCart } from "react-icons/bs";
import OriginalCard from "../molecules/originalCard";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { notFound, useRouter } from "next/navigation";
import { useSupabase } from "../supabase-provider";

type Props = {
  product: productType;
};

const ProductDetail: FC<Props> = (props) => {
  const { product } = props;
  const { addCart } = useCart();
  const router = useRouter();
  const [ recommendProducts, setRecommendProducts ] = useState<Array<productType>>()
  const { supabase } = useSupabase();

  const randomSelect = (array: any, num: number) => {
    let newArray = [];

    while (newArray.length < num && array.length > 0) {
      // 配列からランダムな要素を選ぶ
      const rand = Math.floor(Math.random() * array.length);
      // 選んだ要素を別の配列に登録する
      newArray.push(array[rand]);
      // もとの配列からは削除する
      array.splice(rand, 1);
    }

    return newArray;
  };    
  
  useEffect(() => {
    (async () => {
      // products詳細取得
      const { data: productsData } = await supabase
        .from("products")
        .select("*")
        .or(
          `is_recommended.eq.${true}, for_restaurant.eq.${true}, for_present.eq.${true}`
        );

      // productsが存在しない場合
      if (!productsData) return notFound();

      const filterRecommend = productsData?.filter((item) => {
        return item.is_recommended === true;
      });
      const recommendCardData = randomSelect(filterRecommend, 4);
      setRecommendProducts(recommendCardData);
    })();
  }, []);
  
  const onClickAddCart = () => {
    addCart(product)
    router.push('/cart')
    router.refresh();
  }
  return (
    <div className="px-8 max-w-[1040px] mx-auto">
      <div className="my-12 grid grid-cols-1 376px:grid-cols-2 gap-12">
        <div className="max-h-[560px] overflow-hidden">
          <img src={product.image} alt="" className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="mb-4 font-normal text-2xl 376px:text-2xl 560px:text-3xl 960px:text-4xl">
            <span className="mb-1 block text-xl 376px:text-xl 560px:text-2xl 960px:text-3xl">
              {product.apeal}
            </span>
            {product.name}
          </h1>
          <div className="mb-4">
            <p className="text-xl 376px:text-xl 560px:text-2xl 960px:text-3xl">
              ￥
              <span className="text-4xl 376px:text-4xl 560px:text-5xl 960px:text-6xl">
                {product.price}
              </span>
              <span className="text-gray-500 text-xl 376px:text-xl 560px:text-2xl 960px:text-3xl">
                （税込）
              </span>
            </p>
          </div>
          <div className="mb-4 text-center" style={{ width: 320, height: 56 }}>
            <button
              type="button"
              onClick={() => onClickAddCart()}
              className="block pt-2 w-full h-full bg-red-700 text-white text-4xl rounded-lg hover:opacity-80"
            >
              <BsCart className="inline" style={{ verticalAlign: "-3px" }} />
              &nbsp;カートにいれる
            </button>
          </div>
          <div className="mb-4">
            <h2 className="text-2xl 376px:text-2xl 560px:text-2xl 960px:text-3xl font-semibold">
              商品説明
            </h2>
            <p className="leading-relaxed">
              春のみずみずしいバラや、可愛らしいガーベラ、ユリのように美しく咲くアルストロメリアなど、この時季おすすめのお花を集めて、テーブルリースタイプに。
            </p>
          </div>
          <div>
            <ul>
              <li>
                <Link href="">送料について ＞</Link>
              </li>
              <li>
                <Link href="">支払い方法について ＞</Link>
              </li>
              <li>
                <Link href="">キャンセル・変更について ＞</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <section className="my-16">
        <h2 className="text-center my-6">おすすめ商品</h2>
          <div className="grid-rows-1 grid grid-cols-2 760px:grid-cols-4 gap-8">
          {recommendProducts?.map((data, idx) => (
            <OriginalCard
              key={idx}
              apeal={data.apeal}
              productName={data.name}
              price={data.price}
              imgPath={`${process.env.NEXT_PUBLIC_SUPABASE_BUCKETS_URL}products/${data.image.replace(/-\d+\.webp$/, "")}/${data.image}`}
              path={`/product_detail/${data.id}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
