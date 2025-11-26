import { Bundle, Variation } from "./product";

export type CartItem = {
  id: string,
  displayName: string,
  pid: string,
  category: string,
  img: string,
  bundleTag: Bundle['data'][0],
  variationTag: Variation['val'],
  quantity: number,
};

export type Cart = {
  id: string,
  items: CartItem[]
};