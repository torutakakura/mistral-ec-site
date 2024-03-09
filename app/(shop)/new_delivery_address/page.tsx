import { META_DESCRIPTION_NEW_DELIVERY_ADDRESS, shopName } from "@/config/config";
import NewDeliveryAddress from "../../components/pages/newDeliveryAddress";
import { createClient } from "@/utils/supabase-server";

export const metadata = {
  title: `新規アドレス帳登録 | ${shopName}`,
  description: META_DESCRIPTION_NEW_DELIVERY_ADDRESS,
};

type PageProps = {
  searchParams: {
    address_id: number;
  };
};

const NewDeliveryAddressPage = async ({ searchParams }: PageProps) => {
  const supabase = createClient();
  // address取得
  let addressData;
  if (searchParams.address_id) {
    const { data } = await supabase
      .from("addresses")
      .select()
      .eq("id", searchParams.address_id)
      .order("id", { ascending: true })
      .single();
      addressData = data    
  }

  return <NewDeliveryAddress addressData={addressData} />;
};

export default NewDeliveryAddressPage;
