import { cedi } from "@/external/assets";
import { Bundle, Product } from "@/types/product";
import { Button } from "@nextui-org/button";
import { Dispatch, FC } from "react";

type BundleBoxProps = {
  product: Product,
  activeBundle: Bundle,
  setActiveBundle: Dispatch<React.SetStateAction<Bundle>>,
  setActiveImageIndex: Dispatch<React.SetStateAction<number>>
}
const BundleBox: FC<BundleBoxProps> = ({ product, activeBundle, setActiveBundle, setActiveImageIndex }) => {
  const fixBundle = (bun: Bundle) => {
    if (product.category.toLowerCase() === 'phones') {
      return (
        <>
          <p className="flex flex-col">
            <span className="text-[0.9rem]">{bun.data[0]} GB</span>
            <small>Storage</small>
          </p>
          <p className="flex flex-col">
            <span className="text-[0.9rem]">{bun.data[1]} GB</span>
            <small>RAM</small>
          </p>
        </>
      )
    } else {
      return <section>Info</section>
    }
  }

  return (
    <section className="grid gap-1">
      {product.category.toLowerCase() === 'phones' &&
        product.bundles.map((bun, bi) => {
          return (
            <Button
              onClick={() => { setActiveBundle(bun) }}
              key={bi} className={`h-auto p-1 grid grid-cols-4 border-blue-200 border w-full 
                      ${activeBundle.price == bun.price ? 'bg-blue-100' : 'bg-white'} `} radius="sm">
              {fixBundle(bun)}
              <p className="flex flex-col">
                <span className="text-[0.9rem] line-through">{cedi} {bun.storePrice.toLocaleString()}</span>
                <small>Store Price</small>
              </p>
              <p className="flex flex-col">
                <span className="text-[0.9rem]">{cedi} {bun.price.toLocaleString()}</span>
                <small>Promo Price</small>
              </p>
            </Button>
          )
        })
      }
    </section >
  );
}

export default BundleBox;