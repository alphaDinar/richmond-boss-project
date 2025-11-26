'use client';
import Product from './Product/Product';
import { useWishList } from '@/contexts/wishListContext';
import { useDisclosure } from "@nextui-org/react";
import ProductModal from './ProductModal';
import { FC, useState } from 'react';
import { Product as ProductType } from '@/types/product';
import { Skeleton } from '@nextui-org/react';

type ProductBoxProps = {
  products: ProductType[],
  productsLoading: boolean,
  itemCount: number
}
const ProductBox: FC<ProductBoxProps> = ({ products, productsLoading, itemCount }) => {
  const { wishList, setWishList } = useWishList();


  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

  return (
    <>
      <section id='items250' className='gap-5'>
        {!productsLoading ?
          products.map((product, i) => (
            <Product key={i} product={product} wishList={wishList} setWishList={setWishList} setSelectedProduct={setSelectedProduct} onOpen={onOpen} />
          ))
          :
          Array(itemCount).fill(null).map((el, i) => (
            <Skeleton className='h-[25.5rem] rounded-[30px] md-screen:h-96' key={i} />
          ))
        }
      </section>

      {selectedProduct &&
        <ProductModal product={selectedProduct} isOpen={isOpen} onOpenChange={onOpenChange} />
      }
    </>
  );
}

export default ProductBox;