"use client";
import FooterBox from "@/components/FooterBox";
import LoadingBox from "@/components/LoadingBox";
import TopNav from "@/components/TopNav/TopNav";
import { useCustomer } from "@/contexts/customerContext";
import { fireAuth, fireStoreDB } from "@/firebase/base";
import { useCustomerLoading } from "@/loaders/customerLoadingContext";
import { Button } from "@nextui-org/button";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { signOut } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { OrdersTable } from "./ordersTable";
import { Order } from "@/types/order";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Profile = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { customer } = useCustomer();
  const { customerLoading, setCustomerLoading } = useCustomerLoading();

  const [orders, setOrders] = useState<Order[]>([]);

  const logOutUser = async () => {
    await signOut(fireAuth);
    window.location.reload();
  }

  useEffect(() => {
    !customerLoading && !customer && router.push('/login?target=/profile');

    if (customer) {
      const uid = customer.id;
      const ordersRef = collection(fireStoreDB, 'Orders/');
      const orderStream = onSnapshot(query(ordersRef, where("uid", "==", `${uid}`)), (snapshot) => {
        // setAllOrders(snapshot.docs.map((order) => ({ id: order.id, ...order.data() })).reverse() as Order[]);
        setOrders(snapshot.docs.map((order) => ({ id: order.id, ...order.data() })).reverse() as Order[]);
        // setStamp(new Date().getTime());
      });
      return () => orderStream();
    }
  }, [customer, customerLoading, setCustomerLoading])

  return (
    <main>
      <section className="grid gap-[3vh]">

        <section className="md-screen:grid md-screen:gap-[3vh]">
          <TopNav showFullNav={false} />

          <section className="py-10 bg-[var(--bg)] w-full flex items-center justify-center sm-screen:bg-[var(--theme)] sm-screen:p-6">
            <span className="text-white text-3xl font-normal">My Account</span>
          </section>
        </section>

        {customer ?
          <section id="hor">
            <section className="grid grid-cols-[3fr,7fr] items-start gap-4 md-screen:grid-cols-1">
              <section className="border rounded-[15px] p-10 flex flex-col items-center gap-4 sm-screen:p-8">
                <div className="w-24 h-24 bg-red-100 font-bold rounded-full text-3xl flex justify-center items-center">
                  {customer.username[0]}
                </div>

                <article className="flex flex-col items-center">
                  <strong className="text-xl">{customer.username}</strong>
                  <span>{customer.email && customer.email} {customer.contact && `0${customer.contact.slice(3)}`}</span>
                </article>

                <Button onClick={logOutUser} fullWidth className="bg-red-500 text-white"><MdOutlinePowerSettingsNew /> Logout</Button>
              </section>
              <section className="border p-5 rounded-[20px] sm-screen:p-3">
                <Tabs aria-label="Options" radius="sm">
                  <Tab key="orders" title="Orders">
                    <Card shadow="none">
                      <section className="flex flex-col gap-5">
                        {/* <strong className="text-xl text-gray-500">My Orders</strong> */}
                        <OrdersTable orders={orders} />
                      </section>
                    </Card>
                  </Tab>
                  {/* <Tab key="music" title="Music">
                    <Card>
                      <CardBody>
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                      </CardBody>
                    </Card>
                  </Tab>
                  <Tab key="videos" title="Videos">
                    <Card>
                      <CardBody>
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </CardBody>
                    </Card>
                  </Tab> */}
                </Tabs>
              </section>
            </section>
          </section>
          :
          <LoadingBox />}

      </section>

      <FooterBox />
    </main>
  );
}

export default Profile;