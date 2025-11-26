'use client'
import { doc, onSnapshot } from 'firebase/firestore';
import { Dispatch, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { fireStoreDB } from '@/firebase/base';
import { Product } from '@/types/product';
import { useProductsLoading } from '@/loaders/productsLoading';

interface defType extends Record<string, any> { };
type productListContextProviderProps = {
  children: ReactNode;
};

type productListContext = {
  productList: Product[],
  setProductList: Dispatch<React.SetStateAction<Product[]>>;
}

export const ProductListContext = createContext<productListContext | null>(null);

export const ProductListContextProvider = ({ children }: productListContextProviderProps) => {
  const { setProductsLoading } = useProductsLoading();
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    const productListStream = onSnapshot(doc(fireStoreDB, 'Register/' + 'products'), (snapshot) => {
      if (snapshot.exists()) {
        const productListTemp = ({ ...snapshot.data() } as defType);
        setProductList(productListTemp.list);
        setProductsLoading(false);
      }
    });
    return () => productListStream();
  }, [setProductsLoading])

  return (
    <ProductListContext.Provider value={{ productList, setProductList }}>
      {children}
    </ProductListContext.Provider>
  )
}

export const useProductList = () => {
  const context = useContext(ProductListContext);
  if (!context) {
    throw new Error("useProductListContext must be within a client");
  }
  return context;
}
