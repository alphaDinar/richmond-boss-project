export const googleMapKey = "AIzaSyDmxzx-9xBr72qFUs1H4QcHQU7YzXGg_js";
export const googleMatrixKey = "AIzaSyDG9-0pleth0NLxiVp06fMDXzV4GmLV-aU";
export const googlePlacesApiKey = "AIzaSyDGhwhhuj2vEurAWx5FFoq_LuoQ1OBArdg";
// import { defLocation } from "@/app/external/assets";
// import { LocationType } from "@/app/types/location";
// import axios from "axios";


// export const getLocationPermit = (errorStep: Function): { address: string, location: LocationType } => {
//   let locationRes = {
//     address: 'Adiembra',
//     location: defLocation
//   };

//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const lat = position.coords.latitude;
//         const lon = position.coords.longitude;

//         const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${googleMapKey}`;

//         const res = await axios.get(url);
//         if (res.status == 200) {
//           const results = res.data.results
//           const addressComponents = results[0]['address_components'];
//           const address = addressComponents[1]['short_name'];
//           locationRes.address = address;
//           locationRes.location = { lat: lat, lon: lon };
//         } else {
//           errorStep();
//         }
//       }
//     );
//   } else {
//     errorStep()
//   }

//   return locationRes;
// }
