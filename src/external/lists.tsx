import { IoPhonePortraitOutline } from "react-icons/io5";
import { TbPerfume } from "react-icons/tb";
import { PiWatchLight } from "react-icons/pi";
import { BsEarbuds } from "react-icons/bs";
import { CgAppleWatch } from "react-icons/cg";

export const paymentMethodList = [
  // { tag: 'Paystack', img: 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1707772904/Agrivestafrica/paystack_elrs9j.png' },
  { tag: 'MTN', img: 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1707773080/Agrivestafrica/mtn_tlljga.png' },
  { tag: 'Vodafone', img: 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1707773155/Agrivestafrica/voda-removebg-preview_1_c8njum.png' },
  { tag: 'AirtelTigo', img: 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1707773220/Agrivestafrica/airtel-removebg-preview_1_possew.png' },
  { tag: 'Visa', img: 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1707773591/Agrivestafrica/visa-removebg-preview_1_gvzm2h.png' },
  { tag: 'Master', img: 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1707773592/Agrivestafrica/master_mhgszl.webp' }
]

export const categoryIcons = [
  { tag: 'earbuds', icon: <BsEarbuds className="text-xl" /> },
  { tag: 'fragrance', icon: <TbPerfume className="text-xl" /> },
  { tag: 'phones', icon: <IoPhonePortraitOutline className="text-xl" /> },
  { tag: 'watches', icon: <PiWatchLight className="text-xl" /> },
  { tag: 'smart watches', icon: <CgAppleWatch className="text-xl" /> }
];

export const regionList: string[] = [
  "Greater Accra",   // 5,455,692
  "Ashanti",         // 2,035,064
  "Eastern",         // 2,925,653
  "Central",         // 2,201,863
  "Western",         // 2,060,585
  "Northern",        // 2,310,939
  "Bono East",       // 1,203,400
  "Upper East",      // 1,301,226
  "North East",      // 658,946
  "Savannah",        // 653,266
  "Ahafo",           // Population not provided
  "Oti",             // Population not provided
  "Bono",            // Population not provided
  "Volta",           // Population not provided
  "Western North",   // Population not provided
];

