import axios from "axios";
import { constant_url } from "./constant";

export const useFetchNews = async (page = 0, query) => {
  try {
    let url;
    if (!query) {
      url = `${constant_url}?api-key=${
        import.meta.env.VITE_API_KEY
      }&page=${page}`;
    } else if (query) {
      url = `${constant_url}?api-key=${
        import.meta.env.VITE_API_KEY
      }&page=${page}&q=${query}`;
    }
    const response = await axios.get(url);

    const result = await response?.data?.response?.docs;
    return result;
  } catch (error) {
    console.log("error while fetching news articles ", error);
    throw new Error("Failed to fetch News articles");
  }
};
