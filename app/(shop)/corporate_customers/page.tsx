import {
  META_DESCRIPTION_CORPORATE_CUSTOMERS,
  shopName,
} from "@/config/config";
import CorporateCustomers from "../../components/pages/corporate_customers";

export const metadata = {
  title: `法人のお客様 | ${shopName}`,
  description: META_DESCRIPTION_CORPORATE_CUSTOMERS,
};

const CorporateCustomersPage = () => {
  return <CorporateCustomers />;
};

export default CorporateCustomersPage;
