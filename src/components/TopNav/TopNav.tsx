'use client';
import { FC, useEffect, useState } from "react";
import CartBox from "./CartBox";
import logoName from "../../../public/logoName.png";
import { MdMenuBook, MdOutlineFavoriteBorder, MdOutlineShoppingCart } from "react-icons/md";
import Link from "next/link";
import { useCart } from "@/contexts/cartContext";
import { BiCategory, BiSearchAlt } from "react-icons/bi";
import { Spinner } from "@nextui-org/spinner";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import { useCategories } from "@/contexts/categoriesContext";
import { categoryIcons } from "@/external/lists";
import { useWishList } from "@/contexts/wishListContext";
import { refineCartItems } from "@/firebase/cartService";
import { useProductList } from "@/contexts/productList";
import { refineWishItems } from "@/firebase/wishListService";
import Image from "next/image";
import { BiCategoryAlt } from "react-icons/bi";
import { useCustomer } from "@/contexts/customerContext";
import { useCustomerLoading } from "@/loaders/customerLoadingContext";
import { LuLoader } from "react-icons/lu";
import { useWishListLoading } from "@/loaders/wishListLoading";
import { useCartLoading } from "@/loaders/cartLoading";
import { useRouter } from "next/navigation";


type TopNavProps = {
  showFullNav: boolean
}
const TopNav: FC<TopNavProps> = ({ showFullNav }) => {
  const router = useRouter();

  const { customer } = useCustomer();
  const { customerLoading } = useCustomerLoading();
  const { productList } = useProductList();
  const { cart } = useCart();
  const { cartLoading } = useCartLoading();
  const { wishList } = useWishList();
  const { wishListLoading } = useWishListLoading();
  const { categories } = useCategories();

  const [cartToggled, setCartToggled] = useState(false);
  const [searchBoxToggled, setSearchBoxToggled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleCart = () => {
    cartToggled ? setCartToggled(false) : setCartToggled(true);
  }

  const toggleSearchBox = () => {
    searchBoxToggled ? setSearchBoxToggled(false) : setSearchBoxToggled(true);
  }

  useEffect(() => {
  }, [productList, cart, wishList, categories])

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <section className="grid gap-6 pt-6 relative sm-screen:gap-3">
      <Navbar onMenuOpenChange={setIsMenuOpen} id="topNav" maxWidth="full" position="static">
        <NavbarContent>

          <NavbarBrand>
            <Link href={'/'}>
              <span id="digit" className="text-3xl font-bold text-gray-500">E BUSINESS</span>
              {/* <Image src={logoName} width={150} height={100} alt="" className="object-contain" /> */}
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <section className="relative flex w-[400px] items-center md-screen:w-72">
            <Autocomplete
              label="Search Product"
              startContent={<BiSearchAlt className="text-gray-600" />}
              selectorIcon={<BiSearchAlt className="text-transparent" />}
              onSelectionChange={(id) => router.push(`viewProduct?id=${id}`)}
            >
              {productList.map((prod) => (
                <AutocompleteItem key={prod.id} value={prod.id}
                  startContent={
                    <div className="h-7 w-7  relative">
                      <Image alt="" src={prod.image.url} fill className="object-contain" />
                    </div>
                  }
                >
                  {prod.displayName}
                </AutocompleteItem>
              ))}
            </Autocomplete>
            <Spinner
              style={{ opacity: !productList.length ? 1 : 0 }}
              size="sm" className="absolute right-3" />
          </section>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden sm:flex">
            <nav className="flex gap-5 ml-auto items-center md-screen:ml-0 p-3 md-screen:w-full md-screen:justify-center">
              <Link href={'/wishList'} className="flex items-center gap-1 cursor-pointer">
                <MdOutlineFavoriteBorder />
                <small className="bg-[var(--theme)] w-5 h-7 items-center justify-center p-1 rounded-full flex text-white">
                  {wishListLoading ?
                    <LuLoader className="animate-spin" />
                    :
                    refineWishItems(productList, wishList.items).length
                  }
                </small>
              </Link>
              <legend onClick={toggleCart} className="flex gap-1 items-center cursor-pointer">
                <MdOutlineShoppingCart />
                <small className="bg-[var(--theme)] w-5 h-7 items-center justify-center p-1 rounded-full flex text-white">
                  {cartLoading ?
                    <LuLoader className="animate-spin" />
                    :
                    refineCartItems(productList, cart.items).length
                  }
                </small>
              </legend>
            </nav>
          </NavbarItem>
          <NavbarItem className="sm-screen:flex">
            {customerLoading ?
              <Button color="primary" variant="flat" >
                <LuLoader className="animate-spin text-[var(--theme)]" />
              </Button>
              :
              customer
                ?
                <Button as={Link} href="/profile" variant="flat" >
                  {customer.username}
                </Button>
                :
                <Button as={Link} color="primary" href="/register" variant="flat" >
                  Sign Up
                </Button>

            }
          </NavbarItem>

          <NavbarMenuToggle
            icon={<BiCategoryAlt className="text-2xl text-[var(--theme)]" />}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
        </NavbarContent>
        <NavbarMenu className="pt-8">
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                }
                className="w-full"
                href="#"
              // size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      <section className="flex sm:hidden sm-screen:flex-col sm-screen:gap-5 sm-screen:px-[0] items-center">
        <section className="relative flex items-center w-full px-[5%]">
          <Autocomplete
            label="Search Product"
            startContent={<BiSearchAlt className="text-gray-600" />}
            selectorIcon={<BiSearchAlt className="text-transparent" />}
            onSelectionChange={(id) => router.push(`viewProduct?id=${id}`)}
          >
            {productList.map((prod) => (
              <AutocompleteItem key={prod.id} value={prod.id}
                startContent={
                  <div className="h-7 w-7  relative">
                    <Image alt="" src={prod.image.url} fill className="object-contain" />
                  </div>
                }
              >
                {prod.displayName}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <Spinner
            style={{ opacity: !productList.length ? 1 : 0 }}
            size="sm" className="absolute right-3" />
        </section>


        <nav className="fixed bottom-0 z-30 flex shadow-2xl gap-10 items-center bg-gray-100 text-black py-3 px-[5%] w-full justify-end">
          <Link href={'/wishList'} className="flex items-center gap-1 cursor-pointer text-black">
            <MdOutlineFavoriteBorder className="text-lg" />
            <small>{refineWishItems(productList, wishList.items).length}</small>
          </Link>
          <legend onClick={toggleCart} className="flex items-center gap-1 cursor-pointer text-black">
            <MdOutlineShoppingCart />
            <small>{cart.items.length}</small>
          </legend>
        </nav>
      </section>

      <hr className="md-screen:hidden" />


      {showFullNav &&
        <section className="gap-10 items-center hidden sm:flex" id="hor">
          <Dropdown placement="bottom-start" backdrop="blur" radius="lg"
            classNames={{ content: 'bg-white rounded-none' }}
          >
            <DropdownTrigger>
              <Button
                className="bg-[var(--theme)] text-white rounded-none flex justify-start font-bold items-center gap-2 py-6 px-10"
              >
                <BiCategory className="text-lg" />
                <span>All Categories</span>
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Example with disabled actions" disabledKeys={["edit", "delete"]}>
              {categories.map((cat, i) => (
                <DropdownItem key={i}>
                  <Link href={`/products?category=${cat.id}`} className="flex gap-2 items-center">
                    {categoryIcons.find((el) => el.tag === cat.id)?.icon}
                    <span className="capitalize">{cat.name}</span>
                  </Link>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>


          <section className="flex gap-10">
            <Link href={'/products'}>Products</Link>
            <Link href={'/'}>Blog</Link>
            <Link href={'/'}>FAQ</Link>
          </section>
        </section>
      }

      <CartBox toggleCart={toggleCart} cartToggled={cartToggled} />
    </section>
  );
}

export default TopNav;