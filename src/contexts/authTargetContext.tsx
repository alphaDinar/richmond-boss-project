'use client'
import { Dispatch, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { authTargetToken } from '@/external/assets';

type authTargetContextProviderProps = {
  children: ReactNode;
};

type authTargetContext = {
  authTarget: string,
  setAuthTarget: Dispatch<React.SetStateAction<string>>;
}

export const AuthTargetContext = createContext<authTargetContext | null>(null);

export const AuthTargetContextProvider = ({ children }: authTargetContextProviderProps) => {
  const [authTarget, setAuthTarget] = useState("/");

  useEffect(() => {
    if (localStorage.getItem(authTargetToken)) {
      setAuthTarget(localStorage.getItem(authTargetToken)!);
      console.log('gigi');
    } else {
      localStorage.setItem(authTargetToken, "/");
      console.log('not');
    }
  }, [])

  return (
    <AuthTargetContext.Provider value={{ authTarget, setAuthTarget }}>
      {children}
    </AuthTargetContext.Provider>
  )
}

export const useAuthTarget = () => {
  const context = useContext(AuthTargetContext);
  if (!context) {
    throw new Error("useAuthTargetContext must be within a client");
  }
  return context;
}
