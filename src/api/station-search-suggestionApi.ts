import axios from "axios";

export interface Station {
    stationName: string;
    stationCode: string;
}

export interface GetStationSuggestionsResponse {
    stationList: Station[];
    popularStationList: Station[];
}

const BASE_URL = "https://irctc-api.cemya.workers.dev";

export const getStationSuggestions = async (query: string): Promise<GetStationSuggestionsResponse> => {
    try {
        const response = await axios.get(`${BASE_URL}/station/suggestions`, {
            params: { q: query },
            headers: { Accept: "application/json" },
        });

        const data = response.data?.response?.data || {};

        const stationList: Station[] = (data.stationList || []).map((s: Station) => ({
            stationName: s.stationName,
            stationCode: s.stationCode,
        }));

        const popularStationList: Station[] = (data.popularStationList || []).map((s: Station) => ({
            stationName: s.stationName,
            stationCode: s.stationCode,
        }));

        return { stationList, popularStationList };

    } catch (error) {
        console.error("Error fetching station suggestions:", error);
        return { stationList: [], popularStationList: [] };
    }
};
