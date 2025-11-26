export type WishItem = {
  id: string,
  pid: string,
  displayName: string,
  category: string,
  img: string,
};

export type WishList = {
  id: string,
  items: WishItem[]
};