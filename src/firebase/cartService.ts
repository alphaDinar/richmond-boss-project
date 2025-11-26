import { Bundle, Product, Variation } from "@/types/product";
import { Cart, CartItem } from "@/types/cart";
import { doc, updateDoc } from "firebase/firestore";
import { fireStoreDB } from "./base";
import { cartToken } from "@/external/assets";
import { OrderItem } from "@/types/order";

export const createCartItem = (pid: string, displayName: string, category: string, img: string, bundle: Bundle, variation: Variation, quantity: number): CartItem => {
  const id = pid + bundle.price + variation.val;
  return {
    id: id,
    pid: pid,
    displayName: displayName,
    category: category,
    img: img,
    bundleTag: bundle.data[0],
    variationTag: variation.val,
    quantity: quantity
  };
}

export const getItemPrice = (productList: Product[], item: CartItem): number => {
  const prod = productList.find((prod) => prod.id === item.pid);
  return prod?.bundles.find((bun) => bun.data[0] === item.bundleTag)?.price || 0;
}

export const getItemBundle = (productList: Product[], item: CartItem): Bundle => {
  const prod = productList.find((prod) => prod.id === item.pid);
  return prod?.bundles.find((bun) => bun.data[0] === item.bundleTag) || {
    data: ["", ""],
    storePrice: 0,
    price: 0,
    imageIndex: 0,
    quantity: 0
  };
}

export const getItemVariation = (productList: Product[], item: CartItem): Variation => {
  const prod = productList.find((prod) => prod.id === item.pid);
  return prod?.variations.find((varD) => varD.val === item.variationTag) || {
    val: '',
    type: 'color',
    imageIndex: 0
  };
}

export const fixItemBundle = (productList: Product[], item: CartItem) => {
  const itemBundle = getItemBundle(productList, item);
  if (item.category === 'phones') {
    return `${itemBundle.data[0]}GB + ${itemBundle.data[1]}GB`;
  } else {
    return 'category';
  }
}

export const refineCartItems = (productList: Product[], items: CartItem[]): CartItem[] => {
  return items.filter((item) => getItemPrice(productList, item));
}

export const getCartTotal = (productList: Product[], items: CartItem[]): number => {
  const sumTemp = items.reduce((accumulator, item) => {
    return accumulator + (item.quantity * getItemPrice(productList, item));
  }, 0);
  return sumTemp;
}

export const convertCartItemToOrderItem = (productList: Product[], item: CartItem): OrderItem => {
  return {
    id: item.id,
    pid: item.pid,
    category: item.category,
    bundleTag: item.bundleTag,
    variationTag: item.variationTag,
    bundle: getItemBundle(productList, item),
    variation: getItemVariation(productList, item),
    displayName: item.displayName,
    quantity: item.quantity,
    total: item.quantity * getItemPrice(productList, item),
    img: item.img,
  }
}

export const addToCart = async (cartItem: CartItem, cart: Cart, quantity: number, nextStep: Function): Promise<CartItem[]> => {
  const cartId = cart.id;
  const orderSet = cart.items;

  const cartItemTemp = orderSet.find((item) => item.id === cartItem.id);

  if (cartItemTemp) {
    cartItemTemp.quantity = quantity;
  } else {
    orderSet.push(cartItem);
  }

  if (cartId === 'local') {
    localStorage.setItem(cartToken, JSON.stringify(orderSet));
  } else {
    await updateDoc(doc(fireStoreDB, 'Carts/' + cartId), {
      items: orderSet
    })
  }
  nextStep();
  return orderSet;
};

export const addToQuantity = async (id: string, cart: Cart, quantity: number, nextStep: Function): Promise<CartItem[]> => {
  const cartId = cart.id;
  const orderSet = cart.items;

  const cartItemTemp = orderSet.find((item) => item.id === id);

  if (cartItemTemp) {
    cartItemTemp.quantity += quantity;
  }

  if (cartId === 'local') {
    localStorage.setItem(cartToken, JSON.stringify(orderSet));
  } else {
    await updateDoc(doc(fireStoreDB, 'Carts/' + cartId), {
      items: orderSet
    })
  }
  nextStep();
  return orderSet;
};

export const remFromQuantity = async (id: string, cart: Cart, nextStep: Function): Promise<CartItem[]> => {
  const cartId = cart.id;
  const orderSet = cart.items;

  const cartItemTemp = orderSet.find((item) => item.id === id);

  if (cartItemTemp) {
    if (cartItemTemp.quantity > 1) {
      cartItemTemp.quantity = cartItemTemp.quantity - 1;
      if (cartId === 'local') {
        localStorage.setItem(cartToken, JSON.stringify(orderSet));
      } else {
        await updateDoc(doc(fireStoreDB, 'Carts/' + cartId), {
          items: orderSet
        })
      }
      nextStep();
    }
    else {
      clearItemFromCart(id, cart, nextStep);
      return [];
    }
  }
  return orderSet;
};

export const clearItemFromCart = async (id: string, cart: Cart, nextStep: Function): Promise<CartItem[]> => {
  const cartId = cart.id;
  const orderSet = cart.items;

  const orderSetTemp = orderSet.filter((order) => order.id !== id);
  if (cartId === 'local') {
    localStorage.setItem(cartToken, JSON.stringify(orderSetTemp));
  } else {
    await updateDoc(doc(fireStoreDB, 'Carts/' + cartId), {
      items: orderSetTemp
    })
  }
  nextStep();
  return orderSetTemp;
}
