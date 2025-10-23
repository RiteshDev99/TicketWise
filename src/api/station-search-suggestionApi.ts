import axios from "axios";


export interface Station {
  stationName: string;
  stationCode: string;
}


const BASE_URL = "https://irctc-api.cemya.workers.dev";

export const getStationSuggestions = async (query: string): Promise<Station[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/station/suggestions`, {
      params: { q: query },
        headers: { Accept: "application/json" },
    });
      console.log("Station suggestions response:", response.data);
       return response.data;
  } catch (error) {
    console.error("Error fetching station suggestions:", error);
    throw error;
  }
};





