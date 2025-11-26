import { Button } from "@nextui-org/react";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoTiktok } from "react-icons/io5";
import { MdCall } from "react-icons/md";

const FooterBox = () => {
  // const socialStyle = "bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent font-semibold rounded-lg shadow-lg hover:from-orange-500 hover:to-pink-600 transition-all duration-300 backdrop-blur-md";
  const socialStyle = "bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent font-semibold hover:from-orange-500 hover:to-pink-600 transition-all duration-300";

  // const socialStyle = "text-gradient-to-r from-orange-400 to-pink-500 font-semibold rounded-lg shadow-lg hover:from-orange-500 hover:to-pink-600 transition-all duration-300 backdrop-blur-md"

  return (
    <section id="hor"
      // bg-[radial-gradient(circle,_#000_1px,_transparent_1px)] bg-[length:70px_70px]
      className=" bg-gray-50
       py-10 grid gap-16 sm-screen:gap-8"
    >
      <section className="grid grid-cols-4 gap-10 text-sm sm-screen:flex sm-screen:flex-col sm-screen:items-center sm-screen:text-center sm-screen:gap-5">
        <article className="flex flex-col gap-5">
          <p className="flex items-center gap-3 text-2xl">
            <MdCall />
            <strong>+233 54 922 9565</strong>
          </p>

          <strong>Want To Stay Updated</strong>
          {/* <Input /> */}
          <Button className="w-max" radius="none">Join News Letter</Button>
        </article>

        <div className="flex flex-col gap-2">
          <strong>Quick Links</strong>
          <article className="flex flex-col">
            <Link href=''>Blog</Link>
            <Link href=''>Products</Link>
            <Link href=''>Offers</Link>
            <Link href=''>About</Link>
          </article>
        </div>

        <div className="flex flex-col gap-2">
          <strong>Quick Links</strong>
          <article className="flex flex-col">
            <Link href=''>Products</Link>
            <Link href=''>Blog</Link>
            <Link href=''>Offers</Link>
            <Link href=''>About</Link>
          </article>
        </div>

        <div className="flex flex-col gap-2">
          <strong >Quick Links</strong>
          <article className="flex flex-col ">
            <Link href=''>Blog</Link>
            <Link href=''>Offers</Link>
            <Link href=''>Products</Link>
            <Link href=''>About</Link>
          </article>
        </div>
      </section>

      <section className="flex justify-between sm-screen:flex-col sm-screen:items-center sm-screen:text-center sm-screen:gap-4">
        <article className="flex  gap-10 text-sm sm-screen:flex-col sm-screen:items-center sm-screen:gap-2">
          <Link href={'/'}>Terms & Conditions</Link>
          <Link href={'/'}>Privacy Policy</Link>
        </article>

        <article className="flex gap-5 text-xl text-[var(--theme)]">
          <FaFacebookF />
          <FaInstagram />
          <FaXTwitter />
          <IoLogoTiktok />
        </article>
      </section>
    </section>
  );
}

export default FooterBox;