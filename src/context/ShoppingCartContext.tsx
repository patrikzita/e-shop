import { createContext, ReactNode, useContext, useState } from "react";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: string;
  quantity: number;
};

type ShoppingCartContext = {
  cartItems: CartItem[];
  increaseQuantity: (id: string) => number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  return (
    <ShoppingCartContext.Provider value={{ cartItems }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
