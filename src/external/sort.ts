import { Category } from "@/types/category";
import { Product } from "@/types/product";

export const sortByPrices = (products: Product[]) => {
  const updatedProducts = products.sort((a, b) => b.bundles[0].price - a.bundles[0].price);
  return updatedProducts;
}


export const arrangeProductsByCategory = (productList: Product[], categories: Category[]) => {
  let productListTemp = [...productList];
  const arrangedProducts = [];

  let allProductsExhausted = false;

  while (!allProductsExhausted) {
    let cycleCompleted = true; // Flag to check if we completed a full cycle

    for (const category of categories) {
      const filteredProducts = productListTemp.filter(prod => prod.category === category.id);
      const sortedProducts = sortByPrices(filteredProducts).reverse(); // Sort by price descending
      const topTwo = sortedProducts.slice(0, 2); // Get top 2 products
      if (topTwo.length > 0) {
        arrangedProducts.push(...topTwo); // Add to the main array
        productListTemp = productListTemp.filter(prod => !topTwo.includes(prod)); // Remove added products from productList
        cycleCompleted = false; // There are still products left to process
      }
    }
    allProductsExhausted = cycleCompleted;
  }

  return arrangedProducts;
}