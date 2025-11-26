"use client";
import { Select, SelectItem } from "@nextui-org/react";
import { Dispatch, FC } from "react";

interface defType extends Record<string, any> { };
type SelectBoxProps = {
  items: defType[];
  setItem: Dispatch<React.SetStateAction<string>>;
  defKey: string;
}
const SelectBox: FC<SelectBoxProps> = ({ items, setItem, defKey }) => {
  return (
    <Select
      fullWidth
      label="choose"
      defaultSelectedKeys={[defKey]}
      onSelectionChange={(val) => {
        const finalVal = Array.from(val as Set<any>)[0];
        setItem(finalVal);
      }}
      isRequired
    >
      {items.map((item) => (
        <SelectItem key={item.id}>
          {item.id}
        </SelectItem>
      ))}
    </Select>
  );
}

export default SelectBox;