import AddressDeleteConfirm from "@/app/components/pages/addressDeleteConfirm";
import { META_DESCRIPTION_ADDRESS_DELETE_CONFIRM, shopName } from "@/config/config";
import { createClient } from "@/utils/supabase-server";
import { notFound } from "next/navigation";

export const metadata = {
  title: `アドレス帳情報削除 | ${shopName}`,
  description: META_DESCRIPTION_ADDRESS_DELETE_CONFIRM,
};

type PageProps = {
  searchParams: {
    address_id: number;
  };
};

const AddressDeleteConfirmPage = async ({ searchParams }: PageProps) => {
  const supabase = createClient();
  // address取得
  const { data: addressData } : any = await supabase
    .from("addresses")
    .select()
    .eq("id", searchParams.address_id)
    .order("id", { ascending: true })
    .single();
  if (!addressData) return notFound();
    
  const tableData = [
    { head: "氏名（漢字）", data: [addressData.name] },
    { head: "氏名（カナ）", data: [addressData.name_kana] },
    {
      head: "住所",
      data: [
        `〒${addressData.postcode}  ${addressData.prefecture}${addressData.city_street_address}`,
        `${addressData.building_apartment} ${addressData.company_department}`,
      ],
    },
    { head: "電話番号", data: [addressData.phone_number] },
    {
      head: "宅配BOX",
      data: [addressData.use_postbox ? "不在時に宅配ボックスを利用" : ""],
    },
  ];  

  return (
    <AddressDeleteConfirm
      tableData={tableData}
      address_id={searchParams.address_id}
    />
  );
};

export default AddressDeleteConfirmPage;