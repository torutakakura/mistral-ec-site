"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative bg-green-700 text-center py-8 px-10 376px:py-8 376px:px-10 560px:py-16 560px:px-20 text-gray-50">
      <div className="mb-6">
        <Link className="text-gray-50" href="/">
          <img
            className="inline"
            width={144}
            src="/images/logo-white.jpg"
            alt="ミストラル・ホワイトロゴ画像"
          />
        </Link>
      </div>
      <div className="mb-6">
        <Link className="mx-4 my-2 inline-block" href="/product_list">
          商品一覧
        </Link>
        <Link className="mx-4 my-2 inline-block" href="/shops">
          店舗紹介
        </Link>
        <Link className="mx-4 my-2 inline-block" href="/contact">
          お問い合わせ
        </Link>
        <Link className="mx-4 my-2 inline-block" href="/cart">
          カートを見る
        </Link>
        <Link className="mx-4 my-2 inline-block" href="/corporate_customers">
          法人のお客様
        </Link>
        <Link className="mx-4 my-2 inline-block" href="/user_guide">
          よくある質問
        </Link>
      </div>
      <div className="flex flex-col w-full text-2xl">
        <div className="mb-8">
          <Link className="mr-8" href="https://www.facebook.com/flower.mistral/">
            <img
              className="inline w-12"
              src="/images/button-facebook.png"
              alt="Facebookのリンク"
            />
          </Link>
          <Link
            className="mr-8"
            href="https://www.instagram.com/mistral_hanaya/"
          >
            <img
              className="inline w-12"
              src="/images/button-instagram.png"
              alt="Istagramのリンク"
            />
          </Link>
        </div>
        <hr className="mb-8" />
        <Link
          className="block 376px:block 560px:hidden leading-loose"
          href="/term_of_use"
        >
          利用規約
        </Link>
        <Link
          className="block 376px:block 560px:hidden leading-loose"
          href="/privacy"
        >
          個人情報保護基本方針
        </Link>
        <Link
          className="block 376px:block 560px:hidden leading-loose"
          href="/transactions_law"
        >
          特定商取引法に基づく表記
        </Link>
        <div className="hidden 376px:hidden 560px:block mb-4">
          <Link href="/term_of_use">利用規約</Link> <span> | </span>
          <Link href="/privacy">個人情報保護基本方針</Link>
          <span> | </span>
          <Link href="/transactions_law">特定商取引法に基づく表記</Link>
        </div>
        <span>&copy;2023 Le mistral, Y.K. All Rights Reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
