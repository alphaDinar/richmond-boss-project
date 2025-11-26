"use client";
import { useBrands } from "@/contexts/brandsContext";
import { useCategories } from "@/contexts/categoriesContext";
import { useProductList } from "@/contexts/productList";
import { fireStoreDB } from "@/firebase/base";
import { createMediaType, fixMediaType, uploadImage } from "@/firebase/storageService";
import { MediaType } from "@/types/media";
import { Bundle, Product, Specification, Variation } from "@/types/product";
import { Input, Textarea } from "@nextui-org/react";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { Dispatch, useState } from "react";
import SelectBox from "./SelectBox";
import { MdDeleteForever, MdDeleteOutline, MdEdit } from "react-icons/md";
import Image from "next/image";

const AddProduct = () => {
  const { productList } = useProductList();
  const { categories } = useCategories();
  const { brands } = useBrands();

  const [formLoading, setFormLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState<Product['brand']>('');
  const [name, setName] = useState<Product['name']>('');
  const [displayName, setDisplayName] = useState<Product['displayName']>('');

  const [description, setDescription] = useState<Product['description']>('');
  const [specifications, setSpecifications] = useState<Product['specifications']>([]);
  const [topFeatures, setTopFeatures] = useState<Product['topFeatures']>([]);

  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [coverImage, setCoverImage] = useState('');
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);

  const [gallery, setGallery] = useState<Product['gallery']>([]);
  const [galleryFiles, setGalleryFiles] = useState<(File | null)[]>([]);

  const [bundles, setBundles] = useState<Product['bundles']>([]);
  const [variations, setVariations] = useState<Product['variations']>([]);

  const [topFeature, setTopFeature] = useState('');

  const [returnPolicy, setReturnPolicy] = useState(10);

  const [specification, setSpecification] = useState<Specification>({
    title: '',
    points: ''
  });

  const [bundle, setBundle] = useState<Bundle>({
    data: ["", ""],
    price: 0,
    storePrice: 0,
    quantity: 0,
    imageIndex: 0
  });

  const [variation, setVariation] = useState<Variation>({
    val: '',
    type: 'color',
    imageIndex: 0
  });


  const addTopFeature = () => {
    if (topFeature.length) {
      const topFeaturesTemp = [...topFeatures, topFeature];
      setTopFeatures(topFeaturesTemp);
      setTopFeature('');
    }
  }

  const remTopFeature = (feature: string) => {
    const topFeaturesTemp = topFeatures.filter((el) => el !== feature);
    setTopFeatures(topFeaturesTemp);
  }

  const addSpecification = () => {
    const specificationsTemp = [...specifications, specification];
    setSpecifications(specificationsTemp);
    setSpecification({
      title: '',
      points: '',
    });
  }

  const remSpecification = (title: string) => {
    const specificationsTemp = specifications.filter((el) => el.title !== title);
    setSpecifications(specificationsTemp);
  }

  const addBundle = () => {
    const bundlesTemp = [...bundles, bundle];
    setBundles(bundlesTemp);
    setBundle({
      data: ["", ""],
      price: 0,
      storePrice: 0,
      quantity: 0,
      imageIndex: 0
    });
  };

  const editBundle = (bundle: Bundle, index: number) => {
    const bundlesTemp = [...bundles];
    bundlesTemp[index] = bundle;
    setBundles(bundlesTemp);
  }

  const remBundle = (price: number) => {
    const bundlesTemp = bundles.filter((el) => el.price !== price);
    setBundles(bundlesTemp);
  }

  const addVariation = () => {
    const variationsTemp = [...variations, variation];
    setVariations(variationsTemp);
    setVariation({
      val: '',
      type: 'color',
      imageIndex: 0
    });
  };

  const remVariation = (val: string) => {
    const variationsTemp = variations.filter((el) => el.val !== val);
    setVariations(variationsTemp);
  }

  const handleImage = (file: File, setImageFile: Dispatch<React.SetStateAction<File | null>>, setImage: Dispatch<React.SetStateAction<string>>) => {
    // if (file.type.split('/')[1] !== 'png') {
    //   alert(`File format must be png`);
    // } else {
    if (file.size / 1000 > 2000) {
      alert(`${file.size / 1000}kb File size exceeded, max of 2 mb`);
    } else {
      setImageFile(file);
      setImage(URL.createObjectURL(file));
    }
    // }
  }

  const handleCoverImage = (file: File, setImageFile: Dispatch<React.SetStateAction<File | null>>, setImage: Dispatch<React.SetStateAction<string>>) => {
    if (file.size / 1000 > 2000) {
      alert(`${file.size / 1000}kb File size exceeded, max of 2 mb`);
    } else {
      setImageFile(file);
      setImage(URL.createObjectURL(file));
    }
  }

  const addToGallery = (file: File, setGalleryFiles: Dispatch<React.SetStateAction<(File | null)[]>>, setGallery: Dispatch<React.SetStateAction<MediaType[]>>) => {
    if (file.size / 1000 > 3500) {
      alert(`${file.size / 1000}kb File size exceeded, max of 2 mb`);
    } else {
      const galleryFilesTemp = [...galleryFiles, file];
      setGalleryFiles(galleryFilesTemp);

      const url = URL.createObjectURL(file);
      const galleryTemp = [...gallery, fixMediaType(url)];
      setGallery(galleryTemp);
    }
  }

  const deleteFromGallery = (index: number) => {
    const galleryFilesTemp = [...galleryFiles];
    const galleryTemp = [...gallery];

    galleryFilesTemp.splice(index, 1);
    galleryTemp.splice(index, 1);

    setGalleryFiles(galleryFilesTemp);
    setGallery(galleryTemp);
  }

  const createProduct = async () => {
    setFormLoading(true);
    const create = async (finalImage: MediaType, finalCoverImage: MediaType, finalGallery: MediaType[]) => {
      const stamp = new Date().getTime();

      const product: Omit<Product, 'id'> = {
        category: category,
        brand: brand,
        name: name,
        displayName: displayName,
        topFeatures: topFeatures,
        priority: 10,
        description: description,
        specifications: specifications,
        image: finalImage,
        coverImage: finalCoverImage,
        gallery: finalGallery,
        variations: variations,
        bundles: bundles,
        reviews: [],
        returnPolicy: returnPolicy,
        timestamp: stamp
      }

      await setDoc(doc(fireStoreDB, 'Products/' + product.name), product)
      const prodTemp: Product = { ...product, id: product.name };
      const productListTemp = [...productList, prodTemp];
      await updateDoc(doc(fireStoreDB, 'Register/' + 'products'), {
        list: productListTemp
      })
      alert("Product added Successfully");
      // resetForm();
      // onclose()
      setFormLoading(false);
    };

    const uploadMediaSet = async () => {
      const imageUrl = await uploadImage(imageFile!);
      const coverImageUrl = await uploadImage(coverImageFile!);
      let finalGallery = [];
      for (let i = 0; i < galleryFiles.length; i++) {
        const itemUrlTemp = await uploadImage(galleryFiles[i]!);
        console.log(galleryFiles);
        finalGallery.push(createMediaType(galleryFiles[i]!, itemUrlTemp));
      }
      create(fixMediaType(imageUrl), createMediaType(coverImageFile!, coverImageUrl), finalGallery);
    }

    uploadMediaSet();
  }

  return (
    <section id="hor" className="pt-10 pb-10">
      <form className="grid gap-3" onSubmit={(e) => { e.preventDefault(); createProduct() }}>
        <div>
          <span>name</span>
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <span>display name</span>
          <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
        </div>
        <div>
          <span>description</span>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            isRequired
          />
        </div>

        <div>
          <span>Category {category}</span>
          <SelectBox items={categories} setItem={setCategory} defKey="" />
        </div>

        <div>
          <span>Brand {brand}</span>
          <SelectBox items={brands} setItem={setBrand} defKey="" />
        </div>

        <div>
          <strong>Featured Image</strong>
          <Input
            id="featuredImage"
            type="file"
            onChange={(e) => handleImage(e.target.files![0], setImageFile, setImage)}
            required
          />
          {image && (
            <Image
              width={500}
              height={500}
              src={image}
              alt="Featured"
              className="mt-2 max-w-xs"
            />
          )}
        </div>

        <div>
          <strong>Cover Image</strong>
          <Input
            id="cover Image"
            type="file"
            onChange={(e) => handleCoverImage(e.target.files![0], setCoverImageFile, setCoverImage)}
          />
          {coverImage && (
            <Image
              width={500}
              height={500}
              src={coverImage}
              alt="Featured"
              className="mt-2 max-w-xs"
            />
          )}
        </div>

        <div>
          <strong>Gallery Images</strong>
          <Input
            id="gallery"
            type="file"
            multiple
            onChange={(e) => addToGallery(e.target.files![0], setGalleryFiles, setGallery)}
          />
          {gallery.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {gallery.map((img, index) => (
                <article key={index}>
                  <div className="w-40 h-40 relative border">
                    <Image
                      fill
                      key={index}
                      src={img.url}
                      objectFit="contain"
                      alt={`Gallery ${index}`}
                    />
                  </div>
                  <p className="grid">
                    <MdDeleteOutline
                      onClick={() => deleteFromGallery(index)}
                      className='cursor-pointer bg-red-500 w-full text-[2rem] text-white p-2' />
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Product Bundles</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <article>
              <small>slot 1</small>
              <Input
                type="text"
                value={bundle.data[0]}
                onChange={(e) => setBundle({ ...bundle, data: [e.target.value, bundle.data[1]] })}
              />
            </article>
            <article>
              <small>slot 1</small>
              <Input
                type="text"
                value={bundle.data[1] || ""}
                onChange={(e) => setBundle({ ...bundle, data: [bundle.data[0], e.target.value] })}
              />
            </article>
            <article>
              <small>Store Price</small>
              <Input
                type="number"
                value={bundle.storePrice.toString()}
                onChange={(e) => setBundle({ ...bundle, storePrice: Number(e.target.value) })}
              />
            </article>
            <article>
              <small> Price</small>
              <Input
                type="number"
                value={bundle.price.toString()}
                onChange={(e) => setBundle({ ...bundle, price: Number(e.target.value) })}
              />
            </article>
            <article>
              <small>Quantity</small>
              <Input
                type="number"
                value={bundle.quantity.toString()}
                onChange={(e) => setBundle({ ...bundle, quantity: Number(e.target.value) })}
              />
            </article>
            <article>
              <small>Image Index</small>
              <Input
                type="number"
                value={bundle.imageIndex.toString()}
                onChange={(e) => setBundle({ ...bundle, imageIndex: Number(e.target.value) })}
              />
            </article>
          </div>
          <legend onClick={addBundle} className="mt-2 p-2 bg-emerald-400 rounded-sm text-white">
            Add Bundle
          </legend>
        </div>

        {bundles.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Added Bundles:</h4>
            <ul className="list-disc pl-5">
              {bundles.map((bun, index) => (
                <div className="border p-1 flex gap-2" key={index}>
                  <li className="flex-1">
                    <span>slot 1 : {bun.data[0]}</span>
                    <br />
                    <span>slot 2 : {bun.data[1]}</span>
                    <br />
                    GHS {bun.storePrice}  - GHS {bun.price}
                    <br />
                    (Qty: {bun.quantity})
                  </li>
                  {/* <legend onClick={() => editBundle(bun, index)} className="bg-blue-400 flex items-center p-1 text-white"><MdEdit /></legend> */}
                  <legend onClick={() => remBundle(bun.price)} className="bg-red-400 flex items-center p-1 text-white"><MdDeleteForever /></legend>
                </div>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold mb-2">Product Variations</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Input
              placeholder="Value (e.g., Red)"
              value={variation.val}
              onChange={(e) =>
                setVariation({ ...variation, val: e.target.value })
              }
            />

            <select value={variation.type} onChange={(e) => { setVariation({ ...variation, type: e.target.value as Variation['type'] }) }}>
              <option value="color">color</option>
              <option value="size">size</option>
            </select>
          </div>
          <legend onClick={addVariation} className="mt-2 p-2 bg-blue-600 rounded-sm text-white">
            Add Variation
          </legend>
        </div>
        {variations.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Added Variations:</h4>
            <ul className="list-disc pl-5">
              {variations.map((variation, i) => (
                <div className="border p-2 flex justify-between" key={i}>
                  <li className="list-none">
                    {variation.val}
                    <br />
                    <small>{variation.type}</small>
                  </li>

                  <legend onClick={() => remVariation(variation.val)} className="p-1 bg-red-400 text-white">
                    <MdDeleteForever />
                  </legend>
                </div>
              ))}
            </ul>
          </div>
        )}

        <section>
          <div>
            <strong>Top Features</strong>
            <div>
              <Input label="feature" value={topFeature} onChange={(e) => setTopFeature(e.target.value)} />
            </div>
            <legend onClick={addTopFeature} className="mt-2 p-2 bg-emerald-400 rounded-sm text-white">
              Add Top Feature
            </legend>
          </div>

          <div>
            {topFeatures.map((feature, i) => (
              <article className="border p-2 grid gap-1" key={i}>
                <strong>Feature: {feature}</strong>
                <legend onClick={() => remTopFeature(feature)} className="bg-red-400 flex items-center p-1 text-white"><MdDeleteForever /></legend>
              </article>
            ))}
          </div>
        </section>

        <div>
          <strong>Specifications</strong>
          <div>
            <Input label="title" value={specification.title} onChange={(e) => setSpecification({ ...specification, title: e.target.value })} />
          </div>
          <div>
            <Textarea label="points" placeholder={'separate with |'} value={specification.points} onChange={(e) => setSpecification({ ...specification, points: (specification.points, e.target.value) })} />
          </div>
          <legend onClick={addSpecification} className="mt-2 p-2 bg-emerald-400 rounded-sm text-white">
            Add Specification
          </legend>
        </div>

        <div>
          {specifications.map((spec, i) => (
            <article className="border p-2 grid gap-1" key={i}>
              <strong>Title: {spec.title}</strong>

              <ul className="list-disc">
                {spec.points.split('|').map((p, pi) => (
                  <li key={pi}>+ {p}</li>
                ))}
              </ul>
              <legend onClick={() => remSpecification(spec.title)} className="bg-red-400 flex items-center p-1 text-white"><MdDeleteForever /></legend>
            </article>
          ))}
        </div>

        <div>
          <span>Priority</span>
          <Input />
        </div>

        <div>
          <span>Return policy</span>
          <Input />
        </div>

        <Button type="submit">Done</Button>
      </form>
    </section >
  );
}

export default AddProduct;