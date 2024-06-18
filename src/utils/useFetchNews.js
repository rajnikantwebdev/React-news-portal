import axios from "axios";

export const useFetchNews = async () => {
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=mdPnLY68KNv3GGcy1YfRRMWT1rlbj7S8`
    );

    const result = await response?.data?.response?.docs;
    return result;
  } catch (error) {
    console.log("error while fetching news articles ", error);
    throw new Error("Failed to fetch News articles");
  }
};
