"use client";
import { fireStoreDB } from "@/firebase/base";
import { Category } from "@/types/category";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";

const AddCategory = () => {
  const [category, setCategory] = useState<Category>({
    id: '',
    name: '',
  });

  const createCategory = async () => {
    const cid = category.name.toLowerCase();
    await setDoc(doc(fireStoreDB, 'Categories/' + cid), {
      name: cid,
    })
    alert('created');
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); createCategory() }}>
      <Input
        label="name"
        value={category.name}
        onChange={(e) =>
          setCategory({ id: e.target.value, name: e.target.value })
        }
        required
      />

      <Button type="submit">Add</Button>
    </form>
  );
}

export default AddCategory;