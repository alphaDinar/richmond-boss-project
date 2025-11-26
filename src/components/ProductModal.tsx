"use client";
import RatingBox from "@/components/RatingBox/RatingBox";
import { cedi } from "@/external/assets";
import { getDiscountPercentage } from "@/external/math";
import { addToCart, createCartItem } from "@/firebase/cartService";
import { Cart } from "@/types/cart";
import { MediaType } from "@/types/media";
import { Bundle, Product as ProductType, Variation } from "@/types/product";
import { Button } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import { Modal, ModalContent } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { LuLoader } from "react-icons/lu";
import { MdAdd, MdRemove } from "react-icons/md";
import BundleBox from "./BundleBox";
import VariationBox from "./VariationBox";
import { useCart } from "@/contexts/cartContext";

type ProductModalProps = {
  isOpen: boolean,
  onOpenChange: () => void,
  product: ProductType,
};

const ProductModal: FC<ProductModalProps> = ({ isOpen, onOpenChange, product }) => {
  const { cart, setCart } = useCart();
  const [formLoading, setFormLoading] = useState(false);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeBundle, setActiveBundle] = useState<Bundle>(product.bundles.length ? product.bundles[0] : {
    data: ['', ''],
    price: 0,
    storePrice: 0,
    quantity: 0,
    imageIndex: 0
  });
  const [activeVariation, setActiveVariation] = useState<Variation>(product.variations.length ? product.variations[0] : {
    val: '',
    type: 'color',
    imageIndex: 0
  });
  const gallery: MediaType[] = [product.image, product.coverImage].concat(product.gallery);

  const [quantity, setQuantity] = useState('1');

  useEffect(() => {
    setActiveBundle(product.bundles.length ? product.bundles[0] : {
      data: ['', ''],
      price: 0,
      storePrice: 0,
      quantity: 0,
      imageIndex: 0
    });
    setActiveVariation(product.variations.length ? product.variations[0] : {
      val: '',
      type: 'color',
      imageIndex: 0
    });
    setQuantity('1');
    setActiveImageIndex(0);
  }, [product])

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" size='4xl' scrollBehavior="inside" className="scrollbar-hide h-[520px] overflow-auto md-screen:h-[100vh]" radius="lg">
      <ModalContent>
        {(onClose) => (
          <>
            {/* <ModalBody> */}
            <section className="grid grid-cols-2 p-5 gap-5 items-start md-screen:grid-cols-1">
              <section className="grid gap-3">
                <div className="relative h-72 w-full  rounded-[15px] overflow-hidden md-screen:h-52">
                  {gallery[activeImageIndex].type === 'image' ?
                    <Image alt="" src={gallery[activeImageIndex] ? gallery[activeImageIndex].url : product.image.url} fill className={gallery[activeImageIndex] ? gallery[activeImageIndex].format === 'png' ? 'object-contain' : 'object-contain object-center' : 'object-contain'} />
                    :
                    <video muted loop autoPlay src={gallery[activeImageIndex] ? gallery[activeImageIndex].url : product.image.url} className='absolute object-cover' />
                  }
                </div>
                <section className="flex gap-3 flex-wrap">
                  {gallery.map((el, i) => (
                    el.type === 'video' ?
                      <article
                        key={i}
                        onClick={() => setActiveImageIndex(i)}
                        className="w-16 h-16 border rounded-[15px] flex justify-center items-center">
                        <div className="w-full h-full rounded-[10px] relative overflow-hidden cursor-pointer" key={i}>
                          <video src={el.url} muted loop autoPlay className="object-cover object-center absolute" />
                        </div>
                      </article>
                      :
                      el.format === 'png' ?
                        <article
                          key={i}
                          onClick={() => setActiveImageIndex(i)}
                          className="w-16 h-16 border rounded-[15px] flex justify-center items-center p-2">
                          <div className="w-full h-full rounded-[10px] relative overflow-hidden cursor-pointer" key={i}>
                            <Image alt="" src={el.url} fill className="object-contain object-center" />
                          </div>
                        </article>
                        :
                        <article
                          key={i}
                          onClick={() => setActiveImageIndex(i)}
                          className="w-16 h-16 border rounded-[15px] flex justify-center items-center">
                          <div className="w-full h-full rounded-[10px] relative overflow-hidden cursor-pointer" key={i}>
                            <Image alt="" src={el.url} fill className="object-cover object-center" />
                          </div>
                        </article>
                  ))}
                </section>
              </section>
              <section className="flex flex-col gap-5">
                <small className="bg-[var(--pass)] text-white w-max px-2 py-1 rounded-md">In Stock</small>

                <article className="flex flex-col">
                  <strong className="text-xl">{product.displayName}</strong>

                  <Link href={{ pathname: '/viewProduct', query: { id: product.id } }} style={{ color: 'var(--theme)' }}>
                    <small>See specs...</small>
                  </Link>
                </article>

                <small>
                  {product.description}
                </small>

                <div className="flex gap-2 items-center">
                  <RatingBox reviews={product.reviews} />
                  <small>({product.reviews.length} reviews)</small>
                </div>

                <article>
                  <p className="flex items-center gap-3">
                    <strong className="line-through text-lg">GH{cedi} {activeBundle.storePrice.toLocaleString()}</strong>
                    <small className="text-[0.7rem] bg-[var(--pass)] text-white px-1 rounded-full">{getDiscountPercentage(activeBundle.storePrice, activeBundle.price)} off</small>
                  </p>
                  <strong className="text-2xl text-[var(--theme)]">GH{cedi} {activeBundle.price.toLocaleString()}</strong>
                </article>

                <BundleBox product={product} activeBundle={activeBundle} setActiveBundle={setActiveBundle} setActiveImageIndex={setActiveImageIndex} />

                <VariationBox variations={product.variations} activeVariation={activeVariation} setActiveVariation={setActiveVariation} setActiveImageIndex={setActiveImageIndex} />

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

                  <Button className="w-max text-sm bg-[var(--pass)] text-white" radius="full">
                    <small>Buy Now On Whatsapp</small>
                    <FaWhatsapp />
                  </Button>
                </section>

                <hr />
                <section className="capitalize">
                  <Link href={'/'} className="flex gap-2">
                    <small className="font-bold">Category : </small>
                    <small>{product.category}</small>
                  </Link>
                  <Link href={'/'} className="flex gap-2">
                    <small className="font-bold">Brand : </small>
                    <small>{product.brand}</small>
                  </Link>
                </section>
              </section>
            </section>

          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ProductModal;