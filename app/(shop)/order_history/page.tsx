import { META_DESCRIPTION_ORDER_HISTORY, shopName } from "@/config/config";
import OrderHistory from "../../components/pages/orderHistory";

export const metadata = {
  title: `ご購入履歴 | ${shopName}`,
  description: META_DESCRIPTION_ORDER_HISTORY,
};

const OrderHistoryPage = () => {
  return <OrderHistory />;
};

export default OrderHistoryPage;
