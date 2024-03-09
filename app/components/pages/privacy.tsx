"use client";

const Privacy = () => {
  return (
    <div className="px-8 max-w-[1040px] mx-auto">
      <h1 className="mt-8">個人情報保護基本方針</h1>
      <section className="my-8" style={{ maxWidth: 900 }}>
        <div className="mb-6">
          <div className="p-4">
            <p>
              当社では、以下の個人情報保護基本方針を定めます。お客様の個人情報を保護するために細心の注意を払っています。
              当社のサービス、商品を購入した場合、プライバシーポリシーに同意したものとみなされます。
              <br />
              本プライバシーポリシーの内容を熟読してご理解ください。
            </p>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="border-b-2 border-green-700 mb-4">個人情報の範囲</h2>
          <div className="p-4">
            <p>
              「個人情報」とは個人に関する情報です。その情報に含まれる氏名、生年月日、E
              メールアドレス、住所、電話番号など、その個人を識別できるものを個人情報とします。
            </p>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="border-b-2 border-green-700 mb-4">個人情報の取得</h2>
          <div className="p-4">
            <p>
              いくつかのサービスをご利用いただく際に、氏名、生年月日、Email
              アドレス、住所等の個人情報を収集させていただく場合があります。これらの情報は、すべて下記の収集目的に従って、適法かつ公正な手段により収集されます。
            </p>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="border-b-2 border-green-700 mb-4">
            個人情報の利用目的
          </h2>
          <div className="p-4">
            <ul>
              <li>ご注文の商品をお届けするため</li>
              <li>ダイレクトメール、ご案内をお届けするため</li>
              <li>お客様と連絡を取るため</li>
            </ul>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="border-b-2 border-green-700 mb-4">
            個人情報の第三者への開示
          </h2>
          <div className="p-4">
            <p>
              当社では、お客様からご提供頂きました個人情報は、以下のいずれかに該当する場合を除き、如何なる第三者にも開示致しません。
            </p>
            <ul>
              <li>お客様の同意がある場合</li>
              <li>法令等により、関係機関より開示を求められた場合</li>
              <li>
                上記のうちで、お客様個人を識別することができない状態で開示する場合
              </li>
              <li>業務遂行に必要な限度で個人情報の取扱いを委託する場合</li>
            </ul>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="border-b-2 border-green-700 mb-4">
            個人データの共同利用
          </h2>
          <div className="p-4">
            <p>
              当社では、お客様の個人情報を、業務委託先等へ必要な範囲において開示する場合があります。
              業務委託先等の開示とは、お届け物等の配送サービスを委託した会社等にお客様のお名前、宛先を知らせることがこれにあたります。
            </p>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="border-b-2 border-green-700 mb-4">
            個人情報の安全管理について
          </h2>
          <div className="p-4">
            <p>
              お客様の個人情報の管理につきまして、当社では、管理責任者を定め、適切な管理を行います。個人情報の外部への流出防止に努めます。
              <br />
              個人情報の不当なアクセスによる紛失、破壊、改ざん、漏洩などのリスクに対して、合理的かつ厳正な安全対策を講じます。
              <br />
              弊社の責に帰すべからざる事由を原因とする個人情報の紛失、破壊、改ざん、漏洩などに関しては、弊社では責任を負いかねますのでご注意ください。{" "}
            </p>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="border-b-2 border-green-700 mb-4">
            クッキー等による情報収集について
          </h2>
          <div className="p-4">
            <p>
              当社は、お客様のアクセス履歴及び利用状況の確認、その他お客様に最適のサービスを提供するために、お客様が本サービスにアクセスされる際のIPアドレスに関する情報、お客様のアクセス履歴等に関する情報をクッキー等の技術を使用して、収集します。お客様がブラウザでクッキー等を拒否するための設定をされた場合、本サービスの一部機能が制限される可能性もありますので、予めご了承ください。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
