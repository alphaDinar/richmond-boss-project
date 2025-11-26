import { Button } from "@nextui-org/react";
import Image from "next/image";
import { GrAppleAppStore } from "react-icons/gr";
import { RiGooglePlayLine } from "react-icons/ri";

const StoreBox = () => {
  const place = "https://res.cloudinary.com/dvnemzw0z/image/upload/v1727657519/maqete/mobile-ecommerce-design_2xaa-removebg-preview_kpldet.png";
  return (
    <section id="hor">
      <section className="bg-gradient-to-r from-gray-100 via-pink-200/60 to-blue-200/60 backdrop-blur-lg grid grid-cols-2 p-10 rounded-[20px] items-center
      h-96 md-screen:h-auto md-screen:flex md-screen:flex-col md-screen:gap-8 sm-screen:p-5
      ">
        <section className="flex flex-col gap-8 md-screen:items-center md-screen:text-center md-screen:gap-3 w-full">
          <article className="flex flex-col md-screen:items-center md-screen:text-center">
            <strong className="text-3xl sm-screen:text-2xl">Easy And Efficient</strong>
            <small>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quasi alias pariatur, tempore dolorum assumenda enim laborum mollitia exercitationem nostrum placeat provident magnam eveniet aliquam. Nulla ipsum at libero obcaecati!</small>
          </article>
          <nav className="flex gap-5">
            <Button className="bg-black text-white" endContent={<GrAppleAppStore />} >App Store</Button>
            <Button className="bg-black text-white" endContent={<RiGooglePlayLine />}>Play Store</Button>
          </nav>
        </section>
        <section className="relative h-full md-screen:h-72 w-full">
          <Image src={place} alt="" fill className="object-contain" />
        </section>
      </section>
    </section>
  );
}

export default StoreBox;