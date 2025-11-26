"use client";
import { Variation } from "@/types/product";
import { Button } from "@nextui-org/react";
import { Dispatch, FC } from "react";

type VariationBoxProps = {
  variations: Variation[],
  activeVariation: Variation,
  setActiveVariation: Dispatch<React.SetStateAction<Variation>>,
  setActiveImageIndex: Dispatch<React.SetStateAction<number>>
}
const VariationBox: FC<VariationBoxProps> = ({ variations, activeVariation, setActiveVariation, setActiveImageIndex }) => {
  const fixVariation = (variation: Variation) => {
    if (variation.type === 'color') {
      return <legend style={{ background: variation.val }} className={`
        w-9 h-9 cursor-pointer rounded-full 
        border-4 ${activeVariation.val == variation.val ? 'border-[var(--theme)]' : 'border-transparent'} 
      `}></legend>
    }
  }

  return (
    <section className="flex gap-3">
      {variations.map((variation, vi) => (
        <Button
          className="h-auto w-auto p-0 min-w-max bg-transparent"
          onClick={() => { setActiveVariation(variation) }} key={vi}
        >
          {fixVariation(variation)}
        </Button>
      ))}
    </section>
  );
}

export default VariationBox;