'use client'
import { Dispatch, ReactNode, createContext, useContext, useState } from "react";

type wishListLoadingContextProviderProps = {
  children: ReactNode;
};

type wishListLoadingContext = {
  wishListLoading: boolean,
  setWishListLoading: Dispatch<React.SetStateAction<boolean>>;
}

export const WishListLoadingContext = createContext<wishListLoadingContext | null>(null);

export const WishListLoadingContextProvider = ({ children }: wishListLoadingContextProviderProps) => {
  const [wishListLoading, setWishListLoading] = useState<boolean>(true);

  return (
    <WishListLoadingContext.Provider value={{ wishListLoading, setWishListLoading }}>
      {children}
    </WishListLoadingContext.Provider>
  )
}

export const useWishListLoading = () => {
  const context = useContext(WishListLoadingContext);
  if (!context) {
    throw new Error("useWishListLoadingContext must be within a layout");
  }
  return context;
}
