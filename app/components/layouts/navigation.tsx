"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import useStore from "../../../store";
import type { Session } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/utils/database.types";
type ProfileType = Database["public"]["Tables"]["profiles"]["Row"];

const Navigation = ({
  session,
  profile,
}: {
  session: Session | null;
  profile: ProfileType | null;
}) => {
  const { setUser } = useStore();
  const [displayType, setDisplayType] = useState<string>("hidden");
  const navigationItems = [
    { name: "商品一覧", path: "/product_list" },
    { name: "店舗紹介", path: "/shops" },
    { name: "お問い合わせ", path: "/contact" },
    { name: "カートを見る", path: "/cart" },
    { name: "法人のお客様", path: "/corporate_customers" },
  ];
  const snsItems = [
    {
      link: "https://www.facebook.com/flower.mistral/",
      alt: "Facebookのリンク",
      imagePath: "/images/button-facebook.png",
    },
    {
      link: "https://www.instagram.com/mistral_hanaya/",
      alt: "Instagramのリンク",
      imagePath: "/images/button-instagram.png",
    },
  ];
  
  useEffect(() => {
    setUser({
      id: session ? session.user.id : "",
      email: session ? session.user.email! : "",
      name: session && profile ? profile.name! : "",
      name_kana: session && profile ? profile.name_kana! : "",
      postocde: session && profile ? profile.postcode! : "",
      prefecture: session && profile ? profile.prefecture! : "",
      city_street_address:
        session && profile ? profile.city_street_address! : "",
      building_apartment: session && profile ? profile.building_apartment! : "",
      company_department: session && profile ? profile.company_department! : "",
      phone_number: session && profile ? profile.phone_number! : "",
      use_postbox: session && profile ? profile.use_postbox! : false,
    });    
  }, [session, setUser, profile]);

  

  return (
    <header className="p-6 flex justify-between items-end">
      {/* <!-- ロゴ --> */}
      <Link href="/">
        <img
          className="w-40 376px:w-40 560px:w-52"
          src="/images/logo.png"
          alt="ミストラルのロゴ画像"
        />
      </Link>
      {/* <!-- PC用ナビゲーション --> */}
      <nav className="hidden 376px:hidden 560px:block">
        <ul className="flex">
          {navigationItems.map((item, idx) => (
            <li key={idx} className="mx-4">
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
          <li className="mx-4">
            {session ? (
              <Link href="/my_page">マイページ</Link>
            ) : (
              <Link href="/login">ログイン</Link>
            )}
          </li>
        </ul>
      </nav>

      {/* <!-- スマホ用メニューボタン --> */}
      <img
        className="block 376px:block 560px:hidden absolute top-0 right-0 cursor-pointer"
        src="/images/button-menu.png"
        alt="ナビゲーションを開く"
        onClick={() => setDisplayType("block")}
      />

      {/* <!-- スマホ用ナビゲーション --> */}
      <nav
        className={`${displayType} bg-green-700 absolute top-0 left-0 w-full h-full z-50`}
      >
        <div>
          <img
            className="absolute top-1 right-3"
            src="/images/button-close.png"
            alt="ナビゲーションを閉じる"
            onClick={() => setDisplayType("hidden")}
          />
        </div>
        <Link
          className="block mt-10"
          href="/"
          onClick={() => setDisplayType("hidden")}
        >
          <img width={144} src="/images/logo.png" alt="トップページに戻る" />
        </Link>

        {navigationItems.map((item, idx) => (
          <Link
            className="block ml-8 mt-4 text-white"
            key={idx}
            href={item.path}
            onClick={() => setDisplayType("hidden")}
          >
            {item.name}
          </Link>
        ))}
        {session ? (
          <Link
            className="block ml-8 mt-4 text-white"
            href="/my_page"
            onClick={() => setDisplayType("hidden")}
          >
            マイページ
          </Link>
        ) : (
          <Link
            className="block ml-8 mt-4 text-white"
            href="/login"
            onClick={() => setDisplayType("hidden")}
          >
            ログイン
          </Link>
        )}
        <div>
          {snsItems.map((items, idx) => (
            <Link key={idx} href={items.link}>
              <img
                className="inline-block ml-8 mt-8 w-10"
                src={items.imagePath}
                alt={items.alt}
              />
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
