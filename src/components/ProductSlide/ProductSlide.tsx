'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './productSlide.module.css';
import Product from '../Product/Product';
import { FC, useRef, useState } from 'react';
// import ProductPop from '../ProductPop/ProductPop';
import { MdArrowRight } from 'react-icons/md';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Product as ProductType } from '@/types/product';
import { useWishList } from '@/contexts/wishListContext';
import { Skeleton, useDisclosure } from '@nextui-org/react';
import ProductModal from '../ProductModal';
import { useCategories } from '@/contexts/categoriesContext';
import { Autoplay } from 'swiper/modules';
import Link from 'next/link';

type ProductSlideProps = {
  showNav: boolean,
  showHeader: boolean,
  headerText: string,
  productList: ProductType[],
  productsLoading: boolean,
}
const ProductSlide: FC<ProductSlideProps> = ({ showNav, showHeader, headerText, productList, productsLoading }) => {
  const { categories } = useCategories();

  const productSwiper = useRef<{ swiper: any }>({ swiper: null });

  const { wishList, setWishList } = useWishList();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const productSwiperPrev = () => {
    console.log(productSwiper.current)
    if (productSwiper.current) {
      productSwiper.current.swiper.slidePrev();
    }
  }

  const productSwiperNext = () => {
    if (productSwiper.current) {
      productSwiper.current.swiper.slideNext();
    }
  }

  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

  return (
    <section className={styles.set}>
      {showHeader &&
        <header>
          <span className='text-2xl'>{headerText}</span>
          <section className={styles.navBox}>

            <nav>
              <legend onClick={productSwiperPrev}>
                <IoIosArrowBack />
              </legend>

              <legend onClick={productSwiperNext}>
                <IoIosArrowForward />
              </legend>
            </nav>

            {/* <p>
              {categories.map((cat, i) => (
                <small key={i} className='capitalize'>{cat.name}</small>
              ))}
            </p> */}
          </section>
        </header>
      }

      <section className={styles.productSlide}>
        <Swiper
          className={styles.slideBox}
          ref={productSwiper}
          spaceBetween={10}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          breakpoints={{
            100: {
              slidesPerView: 1,
            },
            500: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          slidesPerView={4}
        >
          {
            !productsLoading ?
              productList.slice(0, 10).map((prod, i) => (
                <SwiperSlide className={styles.slide} key={i}>
                  <Product setSelectedProduct={setSelectedProduct} wishList={wishList} setWishList={setWishList} onOpen={onOpen} product={prod} />
                </SwiperSlide>
              ))
              :
              Array(10).fill(null).map((prod, i) => (
                <SwiperSlide className={styles.slide} key={i}>
                  <Skeleton className='h-[25.5rem] rounded-[30px] md-screen:h-96' key={i} />
                </SwiperSlide>
              ))
          }
        </Swiper>
      </section>
      <section className={styles.productSlide}>
        <Swiper
          className={styles.slideBox}
          spaceBetween={10}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            reverseDirection: true
          }}
          modules={[Autoplay]}
          breakpoints={{
            100: {
              slidesPerView: 1,
            },
            500: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          slidesPerView={4}
        >
          {
            !productsLoading ?
              productList.slice(10).map((prod, i) => (
                <SwiperSlide className={styles.slide} key={i}>
                  <Product setSelectedProduct={setSelectedProduct} wishList={wishList} setWishList={setWishList} onOpen={onOpen} product={prod} />
                </SwiperSlide>
              ))
              :
              Array(10).fill(null).map((prod, i) => (
                <SwiperSlide className={styles.slide} key={i}>
                  <Skeleton className='h-[25.5rem] rounded-[30px] md-screen:h-96' key={i} />
                </SwiperSlide>
              ))
          }
        </Swiper>
      </section>

      {selectedProduct &&
        <ProductModal product={selectedProduct} isOpen={isOpen} onOpenChange={onOpenChange} />
      }
    </section>
  );
}

export default ProductSlide;