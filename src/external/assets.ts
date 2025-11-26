import { LocationType } from "@/types/order";
// import {logo} from "../../public/logo.png";

export const cedi = "₵";

export const cartToken = "maqCart";
export const wishListToken = "maqWishList";
export const authTargetToken = "maqAuthTarget";
export const checkoutInfoToken = "maqCheckoutInfo";

// export const logoImg = logo;

export const defLocation: LocationType = { lat: 6.659400597106649, lon: -1.6314196304618849 };

type prompt = {
  status: boolean,
  text: string,
  type: string,
}

export const fixPrompt = (type: string, text: string): prompt => {
  return {
    status: true,
    text: text,
    type: type
  }
}