"use client";

import Link from "next/link";
import CardsForCorporate from "../molecules/cardsForCorporate";

const CorporateCustomers = () => {
  const cards = [
    {
      title: "胡蝶蘭",
      content:
        "贈答品として人気の高い胡蝶蘭は、長期間楽しめる魅力があります。お客様のご要望に応じて、花の色やサイズを選ぶことができます。また、オリジナルのラッピングやメッセージカードもご用意いたします。",
      imgPath: "/images/company-phalaenopsis.jpg",
    },
    {
      title: "スタンド花",
      content:
        "開店祝いやイベント、表彰式などの華やかなシーンにぴったりなスタンド花。豪華な花材を使用し、お客様のイメージや予算に合わせてオーダーメイドでお作りいたします。メッセージカードもお付けできますので、感謝の気持ちを伝えるのに最適です。",
      imgPath: "/images/company-stand.jpg",
    },
    {
      title: "アレンジメント",
      content:
        "オフィスや店舗のインテリアに彩りを添えるアレンジメント。季節の花をふんだんに使用し、お客様の好みや空間に合わせてデザインいたします。定期的なお届けも可能ですので、いつでも新鮮な花が楽しめます。",
      imgPath: "/images/company-arrangement.jpg",
    },
    {
      title: "ディスプレイ",
      content:
        "当店では、店内やイベント会場などの空間を彩るディスプレイサービスもご提供しております。お客様の要望やテーマに合わせたオリジナルのデザインで、空間に華やかさと温かみを添えます。",
      imgPath: "/images/company-display.jpg",
    },
  ];
  return (
    <>
      <div className="relative w-full h-full -mb-4">
        <div
          className="relative w-full inline-block bg-cover bg-center bg-no-repeat bg-fixed z-0"
          style={{
            backgroundImage: `url(/images/company-main.jpg)`,
            height: `100vh`,
          }}
        >
          <div className="fixed top-1/2 tracking-wide bg-fixed">
            <h1 className="ml-8 text-white font-normal text-shadow">
              ビジネスの舞台で輝く
              <br />
              印象に残るフラワーギフト
            </h1>
          </div>
        </div>
      </div>
      <div className="relative px-8 bg-gray-50">
        <section className="py-12">
          <h2 className="my-8 font-semibold">サービス</h2>
          <div className="mx-auto">
            <div className="grid 376px:grid-cols-1 560px:grid-cols-2 gap-8">
              {cards.map((card, index) => (
                <CardsForCorporate
                  key={index}
                  title={card.title}
                  content={card.content}
                  imgPath={card.imgPath}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="py-12">
          <div className="flex justify-center">
            <div
              className="px-8 py-16 bg-white border border-gray-200 rounded-lg shadow text-center"
              style={{ maxWidth: 640 }}
            >
              <h3 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
                お問い合わせ
              </h3>
              <p className="mb-8 text-gray-700">
                お客様のニーズやご要望に合わせて、お手伝いさせていただきますので、お気軽にお問い合わせください。
                <br />
              </p>
              <div className="flex justify-center gap-12">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-4 font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-700"
                >
                  フォームからはこちら
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </Link>
                <Link
                  href="tel:+81-3-3423-4187"
                  className="inline-flex items-center px-6 py-4 font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-700 560px:hidden"
                >
                  電話からはこちら
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CorporateCustomers;
