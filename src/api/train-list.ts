import axios from "axios";

export interface TrainListPrams {
    fromStn: string;
    toStn: string;
}

const BASE_URL = "https://irctc-api.cemya.workers.dev";

export const TrainList = async ({fromStn, toStn}:TrainListPrams) => {

    try {
        const response = await axios.get(`${BASE_URL}/station/train-list`, {
            params: {
                fromStn:fromStn,
                 toStn:toStn
            },
            headers: { Accept: "application/json" },
        });
        const TrainList = response.data;
        console.log('TrainList api response',TrainList);

        return TrainList;
    } catch (error) {
        console.error("Error fetching station suggestions:", error);
        return [];
    }
};
