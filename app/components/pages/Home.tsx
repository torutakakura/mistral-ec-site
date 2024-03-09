import { priceList } from "@/config/config";
import ImageCarousel from "../../components/molecules/imageCouousel";
import OriginalCard from "../../components/molecules/originalCard";
import Link from "next/link";
import { createClient } from "@/utils/supabase-server";
import { notFound } from "next/navigation";

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

const Home = async () => {
  const supabase = createClient();

  // colors取得
  const { data: colorsData } = await supabase
    .from("colors")
    .select()
    .order("id", { ascending: true });

  // colorsが見つからない場合
  if (!colorsData) return notFound();

  // flower_types取得
  const { data: flowerTypeData } = await supabase
    .from("flower_types")
    .select()
    .order("id", { ascending: true });

  // flower_typesが見つからない場合
  if (!flowerTypeData) return notFound();

  // how_to_uses取得
  const { data: howToUsesData } = await supabase
    .from("how_to_uses")
    .select()
    .order("id", { ascending: true });

  // how_to_usesが見つからない場合
  if (!howToUsesData) return notFound();

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
  const filterRestaurant = productsData?.filter((item) => {
    return item.for_restaurant === true;
  });
  const restaurantCardData = randomSelect(filterRestaurant, 4);
  const filterPresent = productsData?.filter((item) => {
    return item.for_present === true;
  });
  const presentCardData = randomSelect(filterPresent, 4);

  return (
    <>
      <ImageCarousel />
      <div className="px-8 max-w-[1040px] mx-auto">
        <section className="my-16">
          <h2 className="text-center my-6">おすすめ商品</h2>
          <div className="grid-rows-1 grid grid-cols-2 760px:grid-cols-4 gap-8">
            {recommendCardData.map((data, index) => (
              <div key={index}>
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

        <section className="my-16">
          <h2 className="text-center my-6">レストランやお店などへ</h2>
          <div className="grid-rows-1 grid grid-cols-2 760px:grid-cols-4 gap-8">
            {restaurantCardData.map((data, index) => (
              <div key={index}>
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

        <section className="my-16">
          <h2 className="text-center my-6">大切な方への贈り物</h2>
          <div className="grid-rows-1 grid grid-cols-2 760px:grid-cols-4 gap-8">
            {presentCardData.map((data, index) => (
              <div key={index}>
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

        <section className="my-16">
          <h2 className="text-center my-6">商品検索</h2>
          <div className="my-12">
            <h3 className="text-center my-4 py-4 px-8 bg-gray-200 font-semibold">
              用途でえらぶ
            </h3>
            <ul className="px-16 grid grid-rows-1 grid-cols-1 376px:grid-cols-2 560px:grid-cols-3 960px:grid-cols-5 justify-content-center gap-4">
              {howToUsesData.map((using, idx) => (
                <Link
                  key={idx}
                  className="hover:no-underline"
                  href={`/product_list?using_id=${using.id}`}
                >
                  <li className="flex justify-between" key={idx}>
                    <div>{using.name}</div>
                    <span className="376px:hidden block">＞</span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <div className="my-12">
            <h3 className="text-center my-4 py-4 px-8 bg-gray-200 font-semibold">
              形でえらぶ
            </h3>
            <ul className="grid-rows-1 grid grid-cols-2 560px:grid-cols-3 760px:grid-cols-4 justify-items-center gap-4">
              {flowerTypeData.map((flowerStyle, idx) => (
                <li key={idx}>
                  <Link href={`/product_list?flower_id=${flowerStyle.id}`}>
                    <img
                      className="max-w-none w-56"
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_BUCKETS_URL}flower-types/${flowerStyle.image}`}
                      alt={flowerStyle.name}
                    />
                    <p className="w-full text-center">{flowerStyle.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="my-12">
            <h3 className="text-center my-4 py-4 px-8 bg-gray-200 font-semibold">
              価格でえらぶ
            </h3>
            <ul className="px-12 grid-rows-1 grid grid-cols-1 376px:grid-cols-3 960px:grid-cols-6 gap-4">
              {priceList.map((price, idx) => (
                <Link
                  key={idx}
                  className="376px:no-underline hover:no-underline"
                  href={`/product_list?price_id=${price.id}`}
                >
                  <li className="flex justify-between" key={idx}>
                    <div>{price.range}</div>
                    <span className="376px:hidden block">＞</span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <div className="my-12">
            <h3 className="text-center my-4 py-4 px-8 bg-gray-200 font-semibold">
              色でえらぶ
            </h3>
            <ul className="px-12 grid-rows-1 grid grid-cols-1 376px:grid-cols-1 560px:grid-cols-2 960px:grid-cols-3 gap-4">
              {colorsData.map((color, idx) => (
                <Link
                  key={idx}
                  className={`${color.class_name} relative 376px:no-underline hover:no-underline`}
                  href={`/product_list?color_id=${color.id}`}
                >
                  <li
                    className="p-6 border border-gray-200 rounded-lg shadow h-full"
                  >
                    <h4 className="font-semibold">{color.name}</h4>
                    <p>{color.description}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </section>

        <section className="my-16">
          <h2 className="my-8 font-semibold">会社概要</h2>
          <div className="relative m-4 overflow-x-auto">
            <table className="w-full  text-left">
              <tbody>
                <tr>
                  <th
                    className="text-left p-6 border-b border-t border-green-500"
                    style={{ minWidth: 80 }}
                  >
                    会社名
                  </th>
                  <td className="text-left p-6 border-b border-t border-grey-500">
                    有限会社ミストラル
                  </td>
                </tr>
                <tr>
                  <th
                    className="text-left p-6 border-b border-green-500"
                    style={{ minWidth: 80 }}
                  >
                    所在地
                  </th>
                  <td className="text-left p-6 border-b border-grey-500">
                    〒150-0001 東京都渋谷区神宮前3-42-3 1F
                    <br />
                    半蔵門線「表参道駅」A2出口より徒歩10分
                  </td>
                </tr>
                <tr>
                  <th
                    className="text-left p-6 border-b border-green-500"
                    style={{ minWidth: 80 }}
                  >
                    代表者
                  </th>
                  <td className="text-left p-6 border-b border-grey-500">
                    代表取締役 高倉 誠
                  </td>
                </tr>
                <tr>
                  <th
                    className="text-left p-6 border-b border-green-500"
                    style={{ minWidth: 80 }}
                  >
                    設立
                  </th>
                  <td className="text-left p-6 border-b border-grey-500">
                    1991年11月1日
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="my-16 mx-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.2550760423806!2d139.71162751613323!3d35.67072078019695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188ca1d724e643%3A0xffb86b3f4f573e51!2z44Of44K544OI44Op44Or!5e0!3m2!1sja!2sjp!4v1680536365614!5m2!1sja!2sjp"
              className="w-full"
              style={{ height: 320, border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
