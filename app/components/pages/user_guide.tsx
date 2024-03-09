"use client";

import Link from "next/link";
import { useState } from "react";

const UserGuide = () => {
  const questionsItems = [
    {
      question: "変更・キャンセルはできますか？",
      answer:
        "購入後の変更・キャンセルは『到着日限定の商品』につきましてはお受けできません。それ以外の商品については、お届け日の３日前まで（北海道・九州・沖縄県宛に関しては４日前まで）にお問い合わせフォームからご連絡いただけましたら、お承りいたします。それ以降の変更・キャンセルは受け付けられませんのでご了承ください。",
    },
    {
      question: "注文が出来ているか確認したいです。",
      answer:
        "マイページの注文履歴よりご確認いただけます。また、ご注文手続きが完了した際には「ご注文完了メール」をお送りしています。",
    },
    {
      question: "領収書を発行してほしいです。",
      answer:
        "領収書は、商品出荷後に マイページ よりダウンロードできます。「注文履歴」の各詳細ページをご確認ください。また、複数商品を一度に購入された場合の領収書は、合計金額での発行となります。商品ごとに別々に領収書が必要な場合は、別々に購入手続きをしてください。",
    },
    {
      question: "お届け日に相手が不在だったらどうなりますか？",
      answer:
        "配送はヤマト運輸に委託しており、ご不在時は「ご不在連絡票」が投函されます。再配達の希望は、先方様からヤマト運輸へ直接お申し付けください。\n" +
        "ヤマト運輸での保管期間（お届け日を含む3日間）のうちに再配達依頼が無かった場合は、商品は出荷作業場へ還付され破棄となります。その際のご注文代金の返金は致しかねますので、ご在宅の都合を確認の上でご注文ください。",
    },
    {
      question: "ホームページ上の写真と全く同じお花が届きますか？",
      answer:
        "花材の仕入れ状況により、実際の商品と多少の違いがある場合がございます。予めご了承ください。",
    },
  ];

  const [showAnswer, setShowAnswer] = useState<Array<boolean>>(
    Array(questionsItems.length).fill(false)
  );

  const handleClick = (index: number) => {
    const newShowAnswer = [...showAnswer];
    newShowAnswer[index] = !newShowAnswer[index];
    setShowAnswer(newShowAnswer);
  };

  const deliveryDetails = [
    { area: "北海道", address: "", price: 1320 },
    { area: "北東北", address: "青森・秋田・岩手", price: 1100 },
    { area: "南東北", address: "宮城・山形・福島", price: 913 },
    {
      area: "関東",
      address: "茨城・栃木・群馬・埼玉・千葉・東京・神奈川・山梨	",
      price: 913,
    },
    { area: "信越", address: "新潟・長野", price: 913 },
    { area: "北陸", address: "富山・石川・福井", price: 913 },
    { area: "中部", address: "静岡・愛知・三重・岐阜", price: 913 },
    {
      area: "関西",
      address: "大阪・京都・滋賀・奈良・和歌山・兵庫",
      price: 1100,
    },
    { area: "中国", address: "岡山・広島・山口・鳥取・島根", price: 1100 },
    { area: "四国", address: "香川・徳島・愛媛・高知", price: 1100 },
    {
      area: "九州",
      address: "福岡・佐賀・長崎・大分・熊本・宮崎・鹿児島",
      price: 1320,
    },
    { area: "沖縄", address: "", price: 3036 },
  ];

  const cannotDelivery = [
    { name: "東京都 / 小笠原村（父島・母島）" },
    { name: "長崎県 / 対馬市" },
    { name: "鹿児島県 / 奄美市、大島郡、鹿児島郡" },
  ];

  return (
    <div className="px-8 max-w-[1040px] mx-auto">
      <section className="my-12">
        <h1 className="mb-8">よくある質問</h1>
        <div className="my-12">
          <div className="border border-gray-400 rounded-lg p-4 m-2 376px:p-4 376px:m-2 560px:p-8 560px:m-8">
            <ul>
              {questionsItems.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(idx);
                    }}
                  >
                    <span className="text-yellow-500 font-semibold">
                      Q &nbsp;
                    </span>
                    {item.question}
                  </Link>
                  {showAnswer[idx] && <p className="p-4">{item.answer}</p>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="my-12" style={{ maxWidth: 900 }}>
        <article className="m-4">
          <h2>商品について</h2>
          <div className="p-2">
            <h3 className="text-red-800">ラッピング・梱包について</h3>
            <p className="leading-relaxed">
              ブーケ /
              アレンジメント商品は、商品代金の中に予めギフトラッピング料金が含まれています。
            </p>
          </div>
          <div className="p-2">
            <h3 className="text-red-800">メッセージカード</h3>
            <p className="leading-relaxed">
              お花にメッセージカードを添えることができます。メッセージカードは無料のサービスです。
              メッセージ内容を1行20文字×9行の範囲内でご記入ください。
            </p>
          </div>
          <div className="p-2">
            <h3 className="text-red-800">お祝札</h3>
            <p className="leading-relaxed">
              法人宛の御祝花や、お店の開店・移転等のお祝いでお届けの場合、メッセージカードを御祝札形式でお花におつけすることも可能です。
              メッセージカード欄の1行目に＜札を希望＞とご記入いただき、2行目以降に札の内容をご記入ください。
            </p>
          </div>
        </article>
        <article className="m-4">
          <h2>お届けについて</h2>
          <div className="p-2">
            <h3 className="text-red-800">配達時間の指定</h3>
            <div>
              <p className="leading-relaxed">
                当店ではヤマト運輸に委託してのお届けとなります。
                ご注文時に、以下の配達時間帯指定枠よりお選びいただけます。
              </p>
              <ul className="ml-4 list-disc list-inside">
                <li>午前中（8時～12時）</li>
                <li>14時～16時</li>
                <li>16時～18時</li>
                <li>18時～20時</li>
                <li>19時～21時</li>
              </ul>
            </div>
          </div>
          <div className="p-2">
            <h3 className="text-red-800">配送ができない地域</h3>
            <div>
              <p className="leading-relaxed">
                お花は生ものですので、離島の他一部の地域につきましては、お届けにかかるお時間と品質保持の関係上、配送を見合わせております。配送できない地域は以下になっております。ご了承ください。
              </p>
              <h4>【配送ができない地域一覧】</h4>
              <ul className="ml-4 list-disc list-inside">
                {cannotDelivery.map((item, idx) => (
                  <li key={idx}>{item.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="p-2">
            <h3 className="text-red-800">配送方法・配送料金</h3>
            <div>
              <p className="leading-relaxed mb-8">
                ご購入された商品は、「表参道本店」、「こどもの国店」にて制作し、ヤマト運輸に委託して全国へお届けいたします。
                （一部、産地直送商品等、発送場所が異なる場合もございます。）
                送料はお届け先により変わりますので、以下の料金表にてご確認ください。
              </p>
              <div className="mb-8 relative overflow-x-auto block 376px:block 560px:hidden">
                <ul className="ml-4 list-disc list-inside">
                  {deliveryDetails.map((delivery, idx) => (
                    <li key={idx} className="font-semibold">
                      {delivery.area} / ￥{delivery.price}円<br />
                      <p className="font-normal text-2xl pl-10">
                        {delivery.address}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-8 relative overflow-x-auto hidden 376px:hidden 560px:block">
                <table className="w-full text-left text-gray-900">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 w-36">エリア</th>
                      <th className="px-6 py-3">お届け先</th>
                      <th className="px-6 py-3 w-46">送料（税込）</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deliveryDetails.map((delivery, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="px-6 py-3">{delivery.area}</td>
                        <td className="px-6 py-3">{delivery.address}</td>
                        <td className="px-6 py-3">￥{delivery.price}円</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <h4>【配送ができない地域一覧】</h4>
              <ul className="ml-4 list-disc list-inside">
                {cannotDelivery.map((item, idx) => (
                  <li key={idx}>{item.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </article>
        <article className="m-4">
          <h2>お支払い方法</h2>
          <div className="p-2">
            <h3 className="text-red-800">クレジット決済</h3>
          </div>
          <div className="p-2">
            <h3 className="text-red-800">PayPay決済</h3>
          </div>
          <div className="p-2">
            <h3 className="text-red-800">銀行振り込み</h3>
          </div>
        </article>
        <article className="m-4">
          <h2>ご注文後について</h2>
          <div className="p-2">
            <h3 className="text-red-800">不在時の対応</h3>
            <p className="leading-relaxed">
              お届け先様がご不在の場合、配送を委託しているヤマト運輸のご不在連絡票が投函されます。
              商品の再配達のご希望は、ご不在連絡票に記載されているヤマト運輸連絡先まで直接お申し付けいただきますようお願いします。
              お届け先様のご不在により保管期間中にお届けができなかった場合の返金・無償の再配送はいたしません。
              当店では指定日配送を承っておりますので、予めご在宅状況をご確認の上でご注文いただきますようお願いいたします。
            </p>
          </div>
          <div className="p-2">
            <h3 className="text-red-800">注文後のキャンセル・変更について</h3>
            <p className="leading-relaxed">
              商品につきましてはお届け日の3日前までにお問い合わせフォームよりご連絡いただましたら、お承りします。ただし、北海道・九州・沖縄県に関しては4日前までとさせていただきます。
              それ以降の変更・キャンセルは受け付けられませんのでご了承ください。
            </p>
          </div>
          <div className="p-2">
            <h3 className="text-red-800">商品お届け後の返品・交換について</h3>
            <p className="leading-relaxed">
              花や観葉植物は生ものですので、商品お届け後の返品・交換はお受けしかねます。
              品質には万全を期しておりますが、万一、お届けの際に商品の劣化・破損が起こった場合には、同等の商品を再度お届けさせていただきますので、商品到着後2日以内にご連絡くださいますようお願いいたします。
              不在など、お客様都合で商品がお届けできなかった場合の責任はおいかねますのでご了承ください。
            </p>
          </div>
        </article>
        <article className="m-4">
          <h2>会員登録について</h2>
          <div className="p-2">
            <h3 className="text-red-800">会員登録手順</h3>
          </div>
          <div className="p-2">
            <h3 className="text-red-800">パスワードをお忘れの場合</h3>
          </div>
          <div className="p-2">
            <h3 className="text-red-800">マイページ</h3>
          </div>
        </article>
      </section>
    </div>
  );
};

export default UserGuide;
