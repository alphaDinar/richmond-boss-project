'use client'
import { Dispatch, ReactNode, createContext, useContext, useState } from "react";

type userLoadingContextProviderProps = {
  children: ReactNode;
};

type userLoadingContext = {
  userLoading: boolean,
  setUserLoading: Dispatch<React.SetStateAction<boolean>>;
}

export const UserLoadingContext = createContext<userLoadingContext | null>(null);

export const UserLoadingContextProvider = ({ children }: userLoadingContextProviderProps) => {
  const [userLoading, setUserLoading] = useState<boolean>(true);

  return (
    <UserLoadingContext.Provider value={{ userLoading, setUserLoading }}>
      {children}
    </UserLoadingContext.Provider>
  )
}

export const useUserLoading = () => {
  const context = useContext(UserLoadingContext);
  if (!context) {
    throw new Error("useUserLoadingContext must be within a layout");
  }
  return context;
}
