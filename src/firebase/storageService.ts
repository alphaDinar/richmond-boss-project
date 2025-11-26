import { MediaType } from "@/types/media";
import { storageDB } from "./base";
import { getDownloadURL, uploadBytes, ref as sRef } from "firebase/storage";

export const fixMediaType = (img: string): MediaType => {
  return {
    name: 'def',
    url: img,
    type: 'image',
    format: 'png'
  }
}

export const uploadImage = async (file: File): Promise<string> => {
  let finalUrl = '';
  const stamp = new Date().getTime();
  const objName = `${file.name}${stamp}`;

  await uploadBytes(sRef(storageDB, 'CloudNine/' + objName), file)
    .then((res) =>
      getDownloadURL(res.ref)
        .then((urlRes) => {
          finalUrl = urlRes;
        })
        .catch((error) => console.log(error)))
  return finalUrl;
}

export const createMediaType = (file: File, url: string): MediaType => {
  return {
    name: file.name,
    type: 'image',
    format: file.type.split('/')[1],
    url: url
  };
}