'use client';
import BundleBox from '@/components/BundleBox';
import FooterBox from '@/components/FooterBox';
import LoadingBox from '@/components/LoadingBox';
import ProductBox from '@/components/ProductBox';
import RatingBox from '@/components/RatingBox/RatingBox';
import VariationBox from '@/components/VariationBox';
import { useCart } from '@/contexts/cartContext';
import { useProductList } from '@/contexts/productList';
import { cedi } from '@/external/assets';
import { getDiscountPercentage } from '@/external/math';
import { fireStoreDB } from '@/firebase/base';
import { addToCart, createCartItem } from '@/firebase/cartService';
import { useProductsLoading } from '@/loaders/productsLoading';
import { Bundle, Product, Review, Variation } from '@/types/product';
import { Button } from '@nextui-org/react';
import { Chip } from "@nextui-org/react";
import { doc, onSnapshot } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaGripfire, FaWhatsapp } from 'react-icons/fa';
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from 'react-icons/io5';
import { LuLoader } from 'react-icons/lu';
import { MdAdd, MdArrowForward, MdHome, MdRemove } from 'react-icons/md';
import styles from './viewProduct.module.css';
import TopNav from '@/components/TopNav/TopNav';
import { productChat } from '@/firebase/chatService';

const ViewProduct = ({ searchParams }: { searchParams: { id: string } }) => {
  const id = searchParams.id;
  const { cart, setCart } = useCart();
  const { productList } = useProductList();
  const { productsLoading } = useProductsLoading();

  const [product, setProduct] = useState<Product | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false);

  const [gallery, setGallery] = useState<Product['gallery']>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [quantity, setQuantity] = useState('1');
  const [formLoading, setFormLoading] = useState(false);

  const [lowTab, setLowTab] = useState<'spec' | 'review'>('spec');

  const [activeBundle, setActiveBundle] = useState<Bundle>({
    data: ['', ''],
    price: 0,
    storePrice: 0,
    quantity: 0,
    imageIndex: 0
  });
  const [activeVariation, setActiveVariation] = useState<Variation>({
    val: '',
    type: 'color',
    imageIndex: 0
  });

  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getRelatedProducts = (prod: Product, desiredCount: number = 8) => {
      const sameBrandProducts = productList.filter(
        product => product.brand === prod.brand && product.id !== prod.id
      );

      if (sameBrandProducts.length >= desiredCount) {
        return sameBrandProducts.slice(0, desiredCount);
      }

      const additionalProductsNeeded = desiredCount - sameBrandProducts.length;
      const sameCategoryProducts = productList.filter(
        product => product.category === prod.category &&
          product.id !== prod.id &&
          !sameBrandProducts.includes(product)
      );

      // Step 4: Combine and return unique products
      const relatedProductsTemp = [
        ...sameBrandProducts,
        ...sameCategoryProducts.slice(0, additionalProductsNeeded)
      ];

      setRelatedProducts(relatedProductsTemp);
      // return combinedProducts;
    };

    const getProduct = onSnapshot(doc(fireStoreDB, 'Products/' + id), (snapshot) => {
      const prodTemp: Product = ({ id: snapshot.id, ...snapshot.data() }) as Product;
      setProduct(prodTemp);
      prodTemp.bundles.length && setActiveBundle(prodTemp.bundles[0]);
      prodTemp.variations.length && setActiveVariation(prodTemp.variations[0]);
      setGallery([prodTemp.image, prodTemp.coverImage].concat(prodTemp.gallery));

      getRelatedProducts(prodTemp, 8);
    });

    return () => getProduct();
  }, [id, cart, productList])

  const reviews: Review[] = [
    {
      username: 'psycho',
      images: [
        "https://res.cloudinary.com/dvnemzw0z/image/upload/v1724980079/Testers/61v3dpWD1AL._SY450_-removebg-preview_kvyl58.png",
        "https://res.cloudinary.com/dvnemzw0z/image/upload/v1724980060/Testers/51RGPTAnkFL._AC_UF894_1000_QL80_DpWeblab_-removebg-preview_ydg4hz.png"
      ],
      dp: 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1685699929/medium-shot-boy-being-winner_z6oxb9.jpg',
      content: 'with ordinary shorts, you probably wouldnt be able to see the shorts at all – completely hidden by the shirt. It needs to be 4 to 5 inches shorter in terms of length to suit me. I have many RL polo shirts, and this one is by far the longest. I dont understand why.',
      rating: 4,
      timestamp: 10
    },
    {
      username: 'psycho',
      images: [],
      dp: '',
      content: '',
      rating: 2,
      timestamp: 10
    },
    {
      username: 'psycho',
      images: [],
      dp: '',
      content: '',
      rating: 5,
      timestamp: 10
    },
    {
      username: 'psycho',
      images: [],
      dp: '',
      content: '',
      rating: 1,
      timestamp: 10
    },
    {
      username: 'psycho',
      images: [],
      dp: '',
      content: '',
      rating: 5,
      timestamp: 10
    }
  ]

  // useEffect(() => {
  //   setActiveMedia(image);

  //   console.log(cart)
  // }, [cart])


  const topFeatures = [
    "Finger Print",
    "30 mins Fast Charge"
  ]



  return (
    <main>
      <section className={styles.group}>
        <TopNav showFullNav={true} />
        <section className={styles.bannerBox}
          style={{ background: 'var(--bg)', alignItems: 'flex-start' }}
          id="hor">
          <MdHome />
          <Link href='/'>Home</Link>
          <MdArrowForward />
          <Link href='/products'>Products</Link>
          <MdArrowForward />
          <span>{product && product.displayName}</span>
        </section>

        {product ?
          <section className={styles.productBox} id='hor'>
            <section className={styles.top}>
              <section className={styles.left}>
                {/* <IoIosExpand onClick={() => setDialogOpen(true)} className={styles.expand} /> */}
                <div className="relative h-96 w-full  rounded-[15px] overflow-hidden md-screen:h-52">
                  {gallery[activeImageIndex].type === 'image' ?
                    <Image alt="" src={gallery[activeImageIndex] ? gallery[activeImageIndex].url : product.image.url} fill className={gallery[activeImageIndex] ? gallery[activeImageIndex].format === 'png' ? 'object-contain' : 'object-contain object-center' : 'object-contain'} />
                    :
                    <video muted loop autoPlay src={gallery[activeImageIndex] ? gallery[activeImageIndex].url : product.image.url} className='absolute object-cover' />
                  }
                </div>

                <div className="h-10"></div>

                <section className="flex gap-3 flex-wrap">
                  {gallery.map((el, i) => (
                    el.type === 'video' ?
                      <article
                        key={i}
                        onClick={() => setActiveImageIndex(i)}
                        className="w-20 h-20 border rounded-[15px] flex justify-center items-center p-2">
                        <div className="w-full h-full rounded-[10px] relative overflow-hidden cursor-pointer" key={i}>
                          <video src={el.url} muted loop autoPlay className="object-cover object-center absolute" />
                        </div>
                      </article>

                      :
                      el.format === 'png' ?
                        <article
                          key={i}
                          onClick={() => setActiveImageIndex(i)}
                          className="w-20 h-20 border rounded-[15px] flex justify-center items-center p-2">
                          <div className="w-full h-full rounded-[10px] relative overflow-hidden cursor-pointer">
                            <Image alt="" src={el.url} fill className="object-contain object-center" />
                          </div>
                        </article>
                        :
                        <article
                          onClick={() => setActiveImageIndex(i)}
                          key={i}
                          className="w-20 h-20 border rounded-[15px] flex justify-center items-center">
                          <div className="w-full h-full rounded-[10px] relative overflow-hidden cursor-pointer">
                            <Image alt="" src={el.url} fill className="object-cover object-center" />
                          </div>
                        </article>

                  ))}
                </section>

                {/* <section className={styles.serviceBox}>
                  <strong>Professional customer service</strong>
                  <ul>
                    <p> <MdTaskAlt /> <span>Free Delivery</span></p>
                    <p> <MdTaskAlt /> <span>48 hr Delivery</span></p>
                    <p> <MdTaskAlt /> <span>15 Day Free Return on damage</span></p>
                  </ul>
                </section> */}
              </section>
              <section className={styles.right}>
                <header>
                  <legend className='rounded-[5px]'>In Stock</legend>
                  <nav>
                    <IoArrowBackCircleOutline />
                    <IoArrowForwardCircleOutline />
                  </nav>
                </header>

                <section className={styles.controlGroup}>
                  <strong className='text-2xl'>{product.displayName}</strong>
                  <span className={styles.desc}>{product.description}</span>

                  <p className={styles.ratingRow}>
                    <RatingBox reviews={reviews} />
                    <small style={{ fontSize: '0.75rem' }}>({reviews.length} reviews)</small>
                  </p>

                  <article>
                    <p className="flex items-center gap-3">
                      <strong className="line-through text-lg">GH{cedi} {activeBundle.storePrice.toLocaleString()}</strong>
                      <small className="text-[0.7rem] bg-[var(--pass)] text-white px-1 rounded-full">{getDiscountPercentage(activeBundle.storePrice, activeBundle.price)} off</small>
                    </p>
                    <strong className="text-2xl text-[var(--theme)]">GH{cedi} {activeBundle.price.toLocaleString()}</strong>
                  </article>

                  <BundleBox product={product} activeBundle={activeBundle} setActiveBundle={setActiveBundle} setActiveImageIndex={setActiveImageIndex} />

                  <VariationBox variations={product.variations} activeVariation={activeVariation} setActiveVariation={setActiveVariation} setActiveImageIndex={setActiveImageIndex} />
                </section>

                <section className="flex items-center gap-3">
                  <nav className="flex gap-2">
                    <Button
                      onClick={() => Number(quantity) > 1 && setQuantity((Number(quantity) - 1).toString())}
                      radius="sm" isIconOnly className="bg-[var(--theme)] text-white">
                      <MdRemove className="w-5 h-5" />
                    </Button>
                    <input inputMode="numeric" value={quantity} onChange={(e) => setQuantity(e.target.value)} type="number" className="border flex justify-center text-center w-16 rounded-md text-xl" />
                    <Button
                      onClick={() => setQuantity((Number(quantity) + 1).toString())}
                      radius="sm" isIconOnly className="bg-[var(--theme)] text-white">
                      <MdAdd className="w-5 h-5" />
                    </Button>
                  </nav>

                  <Button radius="sm" className="bg-[var(--theme)] text-white" fullWidth
                    onClick={async () => {
                      if (Number(quantity)) {
                        setFormLoading(true);
                        const orderSet = await addToCart(
                          createCartItem(product.id, product.displayName, product.category, product.image.url, activeBundle, activeVariation, Number(quantity)),
                          cart,
                          Number(quantity),
                          () => { alert('done') }
                        );
                        setFormLoading(false);
                        setQuantity('1');
                        if (cart.id === 'local') {
                          setCart({ ...cart, items: orderSet });
                        }
                      }
                      else {
                        alert('fix form')
                      }
                    }}
                  >
                    {!formLoading ? "Add To Cart" : <LuLoader className="animate-spin" />}
                  </Button>
                </section>

                <section className="flex flex-col gap-2">
                  <hr />
                  <strong className="text-center">OR</strong>
                  <hr />
                </section>

                <section className="flex flex-col gap-2">
                  <Chip
                    variant="shadow"
                    size="sm"
                    classNames={{
                      base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                      content: "drop-shadow shadow-black text-white",
                    }}
                  >
                    Extra 5% off
                  </Chip>

                  <Button className="w-max text-sm bg-[var(--pass)] text-white" radius="full"
                    onClick={() => {
                      window.open(productChat(product), '_blank', 'noopener,noreferrer');
                    }}
                  >
                    <small>Buy Now On Whatsapp</small>
                    <FaWhatsapp />
                  </Button>
                </section>

                {/* <section className={styles.cartBox}>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  setFormLoading(true);
                  addToCart(
                    createCartItem('pid', activeBundle, activeVariation, quantity),
                    cart,
                    quantity,
                    () => setFormLoading(false)
                  );
                }} className={styles.addBox}>
                  <nav>
                    <MdRemove onClick={subQuantity} />
                    <input type="number" min={1} max={20} inputMode='numeric' value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} required />
                    <MdAdd onClick={addQuantity} />
                  </nav>
                  <button>
                    {!formLoading ?
                      <span>Add To Cart</span>
                      :
                      <LuLoader2 className='animate-spin' />
                    }
                  </button>
                </form>

                <section className={styles.chatBoxHolder}>
                  <small>Extra 5% off <GoTag /> </small>
                  <section className={styles.chatBox}>
                    <span>Buy on whatsapp</span>
                    <sub></sub>
                    <FaWhatsapp />
                  </section>
                </section>
              </section> */}

                <hr />



                <section>
                  <p>
                    <strong>Category :</strong>
                    <span className="capitalize">{product.category}</span>
                  </p>
                  <p>
                    <strong>Brand :</strong>
                    <span className="capitalize">{product.brand}</span>
                  </p>
                </section>
              </section>
            </section>

            <hr id='divider' />

            <section className={styles.low}>
              <header>
                <h3
                  onClick={() => setLowTab('spec')}
                  style={{ borderBottom: lowTab === 'spec' ? '3px solid var(--theme)' : '3px solid transparent' }}>Specifications</h3>

                {/* <h3
                  onClick={() => setLowTab('review')}
                  style={{ borderBottom: lowTab === 'review' ? '3px solid var(--theme)' : '3px solid transparent' }}>Reviews({reviews.length})</h3>
              */}
              </header>
              {lowTab === 'spec' ?
                <section className={styles.specBox}>
                  <article className={styles.specialBox}>
                    {product.topFeatures.map((feature, i) => (
                      <legend key={i}>
                        <FaGripfire />
                        <span>{feature}</span>
                      </legend>
                    ))}
                  </article>

                  <hr />

                  <section className={styles.set}>
                    {product.specifications.map((spec, i) => (
                      <article key={i}>
                        <h4 className="capitalize">{spec.title}</h4>

                        <ul>
                          {spec.points.split('|').map((point, pi) => (
                            <small key={pi}>{point}</small>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </section>
                </section>
                :
                <section className={styles.reviewBox} style={{ display: 'none' }}>
                  <section className={styles.reviews}>
                    {Array(3).fill(null).map((review, i) => (
                      <section className={styles.review} key={i}>
                        <div className={styles.imgBox}>
                          <Image alt='' src={reviews[0].dp} fill className='cover' />
                        </div>
                        <article>
                          <p>
                            <span>{reviews[0].username}</span>
                            <RatingBox reviews={[reviews[0]]} />
                          </p>
                          <small>February 29, 2020</small>

                          <span className={styles.con}>{reviews[0].content}</span>

                          <div className={styles.images}>
                            {reviews[0].images.map((el, i) => (
                              <Link href={'/'} key={i}>
                                <sup>
                                  {/* <MediaBox media={fixMediaType(el)} /> */}
                                </sup>
                              </Link>
                            ))}
                          </div>
                        </article>
                      </section>
                    ))}
                  </section>
                  <form>
                    <span>Your Rating</span>

                  </form>
                </section>
              }

            </section>
          </section> :
          <LoadingBox />
        }
      </section>

      <section id='hor' className={styles.relatedBox}>
        <h3>Related Products</h3>
        <ProductBox products={relatedProducts} productsLoading={productsLoading} itemCount={8} />
      </section>

      <FooterBox />
    </main>
  );
}

export default ViewProduct;