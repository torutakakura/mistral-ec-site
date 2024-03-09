import { META_DESCRIPTION_DELIVERY_ADDRESSES, shopName } from "@/config/config";
import DeliveryAddresses from "../../components/pages/deliveryAddresses";

export const metadata = {
  title: `アドレス帳 | ${shopName}`,
  description: META_DESCRIPTION_DELIVERY_ADDRESSES,
};

type PageProps = {
  searchParams: {
    list_type: string;
  };
};

const DeliveryAddressesPage = async ({ searchParams }: PageProps) => {
  const { list_type } = searchParams;
  return <DeliveryAddresses listType={list_type} />;
};

export default DeliveryAddressesPage;
