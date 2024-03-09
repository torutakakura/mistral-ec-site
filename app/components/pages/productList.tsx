import HeadingImage from "../molecules/headingImage";
import OriginalCard from "../molecules/originalCard";
import { FC } from "react";

type productType = {
  id: number;
  apeal: string;
  name: string;
  price: number;
  image: string;
};

type Props = {
  productsData: Array<productType>;
};

const ProductList: FC<Props> = (props) => {
  const { productsData } = props;

  return (
    <>
      <HeadingImage
        heading="商品一覧"
        imagePath="/images/product-list-main.jpg"
        alt="商品一覧の見出し画像"
      />
      <div className="px-8 max-w-[1040px] mx-auto">
        <div className="my-12 flex flex-wrap gap-3 items-center">
          <div>
            <label htmlFor="inputPassword6" className="block">
              表示件数:
            </label>
          </div>
          <div>
            <select className="rounded border border-gray-300">
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
            </select>
          </div>
          <div>
            <label htmlFor="inputPassword6" className="block">
              並び替え:
            </label>
          </div>
          <div>
            <select className="rounded border border-gray-300">
              <option value="1">新着順</option>
              <option value="2">金額が低い順</option>
              <option value="3">金額が高い順</option>
              <option value="4">名前順</option>
            </select>
          </div>
        </div>
        <section className="my-12">
          <div className="flex flex-wrap gap-y-4">
            {productsData.map((data, index) => (
              <div
                key={index}
                className="w-1/2 376px:w-1/2 560px:w-1/3 960px:w-1/4 px-2"
              >
                <OriginalCard
                  apeal={data.apeal}
                  productName={data.name}
                  price={data.price}
                  imgPath={`${
                    process.env.NEXT_PUBLIC_SUPABASE_BUCKETS_URL
                  }products/${data.image.replace(/-\d+\.webp$/, "")}/${
                    data.image
                  }`}
                  path={`/product_detail/${data.id}`}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductList;
