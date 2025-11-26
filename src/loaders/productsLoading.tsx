'use client'
import { Dispatch, ReactNode, createContext, useContext, useState } from "react";

type productsLoadingContextProviderProps = {
  children: ReactNode;
};

type productsLoadingContext = {
  productsLoading: boolean,
  setProductsLoading: Dispatch<React.SetStateAction<boolean>>;
}

export const ProductsLoadingContext = createContext<productsLoadingContext | null>(null);

export const ProductsLoadingContextProvider = ({ children }: productsLoadingContextProviderProps) => {
  const [productsLoading, setProductsLoading] = useState<boolean>(true);

  return (
    <ProductsLoadingContext.Provider value={{ productsLoading, setProductsLoading }}>
      {children}
    </ProductsLoadingContext.Provider>
  )
}

export const useProductsLoading = () => {
  const context = useContext(ProductsLoadingContext);
  if (!context) {
    throw new Error("useProductsLoadingContext must be within a layout");
  }
  return context;
}
