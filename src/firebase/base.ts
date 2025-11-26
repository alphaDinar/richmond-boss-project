import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBmZ253mYPI9ZYzM2PSohl6-9pBTKhreHM",
  authDomain: "maqete-eaadd.firebaseapp.com",
  projectId: "maqete-eaadd",
  storageBucket: "maqete-eaadd.appspot.com",
  messagingSenderId: "427617014680",
  appId: "1:427617014680:web:394798e2a3cf8f03b8d1ed",
  measurementId: "G-2YZ644LD96"
};

export const app = initializeApp(firebaseConfig);
export const fireAuth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const fireStoreDB = getFirestore(app);
export const storageDB = getStorage(app);
