import axios from "axios";

export interface TrainListPrams {
    fromStn: string;
    toStn: string;
}


export interface TrainListApiResponse {
    quotaList: string[];
    trainList: string[];
}

const BASE_URL = "https://irctc-api.cemya.workers.dev";


export const TrainLists = async ({ fromStn, toStn }: TrainListPrams) => {
    try {
        const response = await axios.get(`${BASE_URL}/station/train-list`, {
            params: { fromStn, toStn },
            headers: { Accept: "application/json" },
        });
        
        const data: TrainListApiResponse = response.data?.response?.data;
        console.log("Train List:", data.trainList)

        return data; 
    } catch (error) {
        console.error("Error fetching train list:", error);
        return { quotaList: [], trainList: [] };
    }
};
