import { Customer } from "./customer";
import { Bundle, Variation } from "./product";

export type LocationType = {
  lat: number,
  lon: number
};

export type OrderItem = {
  id: string,
  displayName: string,
  pid: string,
  category: string,
  img: string,
  bundleTag: Bundle['data'][0],
  variationTag: Variation['val'],
  bundle: Bundle,
  variation: Variation,
  quantity: number,
  total: number,
};

export type CheckoutInfo = {
  region: string,
  address: string,
  location: LocationType,
  contact: string,
};

export type Order = {
  id: string,
  uid: string,
  customer: Customer,
  contact: string,
  isCompleted: boolean,
  items: OrderItem[],
  payInfo: {
    status: boolean,
    link: string,
    ref: string
  } | null,
  payMode: 'online' | 'offline',
  checkoutInfo: CheckoutInfo,
  total: number,
  timestamp: number,
};

