'use client'
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { Dispatch, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { genToken } from '../external/hash';
import { useCartLoading } from '../loaders/cartLoading';
import { Cart } from '@/types/cart';
import { Customer } from '@/types/customer';
import { fireAuth, fireStoreDB } from '@/firebase/base';
import { cartToken } from '@/external/assets';
import { useProductList } from './productList';
import { refineCartItems } from '@/firebase/cartService';

type cartContextProviderProps = {
  children: ReactNode;
};

type cartContext = {
  cart: Cart,
  setCart: Dispatch<React.SetStateAction<Cart>>;
}

export const CartContext = createContext<cartContext | null>(null);

export const CartContextProvider = ({ children }: cartContextProviderProps) => {
  const { setCartLoading } = useCartLoading();
  const { productList } = useProductList();
  const [cart, setCart] = useState<Cart>({
    id: "local",
    items: []
  });

  useEffect(() => {
    const createCart = async (uid: string) => {
      await setDoc(doc(fireStoreDB, 'Carts/' + uid), {
        items: []
      });
    }

    const authStream = onAuthStateChanged(fireAuth, (userObj) => {
      if (userObj) {
        const customerStream = onSnapshot(doc(fireStoreDB, 'Customers/' + userObj.uid), (customerSnap) => {
          if (customerSnap.exists()) {
            console.log('logged in');
            const cartStream = onSnapshot(doc(fireStoreDB, 'Carts/' + userObj.uid), (cartSnap) => {
              if (cartSnap.exists()) {
                const cartTemp = ({ id: cartSnap.id, ...cartSnap.data() }) as Cart;
                setCart(cartTemp);
                setCartLoading(false);
                return true;
              } else {
                createCart(userObj.uid);
                setCart({
                  id: userObj.uid,
                  items: []
                });
                setCartLoading(false);
                return false;
              }
            });
            return () => cartStream();
          }
        });
        return () => customerStream();
      } else {
        if (localStorage.getItem(cartToken)) {
          const cartItems = JSON.parse(localStorage.getItem(cartToken)!) as Cart['items'];
          setCart({ ...cart, items: cartItems });
          setCartLoading(false);
        } else {
          localStorage.setItem(cartToken, "[]");
          setCartLoading(false);
        }
      }
    });
    return () => authStream();
  }, [setCartLoading])

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be within a client");
  }
  return context;
}
