'use client'
import { Dispatch, ReactNode, createContext, useContext, useState } from "react";

type prompt = {
  status: boolean,
  text: string,
  type: string,
}

type promptContextProviderProps = {
  children: ReactNode;
};

type promptContext = {
  prompt: prompt,
  setPrompt: Dispatch<React.SetStateAction<prompt>>;
}

export const PromptContext = createContext<promptContext | null>(null);

export const PromptContextProvider = ({ children }: promptContextProviderProps) => {
  const [prompt, setPrompt] = useState<prompt>({
    status: false,
    text: '',
    type: '',
  });

  return (
    <PromptContext.Provider value={{ prompt, setPrompt }}>
      {children}
    </PromptContext.Provider>
  )
}

export const usePrompt = () => {
  const context = useContext(PromptContext);
  if (!context) {
    throw new Error("usePrompt must be within a promptProvider");
  }
  return context;
}
