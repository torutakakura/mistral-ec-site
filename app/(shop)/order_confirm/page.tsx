import { META_DESCRIPTION_ORDER_CONFIRM, shopName } from "@/config/config";
import OrderConfirm from "../../components/pages/orderConfirm";

export const metadata = {
  title: `ご注文確認 | ${shopName}`,
  description: META_DESCRIPTION_ORDER_CONFIRM,
};

const OrderConfirmPage = () => {
  return <OrderConfirm />;
};

export default OrderConfirmPage;
