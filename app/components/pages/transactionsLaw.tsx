"use client";

const TransactionsLaw = () => {
  const tableData = [
    { head: "ネット店舗名", data: ["ミストラル"] },
    { head: "運営元", data: ["	有限会社 ミストラル"] },
    { head: "運営責任者", data: ["高倉 誠"] },
    { head: "所在地", data: ["〒150-0001 東京都渋谷区神宮前3-42-3 1F"] },
    { head: "連絡先", data: ["TEL03-3423-4187"] },
    { head: "メール", data: ["mail@flower-mistral.com"] },
    { head: "問い合わせ", data: ["お問い合わせフォーム"] },
    { head: "業務内容", data: ["生花販売"] },
    { head: "営業時間", data: ["10:00～19:00（定休日：日・祝日）"] },
    { head: "設立", data: ["平成3年11月1日法人化"] },
    { head: "従業員数", data: ["15 人"] },
    { head: "販売価格", data: ["商品毎に記載"] },
    {
      head: "販売価格以外に必要な費用",
      data: ["消費税/送料/後払い決済手数料/ギフトラッピング費用"],
    },
    {
      head: "引渡時期",
      data: [
        "支払い手続き完了後、順次発送致します。",
        "また商品により期日指定も受けつけております。",
      ],
    },
    { head: "キャンセル", data: ["こちらをご覧ください。"] },
    {
      head: "辺品について",
      data: [
        "商品の発送トラブル以外での返品は受けかねます。",
        "万一、そのような事がございましたら、すぐに03-3423-4187までご連絡お願いします。",
      ],
    },
  ];
  return (
    <div className="px-8 max-w-[1040px] mx-auto">
      <section className="my-12">
        <h1 className="mb-8">特定商取引法に基づく表記</h1>
        <div className="my-12">
          <div className="relative m-4 overflow-x-auto hidden 376px:hidden 560px:block">
            <table className="w-full text-left">
              <tbody>
                {tableData.map((item, idx) => (
                  <tr key={idx}>
                    <th className="p-4 border border-gray-400 bg-gray-200">
                      {item.head}
                    </th>
                    <td className="p-4 border border-gray-400">
                      {item.data.map((sentence) => (
                        <>
                          {sentence}
                          <br />
                        </>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mb-8 relative overflow-x-auto block 376px:block 560px:hidden">
            <ul className="ml-4 list-disc list-inside">
              {tableData.map((item, idx) => (
                <li key={idx} className="font-semibold mb-2">
                  {item.head}
                  <br />
                  <p className="font-normal text-2xl pl-10">{item.data}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TransactionsLaw;
