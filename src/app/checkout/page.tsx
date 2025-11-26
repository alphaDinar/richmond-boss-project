"use client";
import FooterBox from "@/components/FooterBox";
import TopNav from "@/components/TopNav/TopNav";
import { useCart } from "@/contexts/cartContext";
import { useProductList } from "@/contexts/productList";
import { authTargetToken, cedi, checkoutInfoToken, defLocation } from "@/external/assets";
import { regionList } from "@/external/lists";
import { convertCartItemToOrderItem, fixItemBundle, getCartTotal, getItemBundle, getItemPrice, refineCartItems } from "@/firebase/cartService";
import { CartItem } from "@/types/cart";
import { SearchBoxItem } from "@/types/def";
import { Input } from "@nextui-org/input";
import { Autocomplete, AutocompleteItem, Button, Chip, Select, SelectItem, Spinner } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { MdNorthEast } from "react-icons/md";
import { getCoordinates, makeSuggestions } from "./checkoutService";
import { CheckoutInfo, Order, OrderItem } from "@/types/order";
import { useCustomer } from "@/contexts/customerContext";
import { useCustomerLoading } from "@/loaders/customerLoadingContext";
import { useCartLoading } from "@/loaders/cartLoading";
import LoadingBox from "@/components/LoadingBox";
import { useRouter } from "next/navigation";
import { LuLoader } from "react-icons/lu";
import { doc, setDoc } from "firebase/firestore";
import { fireStoreDB } from "@/firebase/base";
import { sendOrderPlacedPrompt, sendOrderPlacedSMS } from "@/firebase/smsService";
import { Customer } from "@/types/customer";
import { checkoutChatWithInfo } from "@/firebase/chatService";

const Checkout = () => {
  const router = useRouter();
  const { customer } = useCustomer();
  const { customerLoading } = useCustomerLoading();
  const { cart } = useCart();
  const { cartLoading } = useCartLoading();
  const { productList } = useProductList();

  const [predictions, setPredictions] = useState<SearchBoxItem[]>([]);
  const [predictionLoading, setPredictionLoading] = useState(false);
  const [payMode, setPayMode] = useState<Order['payMode']>('offline');

  const [contact, setContact] = useState('');

  const [checkoutInfo, setCheckoutInfo] = useState<CheckoutInfo>({
    region: "",
    address: "",
    location: defLocation,
    contact: "",
  });

  const [mode, setMode] = useState<'order' | 'chat'>('order');
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (customer) {
      setContact(customer.contact.slice(3));
    }

    if (window !== undefined) {
      if (localStorage.getItem(checkoutInfoToken)) {
        const infoTemp: CheckoutInfo = JSON.parse(localStorage.getItem(checkoutInfoToken)!);
        setCheckoutInfo({ ...checkoutInfo, region: infoTemp.region });
      }
    }
  }, [cartLoading, cart, customerLoading, customer, productList])

  const getPredictionList = async (val: string) => {
    setPredictionLoading(true);
    if (val.length > 1) {
      const predictionsTemp = await makeSuggestions(`${checkoutInfo.region}, ${val}`);
      setPredictions(predictionsTemp.map((el) => ({ id: el.placeId, tag: el.tag })));
    } else {
      setPredictions([]);
    }
    setPredictionLoading(false);
  }

  const fixCustomerLocation = async (choice: string) => {
    setPredictionLoading(true);
    const choiceTemp = JSON.parse(choice) as SearchBoxItem;
    const locRes = await getCoordinates(choiceTemp.id);
    setCheckoutInfo({
      ...checkoutInfo,
      location: locRes,
      address: choiceTemp.tag
    });
    setPredictionLoading(false);
  }


  const createOrder = async (oid: string, order: Omit<Order, 'id'>, customer: Customer) => {
    await setDoc(doc(fireStoreDB, 'Orders/' + oid), order);
    // await sms
    await sendOrderPlacedSMS(`233${contact}`, customer.username, oid);
    await sendOrderPlacedPrompt(contact, oid, checkoutInfo.address);
    // router.push(`/orders?oid=${oid}`);
  }

  const nextStep = async () => {
    const host = window.location.origin;
    setFormLoading(true);
    if (mode === 'order') {
      if (customer) {
        if (payMode == 'online') {
          // paystack creation
        } else {
          const orderItems: OrderItem[] = refineCartItems(productList, cart.items).map((item) => convertCartItemToOrderItem(productList, item));
          const stamp = new Date().getTime();
          const oid = 'oid' + stamp;
          const order: Omit<Order, 'id'> = {
            customer: customer,
            items: orderItems,
            contact: '0' + contact,
            uid: customer.id,
            isCompleted: false,
            payInfo: null,
            payMode: 'offline',
            checkoutInfo: checkoutInfo,
            total: getCartTotal(productList, refineCartItems(productList, cart.items)),
            timestamp: stamp,
          }
          createOrder(oid, order, customer);
          // place order with null for pay status and offline for payMode
          // send sms to checkout contact if not same send to both checkout and customer
        }
      } else {
        localStorage.setItem(checkoutInfoToken, JSON.stringify(checkoutInfo));
        router.push('/register?target=/checkout');
      }
    } else {
      alert('hot');
      // window.open(checkoutChatWithInfo(refineCartItems(productList, cart.items), checkoutInfo));
      // router.push(checkoutChatWithInfo(refineCartItems(productList, cart.items), checkoutInfo))
      window.open(checkoutChatWithInfo(refineCartItems(productList, cart.items), checkoutInfo), '_blank', 'noopener,noreferrer');
      // parse whatsapp data and start chat
    }
  }

  // onClick={() => {
  //   localStorage.setItem(authTargetToken, "/checkout");
  //   router.push('/register');
  // }}

  // const continuePay = () => {
  //   console.log(mode);
  // }

  // const continueChat = () => {

  // }

  return (
    <main>
      <section className="grid gap-[3vh]">

        <section className="md-screen:grid md-screen:gap-[3vh]">
          <TopNav showFullNav={false} />

          <section className="py-10 bg-[var(--bg)] w-full flex items-center justify-center sm-screen:bg-[var(--theme)] sm-screen:p-6">
            <span className="text-white text-3xl font-normal">Checkout</span>
          </section>
        </section>

        {!cartLoading || !customerLoading ?
          <section id="hor" className="grid bg-blue-000 py-5 md-screen:py-0">
            <section className="grid grid-cols-[6.5fr_3.5fr] gap-10 items-start md-screen:flex-col-reverse md-screen:flex md-screen:gap-5">
              <form onSubmit={(e) => { e.preventDefault(); nextStep() }} className="bg-red-000 grid gap-10">
                <section className="grid gap-3">
                  <Select
                    label="Region"
                    isRequired
                    required
                    defaultSelectedKeys={[checkoutInfo.region]}
                    value={checkoutInfo.region}
                    placeholder="Select your region"
                    onChange={(e) => setCheckoutInfo({ ...checkoutInfo, region: e.target.value })}
                  >
                    {regionList.map((el, i) => (
                      <SelectItem key={el}>
                        {el}
                      </SelectItem>
                    ))}
                  </Select>

                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4 relative items-center">
                    <Autocomplete
                      label="Nearest Location"
                      className="w-full"
                      isRequired
                      required
                      onSelectionChange={(val) => { val ? fixCustomerLocation(val!.toString()) : () => { } }}
                      onValueChange={(e) => getPredictionList(e)}
                    >
                      {predictions.map((item) => (
                        <AutocompleteItem key={JSON.stringify({ id: item.id, tag: item.tag })} value={item.id}>
                          {item.tag}
                        </AutocompleteItem>
                      ))}
                    </Autocomplete>

                    <Spinner size='md'
                      style={{ display: predictionLoading ? 'flex' : 'none' }}
                      className='absolute right-2 bg-gray-100' />
                  </div>

                  <Select
                    label="Payment Method"
                    isRequired
                    required
                    placeholder="Select a payment method"
                    onChange={(e) => setPayMode(e.target.value as Order['payMode'])}
                  >
                    <SelectItem key="offline">
                      Payment On Delivery
                    </SelectItem>
                    <SelectItem key="online">
                      Online Payment
                    </SelectItem>
                  </Select>

                  <article className="flex  gap-3">
                    <Input value={'+233'} label='Phone code' isReadOnly required className="w-max" />
                    <Input label="Contact" value={contact} onChange={(e) => {
                      setContact(e.target.value)
                      setCheckoutInfo({ ...checkoutInfo, contact: '233' + e.target.value })
                    }} className="flex-1" isRequired required />
                  </article>
                </section>


                <section className="grid gap-3">
                  <Button
                    onClick={() => setMode('order')}
                    type="submit" className="w-full text-sm bg-[var(--theme)] text-white" radius="md">
                    {formLoading && mode == 'order'
                      ?
                      <LuLoader className="animate-spin" />
                      :
                      <span>Place Order</span>
                    }
                  </Button>


                  <article className="flex flex-col gap-2">
                    <hr />
                    <strong className="text-center">OR</strong>
                    <hr />
                  </article>

                  <section className="flex flex-col gap-2">
                    <Chip
                      variant="shadow"
                      size="sm"
                      classNames={{
                        base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                        content: "drop-shadow shadow-black text-white",
                      }}
                    >
                      Extra 3% off
                    </Chip>

                    <Button type="submit"
                      onClick={() => setMode('chat')}
                      className="w-full bg-[var(--pass)] text-white" radius="md">
                      {formLoading && mode == 'chat'
                        ?
                        <LuLoader className="animate-spin" />
                        :
                        <>
                          <span>Order on Whatsapp</span>
                          <FaWhatsapp />
                        </>
                      }
                    </Button>
                  </section>
                </section>
              </form>
              <section className="bg-gray-50 p-8 rounded-[30px] border grid gap-5 w-full">
                <section className="grid gap-5">
                  <strong>Products</strong>

                  <ul className="grid gap-3">
                    {refineCartItems(productList, cart.items).map((item, i) => (
                      <li className="flex gap-5 items-center" key={i}>
                        <div className='relative w-16  h-16'>
                          <Image alt='' src={item.img} fill className='object-contain' />
                        </div>
                        <article className='flex-1 flex flex-col gap-1 items-start'>
                          <legend className='flex flex-col'>
                            <span className="line-clamp-1 text-sm">{item.displayName}</span>
                            <small className='text-[0.6rem] text-gray-500'>{fixItemBundle(productList, item)}</small>
                          </legend>
                          <small className='text-[0.7rem]'>{item.quantity} x {cedi} {getItemPrice(productList, item).toLocaleString()}</small>
                        </article>

                        <strong>{cedi} {(item.quantity * getItemPrice(productList, item)).toLocaleString()}</strong>
                      </li>
                    ))}
                  </ul>
                </section>

                <hr />
                {/* 
              <section>

              </section>

              <hr /> */}

                <article className="grid">
                  <strong>Delivery</strong>
                  <small>GH{cedi} 0</small>
                </article>

                <article className="grid">
                  <strong>Total</strong>
                  <strong className="text-[var(--theme)]">GH{cedi} {getCartTotal(productList, cart.items).toLocaleString()}</strong>
                </article>

              </section>
            </section>
          </section>
          :
          <LoadingBox />
        }
      </section>

      <FooterBox />
    </main >
  );
}

export default Checkout;