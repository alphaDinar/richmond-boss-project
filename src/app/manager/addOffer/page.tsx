"use client";
import { useState } from "react";
import { Button, DateRangePicker, DateValue, Input, RangeValue } from "@nextui-org/react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { useProductList } from "@/contexts/productList";
import SelectBox from "../SelectBox";
import { Offer } from "@/types/product";
import { doc, setDoc } from "firebase/firestore";
import { fireStoreDB } from "@/firebase/base";

const AddOffer = () => {
  const { productList } = useProductList();

  const [name, setName] = useState('');

  const [range, setRange] = useState<RangeValue<DateValue> | null>(null);
  const [product, setProduct] = useState('');

  const createOffer = async () => {
    if (range) {
      const startStamp = new Date(range.start.toString()).getTime();
      const endStamp = new Date(range.end.toString()).getTime();

      const offer: Omit<Offer, 'id'> = {
        name: name,
        pid: product,
        startDate: startStamp,
        endDate: endStamp,
      }

      await setDoc(doc(fireStoreDB, 'Offers/' + name), offer);
      alert('created');
    }
  }

  return (
    <section id="hor" className="pt-10 pb-10">
      <form onSubmit={(e) => { e.preventDefault(); createOffer() }} className="grid gap-5">
        <div>
          <span>name</span>
          <Input value={name} onChange={(e) => setName(e.target.value)} required isRequired />
        </div>

        <div>
          <span>Product {product}</span>
          <SelectBox items={productList} setItem={setProduct} defKey="" />
        </div>

        <DateRangePicker
          label="Offer Duration"
          value={range}
          isRequired
          onChange={(e) => {
            e && setRange({
              start: e.start,
              end: e.end,
            })
          }}
        />

        <span>{range && range.start.toString()}</span>

        <Button type="submit" fullWidth>Add</Button>
      </form>
    </section>
  );
}

export default AddOffer;