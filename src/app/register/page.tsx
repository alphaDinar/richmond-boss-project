"use client";
import { Input } from "@nextui-org/input";
import logoImg from "../../../public/logo.png";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { Checkbox, Chip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { MdOutlineTaskAlt } from "react-icons/md";
import { usePrompt } from "@/contexts/promptContext";
import { fixPrompt } from "@/external/assets";
import { useRouter } from "next/navigation";
import { handleGoogleLogin, isContactValid, registerUserInPhoneBook, whiteListNumber } from "@/firebase/authService";
import { checkOTP, runOTP } from "./registerService";
import { useCart } from "@/contexts/cartContext";
import { useWishList } from "@/contexts/wishListContext";
import { Customer } from "@/types/customer";
import { sendWelcomeSMS } from "@/firebase/smsService";
import { LuLoader } from "react-icons/lu";

const Register = ({ searchParams }: { searchParams: { target: string } }) => {
  const authTarget = searchParams.target ? searchParams.target : '/';
  const router = useRouter();

  const phoneCode = "233";
  const { cart } = useCart();
  const { wishList } = useWishList();
  const { prompt, setPrompt } = usePrompt();

  const [formLevel, setFormLevel] = useState(0);

  const [username, setUsername] = useState('');
  const [otp, setOTP] = useState(Array(6).fill(''));
  const [contact, setContact] = useState('');
  const [fullContact, setFullContact] = useState('');

  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [passMatch, setPassMatch] = useState(false);

  const [formLoading, setFormLoading] = useState(false);

  const promptList = [
    "Enter Contact",
    "Enter OTP",
    "Create your password",
    "Almost done"
  ]

  // useEffect(() => {
  //   setPrompt(fixPrompt('pass', 'Contact Already Registered'));
  // }, [setPrompt])

  useEffect(() => {
  }, [cart, wishList, prompt])



  const handleContact = (val: string) => {
    setContact(val);
    setFullContact(phoneCode + val);
  }

  const handlePassword = (pass1: string, pass2: string) => {
    setPassword(pass1);
    setConPassword(pass2);

    if (pass1 === pass2) {
      setPassMatch(true);
    } else {
      setPassMatch(false);
    }
  }

  const handleOTP = (el: HTMLInputElement, index: number) => {
    const val = el.value;

    if (val.length < 2) {
      const otpTemp = [...otp];
      otpTemp[index] = val;

      setOTP(otpTemp);

      if (val) {
        const nextSibling = el.nextSibling;
        if (nextSibling && nextSibling instanceof HTMLInputElement) {
          nextSibling.focus();
        }
      }
    }
  }

  const handleForm = async () => {
    if (formLevel === 0) {
      if (isContactValid(fullContact)) {
        const contactExists = await whiteListNumber(fullContact);
        if (!contactExists) {
          runOTP(fullContact,
            () => {
              setFormLevel(1);
              setPrompt(fixPrompt('pass', `OTP sent to ${fullContact}`));
            },
            () => { }
          )
        } else {
          setPrompt(fixPrompt('fail', `Contact Already Registered`));
        }
      } else {
        setPrompt(fixPrompt('fail', `Invalid Contact`));
      }
    } else if (formLevel === 1) {
      if (otp.length === 6) {
        checkOTP(fullContact, otp.join(''),
          () => {
            setFormLevel(2);
          },
          () => {
            setPrompt(fixPrompt('fail', `Invalid OTP`));
          }
        )
      }
    } else if (formLevel === 2) {
      passMatch ? setFormLevel(3) : setPrompt(fixPrompt('fail', `Passwords don't match`));
    } else {
      setFormLoading(true);
      if (isContactValid(fullContact) && passMatch) {
        const customer: Omit<Customer, 'id'> = {
          email: '',
          contact: fullContact,
          username: username,
        }
        const target = authTarget ? authTarget : '/';
        registerUserInPhoneBook(fullContact, password, customer, cart, wishList, router, target);
      }
    }
  }

  return (
    <section className="min-h-screen w-full flex justify-center items-center border py-10" id="hor">
      <section className="bg-red-000 border p-6 rounded-[30px] gap-6 flex flex-col items-center sm-screen:w-full">
        <Link href={'/'}>
          <Image alt="" src={logoImg} width={50} height={50} />
        </Link>
        <header className="flex flex-col items-center">
          <strong className="text-2xl">Create An Account</strong>
          <small>{promptList[formLevel]}</small>
        </header>

        <form onSubmit={(e) => { e.preventDefault(); handleForm() }} className="grid gap-3 w-[350px] sm-screen:w-full">
          {formLevel == 0 &&
            <article className="flex  gap-2">
              <Input type="text" label="code" value={'+233'} className='w-[100px]' isRequired isReadOnly />
              <Input type="text" label="Contact" required value={contact} onChange={(e) => handleContact(e.target.value)} isRequired />
            </article>
          }

          {formLevel == 1 &&
            <article className='grid grid-cols-6 gap-1 w-[350px] sm-screen:w-full'>
              {otp.map((el, i) => (
                <input type='number'
                  style={{ textAlign: 'center' }}
                  key={i}
                  className="h-14 rounded-2xl bg-gray-100 sm-screen:h-12"
                  inputMode='numeric'
                  maxLength={1}
                  value={otp[i]}
                  onChange={(e) => handleOTP(e.target, i)}
                  required
                />
              ))}
            </article>
          }

          {formLevel == 2 &&
            <article className='grid gap-3'>
              <Input type="password" isRequired value={password} onChange={(e) => handlePassword(e.target.value, conPassword)} label="Password" required />
              <Input type="password" isRequired value={conPassword} onChange={(e) => handlePassword(password, e.target.value)} label="Confirm Password" required />
            </article>
          }

          {formLevel == 3 &&
            <section className='grid gap-5'>
              <Input type="text" label="Username" isRequired onChange={(e) => setUsername(e.target.value)} required />

              <article className='flex items-center'>
                <Checkbox required isRequired />
                <span className='text-[0.9rem]'>By ticking this checkbox I agree to all our <Link href={'/privacyPolicy'} className='text-blue-400'>privacy policies</Link> </span>
              </article>
            </section>
          }

          <article className="flex flex-col mt-1 gap-1 items-end">
            <Button type="submit" fullWidth className="bg-[var(--theme)] text-white font-bold">
              {formLoading && formLevel === 3 ?
                <LuLoader className="animate-spin" />
                :
                <span>Continue</span>
              }
            </Button>
            <Chip
              variant="shadow"
              size="sm"
              classNames={{
                base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                content: "drop-shadow shadow-black text-white",
              }}
            >
              5% off first purchase for sign up with contact
            </Chip>
          </article>
        </form>

        <small className=" text-gray-500">Or sign up with</small>

        <Button fullWidth className="bg-white border" size="lg"
          onClick={async () => {
            await handleGoogleLogin(cart, wishList, router, authTarget, () => { alert('error') });
          }}
        >
          <FcGoogle />
          <span>Google</span>
        </Button>

        <Link href={`/login?target=${authTarget}`}>
          <p className="text-sm flex gap-2">
            <span>Already have an account?</span>
            <span className="text-[var(--theme)]">Login here</span>
          </p>
        </Link>
      </section>
    </section>
  );
}

export default Register;