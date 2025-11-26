'use client'
import { Dispatch, ReactNode, createContext, useContext, useState } from "react";

type CustomerLoadingContextProviderProps = {
  children: ReactNode;
};

type CustomerLoadingContext = {
  customerLoading: boolean,
  setCustomerLoading: Dispatch<React.SetStateAction<boolean>>;
}

export const CustomerLoadingContext = createContext<CustomerLoadingContext | null>(null);

export const CustomerLoadingContextProvider = ({ children }: CustomerLoadingContextProviderProps) => {
  const [customerLoading, setCustomerLoading] = useState<boolean>(true);

  return (
    <CustomerLoadingContext.Provider value={{ customerLoading, setCustomerLoading }}>
      {children}
    </CustomerLoadingContext.Provider>
  )
}

export const useCustomerLoading = () => {
  const context = useContext(CustomerLoadingContext);
  if (!context) {
    throw new Error("useCustomerLoadinContext must be within a ContextProvider");
  }
  return context;
}
