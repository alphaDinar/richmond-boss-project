"use client";
import { LuLoader2 } from "react-icons/lu";

const LoadingBox = () => {
  return (
    <section className='h-96 w-full flex items-center justify-center'>
      <LuLoader2 className='text-6xl animate-spin text-[var(--theme)]' />
    </section>
  );
}

export default LoadingBox;