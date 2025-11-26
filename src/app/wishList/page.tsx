"use client";
import FooterBox from "@/components/FooterBox";
import TopNav from "@/components/TopNav/TopNav";
import { useProductList } from "@/contexts/productList";
import { useWishList } from "@/contexts/wishListContext";
import { cedi } from "@/external/assets";
import { addToWishList, createWishItem, refineWishItems } from "@/firebase/wishListService";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { LuEye } from "react-icons/lu";
import { useDisclosure } from "@nextui-org/modal";
import { useEffect, useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import ProductModal from "@/components/ProductModal";
import { Product as ProductType } from "@/types/product";

const WishList = () => {
  const { productList } = useProductList();
  const { wishList, setWishList } = useWishList();

  const [refinedWishProducts, setRefinedWishProducts] = useState<ProductType[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    setRefinedWishProducts(refineWishItems(productList, wishList.items));
  }, [productList, wishList])

  const handleWishList = async (product: ProductType) => {
    const wishSet = await addToWishList(
      createWishItem(product.id, product.displayName, product.category, product.image.url),
      wishList,
      () => { }
    )
    if (wishList.id === 'local') {
      setWishList({ ...wishList, items: wishSet });
    }
  }

  return (
    <main>
      <section className="grid gap-[3vh]">

        <section className="md-screen:grid md-screen:gap-[3vh]">
          <TopNav showFullNav={false} />

          <section className="py-10 bg-[var(--bg)] relative  w-full flex items-center justify-center  sm-screen:bg-[var(--theme)] sm-screen:p-6">
            <span className="text-white text-3xl font-normal">Wishlist</span>
          </section>
        </section>

        <section id="hor" className="grid gap-2">
          {refinedWishProducts.map((prod, i) => (
            <section key={i} className="flex gap-6 items-center border  p-5 rounded-[20px] sm-screen:grid">
              <article>
                <div className="h-16 w-16  p-2 relative">
                  <Image alt="" src={prod.image.url} fill className="object-contain" />
                </div>
              </article>

              <article className="flex flex-col gap-1 flex-1">
                <strong>{prod.displayName}</strong>
                <span>{cedi}
                  {prod.bundles.length ? prod.bundles.length > 1
                    ?
                    ` ${prod.bundles[0].price.toLocaleString()} - ${prod.bundles[prod.bundles.length - 1].price.toLocaleString()}`
                    :
                    ` ${prod.bundles[0].price.toLocaleString()}`
                    :
                    0
                  }
                </span>
              </article>

              <article className="flex gap-3 items-center ">
                <Button isIconOnly className="p-0 bg-transparent" size="sm"
                  onClick={() => {
                    setSelectedProduct(prod);
                    onOpen();
                  }}
                >
                  <LuEye className="cursor-pointer border border-gray-500 rounded-[11px] w-7 h-7 p-1 text-gray-500" />
                </Button>
                {/* <Button className="bg-[var(--theme)] text-white"
                  onClick={async () => {
                    setFormLoading(true);
                    const orderSet = await addToCart(
                      createCartItem(product.id, product.displayName, product.category, product.image.url, activeBundle, activeVariation, Number(quantity)),
                      cart,
                      Number(quantity),
                      () => { alert('done') }
                    );
                    setFormLoading(false);
                    if (cart.id === 'local') {
                      setCart({ ...cart, items: orderSet });
                    }
                  }
                  }}
                >Add To Cart</Button> */}
                <Button isIconOnly className="p-0" size="sm"
                  onClick={() => handleWishList(prod)}
                >
                  <MdDeleteOutline className="bg-red-500 w-8 h-8 p-1 rounded-md text-white cursor-pointer" />
                </Button>
              </article>
            </section>
          ))}
        </section>
      </section>

      {
        selectedProduct &&
        <ProductModal product={selectedProduct} isOpen={isOpen} onOpenChange={onOpenChange} />
      }

      <FooterBox />
    </main >
  );
}

export default WishList;