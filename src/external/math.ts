import { Review } from "@/types/product";

export const getRatingAverage = (reviews: Review[]): number => {
  const totalRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round(totalRatings / reviews.length);
}
export const getDiscountPercentage = (storePrice: number, price: number): string => {
  if (storePrice <= 0 || price <= 0 || price > storePrice) {
    return "0 %";
  } else {
    const discount = ((storePrice - price) / storePrice) * 100;
    return `${Math.ceil(discount)}%`;
  }
}