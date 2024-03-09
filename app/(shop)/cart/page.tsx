import { META_DESCRIPTION_CART, shopName } from "@/config/config";
import Cart from "../../components/pages/cart";

export const metadata = {
  title: `カート | ${shopName}`,
  description: META_DESCRIPTION_CART,
};

const CartPage = () => {
  return <Cart />;
};

export default CartPage;
