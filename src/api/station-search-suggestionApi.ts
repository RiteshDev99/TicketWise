import axios from "axios";

const BASE_URL = "https://irctc-api.cemya.workers.dev";

export interface Station {
  stationName: string;
  stationCode: string;
}


export const getStationSuggestions = async (query: string): Promise<Station[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/station/suggestions`, {
      params: { q: query },
    });

       console.log("Station suggestions response:", response.data);
       return response.data;

  } catch (error) {
    console.error("Error fetching station suggestions:", error);
    throw error;
  }
};





