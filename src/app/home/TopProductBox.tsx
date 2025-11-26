"use client";

import ProductBox from "@/components/ProductBox";
import { useCategories } from "@/contexts/categoriesContext";
import { useProductList } from "@/contexts/productList";
import { sortByPrices } from "@/external/sort";
import { useProductsLoading } from "@/loaders/productsLoading";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";

const TopProductBox = () => {
  const { productList } = useProductList();
  const { productsLoading } = useProductsLoading();
  const { categories } = useCategories();

  const [topProducts, setTopProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Function to cycle through categories and arrange products
    // const arrangeProductsByCategories = () => {
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

      // Check if we completed a full cycle without adding any products
      allProductsExhausted = cycleCompleted;
    }

    setTopProducts(arrangedProducts);

    // return arrangedProducts;
    // };

    // Usage
    // const categories = ['fragrance', 'smart watches', 'phones'];
    // const arrangedProductsTemp = arrangeProductsByCategories(productList, categories);

  }, [productList, categories])

  return (
    <section id="hor">
      <ProductBox products={topProducts} productsLoading={productsLoading} itemCount={4} />
    </section>
  );
}

export default TopProductBox;