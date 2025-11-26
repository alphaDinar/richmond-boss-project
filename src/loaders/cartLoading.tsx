'use client'
import { Dispatch, ReactNode, createContext, useContext, useState } from "react";

type cartLoadingContextProviderProps = {
  children: ReactNode;
};

type cartLoadingContext = {
  cartLoading: boolean,
  setCartLoading: Dispatch<React.SetStateAction<boolean>>;
}

export const CartLoadingContext = createContext<cartLoadingContext | null>(null);

export const CartLoadingContextProvider = ({ children }: cartLoadingContextProviderProps) => {
  const [cartLoading, setCartLoading] = useState<boolean>(true);

  return (
    <CartLoadingContext.Provider value={{ cartLoading, setCartLoading }}>
      {children}
    </CartLoadingContext.Provider>
  )
}

export const useCartLoading = () => {
  const context = useContext(CartLoadingContext);
  if (!context) {
    throw new Error("useCartLoadingContext must be within a layout");
  }
  return context;
}
