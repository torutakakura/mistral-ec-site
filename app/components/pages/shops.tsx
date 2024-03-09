"use client";

import HeadingImage from "../molecules/headingImage";

const Shops = () => {
  return (
    <>
      <HeadingImage
        heading="店舗紹介"
        imagePath="/images/shops-main.jpg"
        alt="店舗紹介の見出し画像"
      />
      <div className="px-8 max-w-[1040px] mx-auto">
        <section className="my-12">
          <h2 className="w-full font-semibold shadow bg-gray-200 py-4 px-6 my-8 inline-block">
            表参道本店
          </h2>
          <div className="flex flex-wrap justify-center items-start">
            <div className="w-full 560px:w-1/2 p-2">
              <div className="p-4 rounded-lg">
                <img
                  className="w-full"
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_BUCKETS_URL}shops/omotesanndo/omotesanndo-1.webp`}
                  alt=""
                />
              </div>
            </div>
            <div className="w-full 560px:w-1/2 p-2">
              <div className="p-4 rounded-lg">
                <div className="relative" style={{ paddingTop: "56.25%" }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.2550760423806!2d139.71162751613323!3d35.67072078019695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188ca1d724e643%3A0xffb86b3f4f573e51!2z44Of44K544OI44Op44Or!5e0!3m2!1sja!2sjp!4v1680536365614!5m2!1sja!2sjp"
                    allowFullScreen={true}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            <div className="w-full 560px:w-1/2 p-2">
              <div className="p-4 rounded-lg">
                <table className="w-full">
                  <tbody>
                    <tr>
                      <th
                        className="text-left p-6 border-b border-t border-green-500"
                        style={{ minWidth: 80 }}
                      >
                        住所
                      </th>
                      <td className="text-left p-6 border-b border-t border-grey-500">
                        〒150-0001 東京都渋谷区神宮前3-42-3 1F
                        <br />
                        半蔵門線「表参道駅」A2出口より徒歩10分
                      </td>
                    </tr>
                    <tr>
                      <th
                        className="text-left p-6 border-b border-green-500"
                        style={{ minWidth: 100 }}
                      >
                        営業時間
                      </th>
                      <td className="text-left p-6 border-b border-grey-500">
                        10:00 ～ 19:00
                      </td>
                    </tr>
                    <tr>
                      <th
                        className="text-left p-6 border-b border-green-500"
                        style={{ minWidth: 80 }}
                      >
                        定休日
                      </th>
                      <td className="text-left p-6 border-b border-grey-500">
                        日曜日
                      </td>
                    </tr>
                    <tr>
                      <th
                        className="text-left p-6 border-b border-green-500"
                        style={{ minWidth: 80 }}
                      >
                        TEL
                      </th>
                      <td className="text-left p-6 border-b border-grey-500">
                        03-3423-4187
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-full 560px:w-1/2 p-2">
              <div className="p-4 rounded-lg">
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
                  <h5 className="mb-2 font-bold tracking-tight text-gray-900">
                    スタッフメッセージ
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    私たちは受け取られる方が感動し、その時の思い出に残るお花を
                    お客様とご相談しながら提案していきます。
                    お花というものはいつも、人と人とのあいだにあるものだからこそ、
                    ひとつひとつを真剣に大切にしています。
                    <br />
                    もちろん、ご予算に応じたお花をお作りいたします。
                    お母さんへのプレゼントから、企業やお店へのご贈答のスタンドや開店祝いなど
                    あらゆるご注文を精一杯承ります。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="my-12">
          <h2 className="w-full font-semibold shadow bg-gray-200 py-4 px-6 my-8 inline-block">
            こどもの国店
          </h2>
          <div className="flex flex-wrap justify-center items-start">
            <div className="w-full 560px:w-1/2 p-2">
              <div className="p-4 rounded-lg">
                <img
                  className="w-full"
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_BUCKETS_URL}shops/kodomonokuni/kodomonokuni-1.webp`}
                  alt=""
                />
              </div>
            </div>
            <div className="w-full 560px:w-1/2 p-2">
              <div className="p-4 rounded-lg">
                <div className="relative" style={{ paddingTop: "56.25%" }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.2550760423806!2d139.71162751613323!3d35.67072078019695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188ca1d724e643%3A0xffb86b3f4f573e51!2z44Of44K544OI44Op44Or!5e0!3m2!1sja!2sjp!4v1680536365614!5m2!1sja!2sjp"
                    allowFullScreen={true}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            <div className="w-full 560px:w-1/2 p-2">
              <div className="p-4 rounded-lg">
                <table className="w-full">
                  <tbody>
                    <tr>
                      <th
                        className="text-left p-6 border-b border-t border-green-500"
                        style={{ minWidth: 80 }}
                      >
                        住所
                      </th>
                      <td className="text-left p-6 border-b border-t border-grey-500">
                        〒227-0038 神奈川県横浜市青葉区奈良1-2-1
                        <br />
                        こどもの国線「こどもの国駅」より徒歩5分
                      </td>
                    </tr>
                    <tr>
                      <th
                        className="text-left p-6 border-b border-green-500"
                        style={{ minWidth: 100 }}
                      >
                        営業時間
                      </th>
                      <td className="text-left p-6 border-b border-grey-500">
                        10:00 ～ 21:00
                      </td>
                    </tr>
                    <tr>
                      <th
                        className="text-left p-6 border-b border-green-500"
                        style={{ minWidth: 80 }}
                      >
                        定休日
                      </th>
                      <td className="text-left p-6 border-b border-grey-500">
                        ※定休日はスーパー三和に準ずる
                      </td>
                    </tr>
                    <tr>
                      <th
                        className="text-left p-6 border-b border-green-500"
                        style={{ minWidth: 80 }}
                      >
                        TEL
                      </th>
                      <td className="text-left p-6 border-b border-grey-500">
                        045-963-5602
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-full 560px:w-1/2 p-2">
              <div className="p-4 rounded-lg">
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
                  <h5 className="mb-2 font-bold tracking-tight text-gray-900">
                    スタッフメッセージ
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    私たちは受け取られる方が感動し、その時の思い出に残るお花を
                    お客様とご相談しながら提案していきます。
                    お花というものはいつも、人と人とのあいだにあるものだからこそ、
                    ひとつひとつを真剣に大切にしています。
                    <br />
                    もちろん、ご予算に応じたお花をお作りいたします。
                    お母さんへのプレゼントから、企業やお店へのご贈答のスタンドや開店祝いなど
                    あらゆるご注文を精一杯承ります。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Shops;
