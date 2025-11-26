

import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { fireAuth, fireStoreDB, googleProvider } from "./base";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { makePassword } from "@/external/hash";
import { Customer } from "@/types/customer";
import { Cart } from "@/types/cart";
import { WishList } from "@/types/wishList";
import { authTargetToken } from "@/external/assets";
import { sendWelcomeSMS } from "./smsService";

const PhoneBookRef = collection(fireStoreDB, 'PhoneBook/');

export const isContactValid = (input: string): boolean => {
  const regex = /^\d{12}$/;
  return regex.test(input);
}

export const whiteListNumber = async (number: string) => {
  const contactList: string[] = (await getDocs(PhoneBookRef)).docs.map((el) => el.id);

  // const contactExists = contactList.includes(number);
  return contactList.includes(number);
}

export const registerUserInPhoneBook = async (phone: string, password: string, customer: Omit<Customer, 'id'>, cart: Cart, wishList: WishList, router: AppRouterInstance, target: string) => {
  const email = phone + '@gmail.com';
  const passKey = await makePassword(password);

  setDoc(doc(fireStoreDB, 'PhoneBook/' + phone), {
    email: email,
    password: passKey
  })
  // .then(async () => {
  await createUser(email, passKey, customer, cart, wishList, router, target);
  // })
  // .catch((error) => console.log('registerUserInPhoneBook Error', error));
}

export const createUser = async (email: string, passKey: string, customer: Omit<Customer, 'id'>, cart: Cart, wishList: WishList, router: AppRouterInstance, target: string,) => {
  createUserWithEmailAndPassword(fireAuth, email, passKey)
    .then(async (userObj) => {
      await setDoc(doc(fireStoreDB, 'Customers/' + userObj.user.uid), customer);
      await setDoc(doc(fireStoreDB, 'Carts/' + userObj.user.uid), {
        items: cart.items
      });
      await setDoc(doc(fireStoreDB, 'WishLists/' + userObj.user.uid), {
        items: wishList.items
      });
      await setDoc(doc(fireStoreDB, 'FirstDiscounts/' + userObj.user.uid), {
        status: true
      });
      customer.contact && await sendWelcomeSMS(customer.contact);
      await loginUser(email, passKey, router, target);
    }).catch((error) => {
      console.log('createUser Error', error);
    });
}

export const loginUser = async (email: string, passKey: string, router: AppRouterInstance, target: string) => {
  signInWithEmailAndPassword(fireAuth, email, passKey)
    .then(() => {
      router.push(target);
    }).catch((error) => {
      console.log('Sign In Error', error);
    });
}

export const verifyUser = async (phone: string, password: string, router: AppRouterInstance, target: string, errorStep: Function) => {
  const email = phone + '@gmail.com';
  const passKey = await makePassword(password);

  await signInWithEmailAndPassword(fireAuth, email, passKey)
    .then(() => {
      router.push(target);
    })
    .catch((error) => {
      errorStep();
      console.log('Verify User Error', error);
    });
}

export const handleGoogleLogin = async (cart: Cart, wishList: WishList, router: AppRouterInstance, target: string, errorStep: Function) => {
  const userObj = await signInWithPopup(fireAuth, googleProvider)
  if (userObj) {
    const newCustomer: Omit<Customer, 'id'> = {
      username: userObj.user.displayName || 'anon',
      contact: '',
      email: userObj.user.email || 'anon',
    }
    const customer = await getDoc(doc(fireStoreDB, 'Customers/' + userObj.user.uid))
    if (customer.exists()) {
      router.push(target);
    } else {
      await setDoc(doc(fireStoreDB, 'Customers/' + userObj.user.uid), newCustomer);
      await setDoc(doc(fireStoreDB, 'Carts/' + userObj.user.uid), {
        items: cart.items
      });
      await setDoc(doc(fireStoreDB, 'WishLists/' + userObj.user.uid), {
        items: wishList.items
      });
      router.push(target);
    }
  } else {
    errorStep();
  }
}