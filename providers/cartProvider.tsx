'use client'

import React, {
  createContext,
  useState,
  Dispatch,
  useEffect,
  ReactNode,
} from "react";
import cookie from "js-cookie";
import { CartItem, productType } from "../utils/product.types";


export type CartContextType = {
  cart: Array<CartItem>;
  setCart: Dispatch<Array<CartItem>>;
  addCart: (addedItem: productType) => void;
  removeCart: (idx: number) => void;
  removeCartAll: () => void;
  changeQuantity: (idx: number, quantity: number) => void;
  totalQuantity: number;
};

// CartContextの作成
export const CartContext = createContext<CartContextType>({} as CartContextType);

type Props = {
  children: ReactNode;
};

export const CartProvider = (props: Props) => {
  const { children } = props;
  const [cart, setCart] = useState<CartItem[]>([]);
  const cartItemIds = cart.map((item) => item.id);
  const totalQuantity = cart.reduce((acc, cur) => acc + cur.quantity, 0);

  useEffect(() => {
    const currentCartJson = cookie.get("cart") || "[]";
    setCart(JSON.parse(currentCartJson));
  }, []);  

  /* カートへ追加 */
  const addCart = (addedItem: productType) => {
    if (cartItemIds.includes(addedItem.id)) {
      const newCart = cart.map((item) => {
        if (item.id === addedItem.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      setCart(newCart);
    } else {
      setCart([...cart, { ...addedItem, quantity: 1 }]);
    }
  };

  /* カートから削除 */
  const removeCart = (idx: number) => {
    if (!cartItemIds.includes(idx)) return;
    const newCart = cart.filter((item) => item.id !== idx);
    setCart(newCart);
  };

  /* カートから商品すべて削除 */
  const removeCartAll = () => {
    setCart([]);
  };  

  /* 商品の個数を変更 */
  const changeQuantity = (idx: number, quantity: number) => {
    const newCart = cart.map((item) => {
      if (item.id === idx) {
        return {
          ...item,
          quantity: quantity,
        };
      }
      return item;
    });
    setCart(newCart);
  };

  useEffect(() => {
    cookie.set("cart", JSON.stringify(cart), { expires: 1 });
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart, 
        addCart,
        removeCart,
        removeCartAll,
        changeQuantity,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
