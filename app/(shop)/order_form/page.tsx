import { createClient } from "@/utils/supabase-server";
import OrderForm from "../../components/pages/orderForm";
import { META_DESCRIPTION_ORDER_FORM, shopName } from "@/config/config";

export const metadata = {
  title: `ご注文入力 | ${shopName}`,
  description: META_DESCRIPTION_ORDER_FORM,
};

type PageProps = {
  searchParams: {
    address_id: number;
  };
};

const OrderFormPage = async ({ searchParams }: PageProps) => {
  const supabase = createClient();
  // address取得
  let addressData = null;
  if (searchParams.address_id) {
    const { data } = await supabase
      .from("addresses")
      .select()
      .eq("id", searchParams.address_id)
      .order("id", { ascending: true })
      .single();
    addressData = data;
  }
  return <OrderForm addressData={addressData} />;
};

export default OrderFormPage;
