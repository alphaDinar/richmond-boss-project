import { Product } from "@/types/product"

export const imageStyles = (product: Product) => {
  return `${product.image.format === 'png' ? 'scale-[0.9] object-contain hover:scale-[1]' : 'object-cover object-top hover:scale-[1.1]'} transform transition duration-500`
}
