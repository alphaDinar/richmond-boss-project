'use client'
import { Dispatch, ReactNode, createContext, useContext, useState } from "react";

type categoriesLoadingContextProviderProps = {
  children: ReactNode;
};

type categoriesLoadingContext = {
  categoriesLoading: boolean,
  setCategoriesLoading: Dispatch<React.SetStateAction<boolean>>;
}

export const CategoriesLoadingContext = createContext<categoriesLoadingContext | null>(null);

export const CategoriesLoadingContextProvider = ({ children }: categoriesLoadingContextProviderProps) => {
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);

  return (
    <CategoriesLoadingContext.Provider value={{ categoriesLoading, setCategoriesLoading }}>
      {children}
    </CategoriesLoadingContext.Provider>
  )
}

export const useCategoriesLoading = () => {
  const context = useContext(CategoriesLoadingContext);
  if (!context) {
    throw new Error("useCategoriesLoadingContext must be within a layout");
  }
  return context;
}
