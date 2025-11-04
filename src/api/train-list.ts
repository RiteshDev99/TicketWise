import axios from "axios";

export interface TrainListPrams {
    from: string;
    to: string;
    date:string;
}

export interface Trains {
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
    trainList: Trains[];
}

const BASE_URL = "https://irctc-api.maya-cloud.workers.dev";

export const TrainLists = async ({ from, to, date }: TrainListPrams): Promise<TrainListApiResponse | undefined> => {
    try {
        const response = await axios.get(`${BASE_URL}/train/search`, {
            params: { from, to, date },
            headers: { Accept: "application/json" },
        });
        const data: TrainListApiResponse = response.data?.response?.data;
        return data; 
    } catch (error: any) {
        console.error("Error fetching train list:", error);
        return error.response?.error;
    }
};


