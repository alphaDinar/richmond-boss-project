"use client";
import { useProductList } from "@/contexts/productList";
import Link from "next/link";
import { MdEdit } from "react-icons/md";

const Products = () => {
  const { productList } = useProductList();

  return (
    <section id="hor" className="py-10">
      <section id="items250">
        {productList.map((product, i) => (
          <Link key={i} href={{ pathname: '/manager/editProduct', query: { obj: JSON.stringify(product) } }} className="border p-6">
            <span>{product.name}</span>
            <MdEdit />
          </Link>
        ))}
      </section>
    </section>
  );
}

export default Products;