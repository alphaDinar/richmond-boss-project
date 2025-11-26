import { googleMapKey, googleMatrixKey, googlePlacesApiKey } from "@/firebase/locationService";
import axios from "axios"
import { defLocation } from "@/external/assets";
import { LocationType } from "@/types/order";

export type LocationPrediction = {
  tag: string,
  placeId: string
};

export const makeSuggestions = async (val: string): Promise<LocationPrediction[]> => {
  let predictionList: LocationPrediction[] = [];

  const groundURL = 'https://corsproxy.io/?https://maps.googleapis.com/maps/api/place/autocomplete/json';
  const url = `${groundURL}?input=${val}&components=country:GH&key=${googlePlacesApiKey}`;

  const response = await axios.post(url);
  if (response.status == 200) {
    const resultData = response.data;
    console.log(resultData);
    const resultList: any[] = resultData['predictions'];

    resultList.forEach((el) => {
      const tag = el['structured_formatting']['main_text'];
      const placeId = el['place_id'];
      const prediction: LocationPrediction = { tag: tag, placeId: placeId };
      predictionList.push(prediction);
    })
  }

  // console.log(predictionList);
  return predictionList;
}

export const getCoordinates = async (placeId: string): Promise<LocationType> => {
  const url = `https://corsproxy.io/?https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${googleMapKey}`;
  const response = await axios.get(url);
  if (response.status == 200) {
    const data = response.data;
    const lat = data['result']['geometry']['location']['lat'] as number;
    const lon = data['result']['geometry']['location']['lng'] as number;
    return { lat: lat, lon: lon };
  } else {
    return defLocation;
  }
}

// export const fixTripDelivery = async (customerLocation: LocationType, storeLocation: LocationType, tripDelivery: TripDelivery): Promise<TripDelivery> => {
//   const url = `https://corsproxy.io/?https://maps.googleapis.com/maps/api/distancematrix/json?origins=${storeLocation.lat},${storeLocation.lon}&destinations=${customerLocation.lat},${customerLocation.lon}&mode=driving&key=${googleMatrixKey}`

//   const res = await axios.get(url);

//   if (res.status === 200) {
//     const data = res.data;
//     const distObj = data['rows'];

//     const tag = distObj[0]['elements'][0]['duration']['text'];
//     const duration = distObj[0]['elements'][0]['duration']['value'];
//     const fee = 10;

//     return { ...tripDelivery, tag: tag, duration: duration, fee: fee };
//   } else {
//     return { ...tripDelivery, tag: '0 mins', duration: 0, fee: 0 };
//   }
// }