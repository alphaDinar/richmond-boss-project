import RatingBox from "@/components/RatingBox/RatingBox";
import { useProductList } from "@/contexts/productList";
import { cedi } from "@/external/assets";
import { getDiscountPercentage } from "@/external/math";
import { imageStyles } from "@/styles/styles";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";

const DealBox = () => {
  const { productList } = useProductList();

  return (
    productList.length ?
      <section className="grid grid-cols-[6.5fr_3fr] gap-10 md-screen:grid-cols-1" id="hor">
        <section className="h-[480px] p-5 flex flex-col gap-5 border rounded-[20px] sm-screen:h-auto">
          <strong className="border-b-gray-200 border-b-1 pb-2 text-xl">Deal Of The Day</strong>
          <section className="flex-1 grid grid-cols-2 gap-10 items-center sm-screen:flex sm-screen:flex-col-reverse sm-screen:gap-7">
            <section className="py-5 flex flex-col gap-4 sm-screen:w-full sm-screen:py-0">
              <article className="flex flex-col">
                <strong className="text-lg">{productList[0].displayName}</strong>
                <small>{productList[0].description}</small>
              </article>
              <RatingBox reviews={productList[0].reviews} />
              <article>
                <p className="flex gap-1 items-center">
                  <span className="line-through">GH{cedi} {productList[0].bundles[0].storePrice.toLocaleString()}</span>
                  <small>{getDiscountPercentage(productList[0].bundles[0].storePrice, productList[0].bundles[0].price)}% off</small>
                </p>
                <strong>GH{cedi} {productList[0].bundles[0].price.toLocaleString()}</strong>
              </article>

              {/* <legend className="flex gap-1">
                {Array(4).fill(null).map((el, i) => (
                  <div className="w-11 h-11 border rounded-[15px] font-bold flex items-center justify-center" key={i}>10</div>
                ))}
              </legend> */}

              <nav className="flex gap-2">
                <Button radius="md" className="bg-[var(--theme)] text-white">Add To Cart</Button>
                <Button radius="md" className="bg-[var(--theme)] text-white">Buy Now</Button>
              </nav>
            </section>
            <section className="relative h-full overflow-hidden rounded-[20px] sm-screen:h-64 sm-screen:w-full">
              <Image alt="" src={productList[1].image.url} fill className={`${imageStyles(productList[1])} object-left`} />
            </section>
          </section>
        </section>
        <section className="h-[480px] rounded-[20px]  p-5 flex flex-col gap-5 border">
          <strong className="border-b-gray-200 border-b-1 pb-2 text-xl">Top Rating</strong>
          <section className="flex-1 grid gap-8">
            {productList.slice(7, 9).map((el, i) => (
              <Link href={'/'} className="grid grid-cols-2 gap-5 items-center" key={i}>
                <section className="relative h-full overflow-hidden rounded-md">
                  <Image alt="" src={el.image.url} fill className={`${imageStyles(el)}`} />
                </section>
                <article className="flex flex-col">
                  <strong className="line-clamp-1">{productList[0].displayName}</strong>
                  <RatingBox reviews={productList[0].reviews} />
                  <strong>GH{cedi} {el.bundles[0].price.toLocaleString()}</strong>
                </article>
              </Link>
            ))}
          </section>
        </section>
      </section>
      :
      <section></section>
  );
}

export default DealBox;