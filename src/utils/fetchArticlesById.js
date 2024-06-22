import axios from "axios";
import { constant_url } from "./constant";

export const fetchArticlesById = async (id) => {
  try {
    const response = await axios.get(
      `${constant_url}/?api-key=${
        import.meta.env.VITE_API_KEY
      }&fq=_id:"nyt://article/${id}"`
    );

    if (response) {
      return response?.data?.response?.docs[0];
    }
  } catch (error) {
    console.log("Error while fetching article try again later");
    throw new Error("Unable to fetch article ", error);
  }
};
