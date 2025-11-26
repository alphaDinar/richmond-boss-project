import Link from 'next/link';
import styles from './cartBox.module.css';
import { MdAdd, MdClose, MdDeleteOutline, MdRemove } from 'react-icons/md';
import { useCart } from '@/contexts/cartContext';
import { FC, useEffect } from 'react';
import { addToQuantity, clearItemFromCart, fixItemBundle, getCartTotal, getItemPrice, refineCartItems, remFromQuantity } from '@/firebase/cartService';
import { useProductList } from '@/contexts/productList';
import Image from 'next/image';
import { cedi } from '@/external/assets';

type CartBoxProps = {
  cartToggled: boolean,
  toggleCart: Function,
};
const CartBox: FC<CartBoxProps> = ({ cartToggled, toggleCart }) => {
  const { cart, setCart } = useCart();
  const { productList } = useProductList();

  useEffect(() => {
  }, [cart, productList])

  return (
    <>
      <section className={cartToggled ? `${styles.cartBox} ${styles.change}` : styles.cartBox} id='noBar'>
        <header>
          <strong>Shopping Cart </strong>
          <MdClose onClick={() => toggleCart()} />
        </header>

        <hr />

        <ul>
          {refineCartItems(productList, cart.items).map((item, i) => (
            <li className="flex gap-5 items-center" key={i}>
              <div className='relative w-16  h-20'>
                <Image alt='' src={item.img} fill className='object-contain' />
              </div>
              <article className='flex-1 flex flex-col gap-1 items-start'>
                <legend className='flex flex-col'>
                  <span className='line-clamp-1 text-sm'>{item.displayName}</span>
                  <small className='text-[0.6rem] text-gray-500'>{fixItemBundle(productList, item)}</small>
                </legend>
                <nav className='flex items-center'>
                  <MdRemove
                    className='border tex-lg h-8 cursor-pointer w-6 p-1 transition-colors duration-300 ease-in-out 
                      hover:bg-[var(--theme)] hover:text-white'
                    onClick={async () => {
                      const orderSet = await remFromQuantity(
                        item.id,
                        cart,
                        () => { }
                      );
                      if (cart.id === 'local') {
                        setCart({ ...cart, items: orderSet });
                      }
                    }}
                  />
                  <span className='border tex-lg h-8 cursor-pointer w-10 p-1 text-center'>{item.quantity}</span>
                  <MdAdd
                    className='border tex-lg h-8 cursor-pointer w-6 p-1 transition-colors duration-300 ease-in-out 
                      hover:bg-[var(--theme)] hover:text-white'
                    onClick={async () => {
                      const orderSet = await addToQuantity(
                        item.id,
                        cart,
                        1,
                        () => { }
                      );
                      if (cart.id === 'local') {
                        setCart({ ...cart, items: orderSet });
                      }
                    }}
                  />
                </nav>

                <small className='text-[0.7rem]'>{item.quantity} x {cedi} {getItemPrice(productList, item).toLocaleString()}</small>
              </article>

              <MdDeleteOutline className="text-xl text-red-500 cursor-pointer"
                onClick={async () => {
                  const orderSet = await clearItemFromCart(item.id, cart, () => { });
                  if (cart.id === 'local') {
                    setCart({ ...cart, items: orderSet });
                  }
                }}
              />
            </li>
          ))}
        </ul>

        <footer>
          <article>
            <hr />
            <p>
              <strong>Subtotal:</strong>

              <strong>GH{cedi} {getCartTotal(productList, cart.items).toLocaleString()}</strong>
            </p>
            <hr />
          </article>


          <Link href={'/checkout'} className={styles.view}>View Cart</Link>
          <Link href={'/checkout'} className={styles.checkout}>Checkout</Link>
        </footer>
      </section>
      <section onClick={() => toggleCart()} className={cartToggled ? `${styles.sheet} ${styles.change}` : styles.sheet}></section>
    </>
  );
}

export default CartBox;