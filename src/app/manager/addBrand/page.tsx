"use client";

import { useCategories } from "@/contexts/categoriesContext";
import { fireStoreDB } from "@/firebase/base";
import { uploadImage } from "@/firebase/storageService";
import { Brand } from "@/types/category";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import { Dispatch, useState } from "react";

const AddBrand = () => {
  const [brand, setBrand] = useState<Brand>({
    id: "",
    name: "",
    logo: "",
  });

  const [image, setImage] = useState<Brand['logo']>('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleLogo = (file: File, setImageFile: Dispatch<React.SetStateAction<File | null>>, setImage: Dispatch<React.SetStateAction<string>>) => {
    if (file.type.split('/')[1] !== 'png') {
      alert(`File format must be png`);
    } else {
      if (file.size / 1000 > 2000) {
        alert(`${file.size / 1000}kb File size exceeded, max of 2 mb`);
      } else {
        setImageFile(file);
        setImage(URL.createObjectURL(file));
      }
    }
  }

  const createBrand = async () => {
    // setFormLoading(true);
    const create = async (logo: string) => {
      await setDoc(doc(fireStoreDB, 'Brands/' + brand.id), {
        name: brand.name,
        logo: logo
      });
      alert("Brand added Successfully");
    }
    const imageUrl = await uploadImage(imageFile!);
    create(imageUrl);
  }

  return (
    <form className="grid gap-4 py-4" onSubmit={(e) => { e.preventDefault(); createBrand() }}>
      <div>
        <Input
          label="name"
          value={brand.name}
          onChange={(e) =>
            setBrand({ ...brand, name: e.target.value.toLowerCase(), id : e.target.value.toLowerCase() })
          }
          required
        />

      </div>
      <div>
        <Input
          label="logo"
          type="file"
          onChange={(e) => handleLogo(e.target.files![0], setImageFile, setImage)}
          required
        />
        {brand.logo && (
          <Image
            src={image}
            alt="New Brand Logo"
            width={100}
            height={100}
            className="mt-2"
          />
        )}
      </div>
      <Button type="submit">Add Brand</Button>
    </form>
  );
}

export default AddBrand;