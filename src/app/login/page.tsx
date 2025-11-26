"use client";
import { Input } from "@nextui-org/input";
import logoImg from "../../../public/logo.png";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePrompt } from "@/contexts/promptContext";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/cartContext";
import { useWishList } from "@/contexts/wishListContext";
import { LuLoader } from "react-icons/lu";
import { handleGoogleLogin, verifyUser } from "@/firebase/authService";
import { fixPrompt } from "@/external/assets";

const Register = ({ searchParams }: { searchParams: { target: string } }) => {
  const authTarget = searchParams.target ? searchParams.target : '/';
  const router = useRouter();

  const phoneCode = "233";
  const { cart } = useCart();
  const { wishList } = useWishList();
  const { prompt, setPrompt } = usePrompt();

  const [contact, setContact] = useState('');
  const [fullContact, setFullContact] = useState('');

  const [password, setPassword] = useState('');

  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
  }, [cart, wishList, prompt])

  const handleContact = (val: string) => {
    setContact(val);
    setFullContact(phoneCode + val);
  }

  
  const handleForm = async () => {
    setFormLoading(true);
    await verifyUser(fullContact, password, router, authTarget, () => {
      setPrompt(fixPrompt('fail', `Invalid username or password`));
      setFormLoading(false);
    });
  }

  return (
    <section className="min-h-screen w-full flex justify-center items-center border py-10" id="hor">
      <section className="bg-red-000 border p-6 rounded-[30px] gap-6 flex flex-col items-center sm-screen:w-full">
        <Link href={'/'}>
          <Image alt="" src={logoImg} width={50} height={50} />
        </Link>
        <header className="flex flex-col items-center">
          <strong className="text-2xl">Welcome Back</strong>
        </header>

        <form onSubmit={(e) => { e.preventDefault(); handleForm() }} className="grid gap-3 w-[350px] sm-screen:w-full">
          <article className="flex  gap-2">
            <Input type="text" label="code" value={'+233'} className='w-[100px]' isRequired isReadOnly />
            <Input type="text" label="Contact" required value={contact} onChange={(e) => handleContact(e.target.value)} isRequired />
          </article>

          <article>
            <Input type="password" isRequired value={password} onChange={(e) => setPassword(e.target.value)} label="Password" required />
          </article>

          <article className="flex flex-col mt-1 gap-1 items-end">
            <Button type="submit" fullWidth className="bg-[var(--theme)] text-white font-bold">
              {formLoading ?
                <LuLoader className="animate-spin" />
                :
                <span>Continue</span>
              }
            </Button>
          </article>
        </form>

        <small className=" text-gray-500">Or Login with</small>

        <Button fullWidth className="bg-white border" size="lg"
          onClick={async () => {
            await handleGoogleLogin(cart, wishList, router, authTarget, () => { alert('error') });
          }}
        >
          <FcGoogle />
          <span>Google</span>
        </Button>

        <Link href={`/register?target=${authTarget}`}>
          <p className="text-sm flex gap-2">
            <span>{"Don't"} Have an account yet?</span>
            <span className="text-[var(--theme)]">Register here</span>
          </p>
        </Link>
      </section>
    </section>
  );
}

export default Register;