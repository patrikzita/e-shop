import { createContext, ReactNode, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: string;
};

type ShoppingCartContext = {
  cartItems: CartItem[];
  increaseCartQuantity: (id: string) => void;
  removeCartItems: () => void;
  removeCartItem: (id: string) => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  function increaseCartQuantity(id: string) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id) == null) {
        return [...currentItems, { id }];
      } else {
        return [...currentItems];
      }
    });
  }
  function removeCartItems() {
    setCartItems([]);
  }
  function removeCartItem(id: string) {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id != id);
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        increaseCartQuantity,
        removeCartItems,
        removeCartItem,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
