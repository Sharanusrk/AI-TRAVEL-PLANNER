import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
    "X-Goog-FieldMask": "places.photos,places.displayName,places.id", // ✅ Fixed typo and ensured correct format
  },
};

export const GetPlaceDetails = (data) => {
  if (!data || typeof data !== "object") {
    console.error("Invalid data passed to GetPlaceDetails:", data);
    return Promise.reject(new Error("Invalid request data"));
  }

  return axios.post(BASE_URL, data, config);
};

export const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY