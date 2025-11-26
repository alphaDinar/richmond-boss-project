'use client';
import { cedi } from '@/external/assets';
import { Cart } from '@/types/cart';
import { Product as ProductType } from '@/types/product';
import { WishList } from '@/types/wishList';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, FC, useState } from 'react';
import { LuEye } from 'react-icons/lu';
import { MdFavorite, MdOutlineFavoriteBorder, MdOutlineShoppingCartCheckout } from 'react-icons/md';
import RatingBox from '../RatingBox/RatingBox';
import { addToWishList, createWishItem, wishExists } from '@/firebase/wishListService';

export type ProductProps = {
  product: ProductType;
  wishList: WishList;
  setWishList: Dispatch<React.SetStateAction<WishList>>
  onOpen: () => void;
  setSelectedProduct: Dispatch<React.SetStateAction<ProductType | null>>
};
const Product: FC<ProductProps> = ({ product, wishList, setWishList, onOpen, setSelectedProduct }) => {
  const [formLoading, setFormLoading] = useState(false);

  const handleWishList = async () => {
    const wishSet = await addToWishList(
      createWishItem(product.id, product.displayName, product.category, product.image.url),
      wishList,
      () => { }
    )
    setFormLoading(false);
    if (wishList.id === 'local') {
      setWishList({ ...wishList, items: wishSet });
    }
  }

  return (
    <section className="p-5 overflow-hidden border  rounded-[30px] flex flex-col gap-4 relative">
      <div className="w-full h-52 rounded-[10px] relative overflow-hidden md-screen:h-40">
        <Image alt='' src={product.image.url} fill className={product.image.format === 'png' ? 'object-contain' : 'object-cover object-top'} />
      </div>

      <section className='flex flex-col items-center text-center gap-3'>
        <article className='flex flex-col items-center'>

          <p className='flex flex-col'>
            <Link href={{ pathname: '/viewProduct', query: { id: product.id } }}>
              <strong className='line-clamp-1 text-[0.9rem]'>{product.displayName}</strong>
            </Link>
            <Link href={'/'} className='text-[0.78rem] md-screen:tex-sm text-gray-500'><small>{product.category}</small></Link>
          </p>
          <RatingBox reviews={product.reviews} />

        </article>
        <nav className='cursor-pointer flex z-20 gap-1'>
          <LuEye onClick={() => { setSelectedProduct(product); onOpen() }} className='w-9 h-9 p-2 border rounded-xl hover:bg-black hover:text-gray-200 transition-colors duration-300 ease-in-out' />
          {wishExists(product.id, wishList.items) ?
            <MdFavorite
              onClick={handleWishList}
              className='absolute w-6 h-6 left-4 top-4 text-[var(--theme)]'
            />
            :
            <MdOutlineFavoriteBorder
              onClick={handleWishList}
              className='absolute w-6 h-6 left-4 top-4 text-gray-400 hover:text-[var(--theme)] hover:text-gray-200 transition-colors duration-300 ease-in-out' />
          }
          <MdOutlineShoppingCartCheckout className='w-9 h-9 p-2 border rounded-xl hover:bg-black hover:text-gray-200 transition-colors duration-300 ease-in-out' />
        </nav>

        <p className='flex gap-5'>
          <strong className="text-[var(--theme)] text-lg">{cedi}
            {product.bundles.length ? product.bundles.length > 1
              ?
              ` ${product.bundles[0].price.toLocaleString()} - ${product.bundles[product.bundles.length - 1].price.toLocaleString()}`
              :
              ` ${product.bundles[0].price.toLocaleString()}`
              :
              0
            }
          </strong>
        </p>
      </section>
    </section>
  );
}

export default Product;