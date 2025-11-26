'use client'
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { Dispatch, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { fireStoreDB } from '@/firebase/base';
import { Brand } from '@/types/category';
import { useBrandsLoading } from '@/loaders/brandsLoading';

type brandsContextProviderProps = {
  children: ReactNode;
};

type brandsContext = {
  brands: Brand[],
  setBrands: Dispatch<React.SetStateAction<Brand[]>>;
}

export const BrandsContext = createContext<brandsContext | null>(null);

export const BrandsContextProvider = ({ children }: brandsContextProviderProps) => {
  const { setBrandsLoading } = useBrandsLoading();
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const brandStream = onSnapshot(collection(fireStoreDB, 'Brands/'), (snapshot) => {
      setBrands(snapshot.docs.map((prod) => ({ id: prod.id, ...prod.data() })) as Brand[]);
      setBrandsLoading(false);
    });
    return () => brandStream();
  }, [setBrandsLoading])

  return (
    <BrandsContext.Provider value={{ brands, setBrands }}>
      {children}
    </BrandsContext.Provider>
  )
}

export const useBrands = () => {
  const context = useContext(BrandsContext);
  if (!context) {
    throw new Error("useBrandsContext must be within a client");
  }
  return context;
}
