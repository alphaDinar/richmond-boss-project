'use client'
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { Dispatch, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { fireStoreDB } from '@/firebase/base';
import { useCategoriesLoading } from '@/loaders/categoriesLoading';
import { Category } from '@/types/category';

type categoriesContextProviderProps = {
  children: ReactNode;
};

type categoriesContext = {
  categories: Category[],
  setCategories: Dispatch<React.SetStateAction<Category[]>>;
}

export const CategoriesContext = createContext<categoriesContext | null>(null);

export const CategoriesContextProvider = ({ children }: categoriesContextProviderProps) => {
  const { setCategoriesLoading } = useCategoriesLoading();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const categoryStream = onSnapshot(collection(fireStoreDB, 'Categories/'), (snapshot) => {
      setCategories(snapshot.docs.map((prod) => ({ id: prod.id, ...prod.data() })) as Category[]);
      setCategoriesLoading(false);
    });
    return () => categoryStream();
  }, [])

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  )
}

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error("useCategoriesContext must be within a client");
  }
  return context;
}
