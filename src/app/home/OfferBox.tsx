"use client";
import { useProductList } from "@/contexts/productList";
import { cedi } from "@/external/assets";
import { getDiscountPercentage } from "@/external/math";
import { sortByPrices } from "@/external/sort";
import Image from "next/image";
import Link from "next/link";
import { MdEast } from "react-icons/md";

const OfferBox = () => {
  const place = "https://tester-henna.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdvnemzw0z%2Fimage%2Fupload%2Fv1725630611%2FTesters%2Fapple_mgym3am_a_airpods_max_pink_1610237-removebg-preview_d6bgqq.png&w=1920&q=75";

  const { productList } = useProductList();

  const colorList = [
    "#8ad1c7"
  ]

  return (
    <section id="hor" className="grid gap-2">
      <Link href={'/offers'} className="flex font-semibold gap-1 items-center justify-end">More Offers <MdEast /></Link>
      <section className="gap-2" id="items250">
        {(sortByPrices(productList)).slice(0, 3).map((prod, i) => (
          <Link href={`/viewProduct?id=${prod.id}`} key={i} className={`bg-[#8ad1c7] gap-8 rounded-[30px] grid grid-cols-2 p-8 text-white h-64 sm-screen:flex sm-screen:flex-col-reverse sm-screen:gap-3 sm-screen:h-auto`}>
            <section className="flex flex-col gap-3 justify-between sm-screen:items-center sm-screen:text-center">
              <strong className="text-lg">{prod.displayName}</strong>
              <article>
                <p className="flex gap-2 items-center">
                  <span className="line-through">{cedi}{prod.bundles[0].storePrice.toLocaleString()}</span>
                  <small className="bg-[var(--pass)] px-2 rounded-full">{getDiscountPercentage(prod.bundles[0].storePrice, prod.bundles[0].price)}% off</small>
                </p>
                <strong className="text-2xl">{cedi} {prod.bundles[0].price.toLocaleString()}</strong>
              </article>

              {/* <div className="flex gap-3">
                {Array(4).fill(null).map((el, i) => (
                  <legend className="border-2 border-white p-1 w-8 h-8 flex items-center justify-center rounded-[10px]" key={i}>10</legend>
                ))}
              </div> */}

              <MdEast className="text-2xl" />
            </section>
            <div className="relative sm-screen:h-32">
              <Image src={prod.image.url} fill alt="" className="object-contain" />
            </div>
          </Link>
        ))}
      </section>
    </section>
  );
}

export default OfferBox;