"use client";
import TopNav from "@/components/TopNav/TopNav";
import HeadBox from "./home/HeadBox";
import OfferBox from "./home/OfferBox";
import ShowBox from "./home/ShowBox";
import StoreBox from "./home/StoreBox";
import SkillBox from "./home/SkillBox";
import DealBox from "./home/DealBox";
import TrendBox from "./home/TrendBox";
import FooterBox from "@/components/FooterBox";
import ProductSlide from "@/components/ProductSlide/ProductSlide";
import { useProductList } from "@/contexts/productList";
import { useProductsLoading } from "@/loaders/productsLoading";
import ProductBox from "@/components/ProductBox";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { arrangeProductsByCategory, sortByPrices } from "@/external/sort";
import TopProductBox from "./home/TopProductBox";
import { useCategories } from "@/contexts/categoriesContext";

const Home = () => {
  const { productList } = useProductList();
  const { productsLoading } = useProductsLoading();

  const { categories } = useCategories();

  const [topProducts, setTopProducts] = useState<Product[]>([]);

  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);

  useEffect(() => {
    setCategoryProducts(arrangeProductsByCategory(productList, categories));
  }, [productList, categories])

  return (
    <main className="flex flex-col gap-14">
      <section className="flex flex-col gap-6">
        <TopNav showFullNav={true} />
        <HeadBox />
      </section>

      <SkillBox />

      {/* <TopProductBox /> */}
      <section id="hor">
        <ProductBox products={categoryProducts.slice(0, 8)} productsLoading={productsLoading} itemCount={4} />
      </section>

      <ShowBox />

      {/* <DealBox /> */}
      {/* <span>Testimonials</span> */}

      {/* <TrendBox /> */}


      <section id="hor">
        <ProductSlide productList={categoryProducts.slice(9)} productsLoading={productsLoading} showNav={true} showHeader={true} headerText="Best Sellers" />
      </section>

      <OfferBox />

      {/* <StoreBox /> */}

      <FooterBox />
    </main>
  );
}

export default Home;