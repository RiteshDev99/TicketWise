import axios from "axios";
import conf from "../conf/conf";


export interface SearchSuggestionParams {
  query: string;
  lat?: number;
  lon?: number;
}

export const getSearchSuggestions = async ({ query, lat, lon }: SearchSuggestionParams) => {
  try {
    const response = await axios.get(conf.searchSuggestionApi, {
      params: { q: query, lat, lon },
    });

    if (response.data?.success && response.data?.data?.data) {
      return response.data.data.data;
    }

    return [];
  } catch (error) {
    console.error("Search suggestion API error:", error);
    return [];
  }
};
