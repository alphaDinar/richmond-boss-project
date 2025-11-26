'use client'
import { Dispatch, ReactNode, createContext, useContext, useState } from "react";

type brandsLoadingContextProviderProps = {
  children: ReactNode;
};

type brandsLoadingContext = {
  brandsLoading: boolean,
  setBrandsLoading: Dispatch<React.SetStateAction<boolean>>;
}

export const BrandsLoadingContext = createContext<brandsLoadingContext | null>(null);

export const BrandsLoadingContextProvider = ({ children }: brandsLoadingContextProviderProps) => {
  const [brandsLoading, setBrandsLoading] = useState<boolean>(true);

  return (
    <BrandsLoadingContext.Provider value={{ brandsLoading, setBrandsLoading }}>
      {children}
    </BrandsLoadingContext.Provider>
  )
}

export const useBrandsLoading = () => {
  const context = useContext(BrandsLoadingContext);
  if (!context) {
    throw new Error("useBrandLoadingContext must be within a layout");
  }
  return context;
}
