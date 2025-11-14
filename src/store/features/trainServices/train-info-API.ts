import axios from "axios";

export interface TrainListParams {
    from: string;
    to: string;
    date: string;
}

export interface Train {
    avlClassesSorted: string[];
    availabilityCache?: Record<string, any>;
    availabilityCacheTatkal?: Record<string, any>;
    arrivalTime: string;
    trainName: string;
    fromStnCode: string;
    toStnCode: string;
    fromStnName: string;
    toStnName: string;
    trainNumber: string;
    trainType: string;
    duration: string;
    departureTime: string;
    distance: number;
    fromCityName: string;
    toCityName: string;
}

export interface TrainListApiResponse {
    trainList: Train[];
}

export interface Station {
    stationName: string;
    stationCode: string;
}


const IRCTC_BASE_URL = "https://irctc-api.maya-cloud.workers.dev";
const STATION_SEARCH_URL = "https://api.disha.corover.ai/dishaAPI/bot/searchStation";


export const getTrainLists = async (
    params: TrainListParams
): Promise<TrainListApiResponse | undefined> => {
    try {
        const response = await axios.get(`${IRCTC_BASE_URL}/train/search`, {
            params,
            headers: { Accept: "application/json" },
        });

        return response.data?.response?.data as TrainListApiResponse;
    } catch (error: any) {
        console.error("Error fetching train list:", error);
        return undefined;
    }
};



export const getStationSuggestions = async (
    query: string
): Promise<Station[]> => {
    try {
        const response = await axios.get(`${STATION_SEARCH_URL}/${query}`);

        const stationList = (response.data || []).map((s: any) => ({
            stationName: s.name,
            stationCode: s.code,
        }));

        return stationList;
    } catch (error) {
        console.error("Error fetching station suggestions:", error);
        return [];
    }
};
