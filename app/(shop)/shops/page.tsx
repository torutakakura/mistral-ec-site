import { META_DESCRIPTION_SHOPS, shopName } from "@/config/config";
import Shops from "../../components/pages/shops";

export const metadata = {
  title: `店舗紹介 | ${shopName}`,
  description: META_DESCRIPTION_SHOPS,
};

const ShopsPage = () => {
  return <Shops />;
};

export default ShopsPage;
