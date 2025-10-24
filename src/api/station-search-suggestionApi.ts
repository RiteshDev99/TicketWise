import axios from "axios";

export interface Station {
    stationName: string;
    stationCode: string;
}

const BASE_URL = "https://irctc-api.cemya.workers.dev";

export const getStationSuggestions = async (query: string) => {
    if (!query.trim()) return [];

    try {
        const response = await axios.get(`${BASE_URL}/station/suggestions`, {
            params: { q: query },
            headers: { Accept: "application/json" },
        });
        const stationsList = response.data?.response || [];
        
        const stations: Station[] = stationsList.map((item: any) => ({
            stationName: item.stationName,
            stationCode: item.stationCode,
        }));

        return stations;
    } catch (error) {
        console.error("Error fetching station suggestions:", error);
        return [];
    }
};
