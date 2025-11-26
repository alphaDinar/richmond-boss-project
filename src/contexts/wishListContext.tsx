'use client'
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { Dispatch, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { fireAuth, fireStoreDB } from '@/firebase/base';
import { wishListToken } from '@/external/assets';
import { WishList } from '@/types/wishList';
import { useWishListLoading } from '@/loaders/wishListLoading';

type wishListContextProviderProps = {
  children: ReactNode;
};

type wishListContext = {
  wishList: WishList,
  setWishList: Dispatch<React.SetStateAction<WishList>>;
}

export const WishListContext = createContext<wishListContext | null>(null);

export const WishListContextProvider = ({ children }: wishListContextProviderProps) => {
  const { setWishListLoading } = useWishListLoading();
  const [wishList, setWishList] = useState<WishList>({
    id: "local",
    items: []
  });

  const createWishList = async (uid: string) => {
    await setDoc(doc(fireStoreDB, 'WishLists/' + uid), {
      items: []
    });
  }

  useEffect(() => {
    const authStream = onAuthStateChanged(fireAuth, (userObj) => {
      if (userObj) {
        const customerStream = onSnapshot(doc(fireStoreDB, 'Customers/' + userObj.uid), (customerSnap) => {
          if (customerSnap.exists()) {
            const wishListStream = onSnapshot(doc(fireStoreDB, 'WishLists/' + userObj.uid), (wishListSnap) => {
              if (wishListSnap.exists()) {
                const wishListTemp = ({ id: wishListSnap.id, ...wishListSnap.data() }) as WishList;
                setWishList(wishListTemp);
                setWishListLoading(false);
                return true;
              } else {
                createWishList(userObj.uid);
                setWishList({
                  id: userObj.uid,
                  items: []
                });
                setWishListLoading(false);
                return false;
              }
            });
            return () => wishListStream();
          }
        });
        return () => customerStream();
      } else {
        if (localStorage.getItem(wishListToken)) {
          const wishListItems = JSON.parse(localStorage.getItem(wishListToken)!) as WishList['items'];
          setWishList({ ...wishList, items: wishListItems });
          setWishListLoading(false);
        } else {
          localStorage.setItem(wishListToken, "[]");
          setWishListLoading(false);
        }
      }
    });
    return () => authStream();
  }, [setWishListLoading])

  return (
    <WishListContext.Provider value={{ wishList, setWishList }}>
      {children}
    </WishListContext.Provider>
  )
}

export const useWishList = () => {
  const context = useContext(WishListContext);
  if (!context) {
    throw new Error("useWishListContext must be within a client");
  }
  return context;
}
