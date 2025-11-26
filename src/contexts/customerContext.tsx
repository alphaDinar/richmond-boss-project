'use client'
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { Dispatch, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { fireAuth, fireStoreDB } from '@/firebase/base';
import { Customer } from '@/types/customer';
import { useCustomerLoading } from '../loaders/customerLoadingContext';

interface defType extends Record<string, any> { };
type customerContextProviderProps = {
  children: ReactNode;
};

type customerContext = {
  customer: Customer | null,
  setCustomer: Dispatch<React.SetStateAction<Customer | null>>;
}

export const CustomerContext = createContext<customerContext | null>(null);

export const CustomerContextProvider = ({ children }: customerContextProviderProps) => {
  const { setCustomerLoading } = useCustomerLoading();
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const authStream = onAuthStateChanged(fireAuth, (userObj) => {
      if (userObj) {
        const customerStream = onSnapshot(doc(fireStoreDB, 'Customers/' + userObj.uid), (snapshot) => {
          if (snapshot.exists()) {
            const customer: defType = ({ id: snapshot.id, ...snapshot.data() });
            const customerTemp: Customer = {
              id: userObj.uid,
              email: customer.email,
              contact: customer.contact,
              username: customer.username,
            }
            setCustomer(customerTemp);
            setCustomerLoading(false);
          }
        });
        return () => customerStream();
      } else {
        setCustomerLoading(false);
      }
    });

    return () => {
      authStream();
    }
  }, [setCustomerLoading])

  return (
    <CustomerContext.Provider value={{ customer, setCustomer }}>
      {children}
    </CustomerContext.Provider>
  )
}

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomerContext must be within a client");
  }
  return context;
}
