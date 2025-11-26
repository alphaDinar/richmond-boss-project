import { doc, updateDoc } from "firebase/firestore";
import { fireStoreDB } from "./base";
import { wishListToken } from "@/external/assets";
import { WishItem, WishList } from "@/types/wishList";
import { Product } from "@/types/product";

export const createWishItem = (pid: string, displayName: string, category: string, img: string): WishItem => {
  return {
    id: pid,
    pid: pid,
    displayName: displayName,
    category: category,
    img: img,
  };
}

export const wishExists = (pid: string, items: WishItem[]): boolean => {
  return items.filter((item) => item.id === pid).length > 0;
}

export const refineWishItems = (productList: Product[], items: WishItem[]): Product[] => {
  return items
    .map((item) => productList.find((prod) => prod.id === item.pid)) // This returns (Product | undefined)[]
    .filter((product): product is Product => product !== undefined);
}

export const addToWishList = async (wishItem: WishItem, wishList: WishList, nextStep: Function): Promise<WishItem[]> => {
  const wishListId = wishList.id;
  const wishSet = wishList.items;

  const finalWishSet = wishSet.filter((item) => item.id === wishItem.id).length ? wishSet.filter((item) => item.id !== wishItem.id) : [...wishSet, wishItem];
  if (wishListId === 'local') {
    localStorage.setItem(wishListToken, JSON.stringify(finalWishSet));
  } else {
    await updateDoc(doc(fireStoreDB, 'WishLists/' + wishListId), {
      items: finalWishSet
    })
  }
  nextStep();
  return finalWishSet;
};
