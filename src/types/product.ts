import { MediaType } from "./media";

export type Review = {
  username: string,
  images: string[],
  dp: string,
  content: string,
  rating: number,
  timestamp: number
};

export type Specification = {
  title: string,
  points: string,
};

export type Bundle = {
  data: [string, string | null],
  price: number,
  storePrice: number,
  quantity: number,
  imageIndex: number,
};

export type Variation = {
  val: string,
  type: 'color' | 'size',
  imageIndex: number,
}

export type Product = {
  id: string,
  name: string,
  displayName: string,
  description: string,
  category: string,
  topFeatures: string[],
  brand: string,
  reviews: Review[],
  bundles: Bundle[],
  specifications: Specification[],
  image: MediaType,
  coverImage: MediaType,
  gallery: MediaType[],
  variations: Variation[],
  priority: number,
  returnPolicy: number,
  timestamp: number,
};

export type Offer = {
  id: string,
  pid: string,
  name: string,
  startDate: number,
  endDate: number,
};