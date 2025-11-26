"use client"
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

export default function App() {
  const animals = [
    { label: 'cat', value: 'cat' },
    { label: 'dog', value: 'dog' }
  ]

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Autocomplete
        label="Select an animal"
        className="max-w-xs"
      >
        {animals.map((animal) => (
          <AutocompleteItem key={animal.value} value={animal.value}>
            {animal.label}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <Autocomplete
        label="Favorite Animal"
        placeholder="Search an animal"
        className="max-w-xs"
        defaultItems={animals}
      >
        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
      </Autocomplete>
    </div>
  );
}