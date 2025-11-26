"use client";
import FooterBox from "@/components/FooterBox";
import ProductBox from "@/components/ProductBox";
import TopNav from "@/components/TopNav/TopNav";
import { useBrands } from "@/contexts/brandsContext";
import { useCategories } from "@/contexts/categoriesContext";
import { useProductList } from "@/contexts/productList";
import { arrangeProductsByCategory } from "@/external/sort";
import { useProductsLoading } from "@/loaders/productsLoading";
import { Product } from "@/types/product";
import { CheckboxGroup, Checkbox, Slider, Pagination, Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdTune } from "react-icons/md";

const Products = ({ searchParams }: { searchParams: { page: string, category: string, brand: string } }) => {
  const page = Number(searchParams.page) || 1;
  const category = searchParams.category ? searchParams.category.toLowerCase() : '';
  const brand = searchParams.brand ? searchParams.brand.toLowerCase() : '';
  const router = useRouter();

  const { productsLoading } = useProductsLoading();
  const { productList } = useProductList();
  const { categories } = useCategories();
  const { brands } = useBrands();

  const [sidebarToggled, setSidebarToggled] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const [selectedBrands, setSelectedBrands] = useState<string[]>(brand ? [brand] : []);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(category ? [category] : []);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

  const [pageCounter, setPageCounter] = useState(0);

  const toggleSidebar = () => {
    sidebarToggled ? setSidebarToggled(false) : setSidebarToggled(true);
  }

  useEffect(() => {
    const searchResultsTemp = arrangeProductsByCategory(productList, categories).filter(
      (product) =>
        (searchText === "" ||
          product.name.toLowerCase().includes(searchText.toLowerCase())) &&
        (selectedBrands.length === 0 ||
          selectedBrands.includes(product.brand)) &&
        (selectedCategories.length === 0 ||
          selectedCategories.includes(product.category)) &&
        product.bundles[0].price >= priceRange[0] &&
        product.bundles[0].price <= priceRange[1]
    )
    // .filter((product) => product.category.includes(category));

    // setSelectedCategories([category]);

    setPageCounter(Math.ceil(searchResultsTemp.length / 9));

    const itemsPerPage = 9;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    setSearchResults(searchResultsTemp.slice(startIndex, endIndex));
  }, [page, category, productList, categories, brands, selectedCategories, selectedBrands, priceRange, searchText])

  return (
    <main className="flex flex-col">
      <section className="grid gap-[3vh]">

        <section>

          <TopNav showFullNav={false} />

          <section className="py-10 bg-[var(--bg)] relative  w-full flex items-center justify-center sm-screen:mb-5 sm-screen:bg-[var(--theme)] sm-screen:p-6">
            <span className="text-white text-3xl font-normal">All Products</span>
          </section>
        </section>

        <section id="hor" className="grid grid-cols-[2.5fr_7.5fr] items-start gap-10 md-screen:grid-cols-1">
          <section className={`hidden fixed h-screen w-full bg-black top-0  z-40 opacity-[0.5] md-screen:flex transition-all duration-500 ease-in-out
          ${sidebarToggled ? 'md-screen:left-0' : 'md-screen:-left-full'}
          `} onClick={toggleSidebar}>

          </section>
          <section className={`bg-gray-00 flex flex-col gap-3 items-start md-screen:bg-white md-screen:fixed  md-screen:z-50 h-screen 
        md-screen:top-0 md-screen:p-10 transition-all duration-500 ease-in-out
        ${sidebarToggled ? 'md-screen:left-0' : 'md-screen:-left-full'}
        `}>
            <Input label='search product' value={searchText} onChange={(e) => setSearchText(e.target.value)} />

            <section className="flex-1 flex flex-col gap-10">
              <section>
                <CheckboxGroup
                  label="Categories"
                  onChange={(val) => setSelectedCategories(val)}
                  value={selectedCategories}
                >
                  {categories.map((cat, i) => (
                    <Checkbox size="sm" color="warning" value={cat.id} key={i} className="capitalize">{cat.id}</Checkbox>
                  ))}
                </CheckboxGroup>
              </section>

              <section>
                <CheckboxGroup
                  label="Brands"
                  onChange={(val) => setSelectedBrands(val)}
                  value={selectedBrands}
                >
                  {brands.map((brand, i) => (
                    <Checkbox size="sm" color="warning" value={brand.id} key={i} className="capitalize">{brand.id}</Checkbox>
                  ))}
                </CheckboxGroup>
              </section>


              <section>
                <Slider
                  label="Price Range"
                  step={50}
                  minValue={0}
                  maxValue={5000}
                  color="warning"
                  size="sm"
                  defaultValue={[100, 4000]}
                  formatOptions={{ style: "currency", currency: "USD" }}
                  className="max-w-md"
                  onChange={(val) => setPriceRange(val as [number, number])}
                />
              </section>


            </section>
          </section>

          <section className="grid gap-10 md-screen:gap-6">
            <header className="hidden md-screen:flex justify-between">
              <Button color="warning" onClick={toggleSidebar}>
                <MdTune className="text-xl" />
              </Button>
            </header>

            <ProductBox products={searchResults} productsLoading={productsLoading} itemCount={9} />

            <article className="flex justify-center">
              <Pagination
                onChange={(val) => router.push(`products?page=${val}`)}
                color="warning" initialPage={1} total={pageCounter} />
            </article>
          </section>
        </section>
      </section>

      <FooterBox />
    </main>
  );
}

export default Products;