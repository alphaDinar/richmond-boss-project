import { Cart } from "@/types/cart";
import { CheckoutInfo, OrderItem } from "@/types/order";
import { Product } from "@/types/product";

export const adminContact = "233549229565";

// https://www.maqete.com/viewProduct?pid=pid1712242309342
const space = "%0A";

const base = (con: string) => {
  return `https://api.whatsapp.com/send/?phone=${adminContact}&text=${con}&type=phone_number&app_absent=0`
};


export const productChat = (prod: Product) => {
  const con = `Good day,${space}Please I am interested in the: ${space} ${prod.displayName}`;
  return base(con);
}


export const checkoutChat = (orderItems: OrderItem[]) => {
  const con = `Good day,${space}Please I would like to order these products${space} ${space}${orderItems.map((item) => (`${item.displayName}  ${item.variationTag && `(${item.variationTag})`} x ${item.quantity} ${space}`)).join('')}`;

  return base(con);
}

export const checkoutChatWithInfo = (items: Cart['items'], checkoutInfo: CheckoutInfo) => {
  const info = checkoutInfo;
  const con = `Good day,${space}Please I would like to order these products${space} ${space}${items.map((item) => (`${item.displayName}  ${item.variationTag && `(${item.variationTag})`} x ${item.quantity} ${space}`)).join('')}------------------------------------${space}------------------------------------${space}${space}Region: ${info.region}${space}Location: ${info.address}${space}Contact: ${info.contact}`;

  return base(con);
}