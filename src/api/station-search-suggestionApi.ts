import axios from "axios";

export interface Station {
    stationName: string;
    stationCode: string;
}


export const getStationSuggestions = async (query: string): Promise<Station[] | undefined> => {
    try {
        const url = `https://api.disha.corover.ai/dishaAPI/bot/searchStation/${query}`;
        
        const response = await axios.get(url);
        
        const data = response.data;
        
        const stationList: Station[] = data.map((s:any) => ({
            stationName: s.name,
            stationCode: s.code,
        }));

        console.log("Station List:", stationList);
        
        return stationList

    } catch (error) {
        console.error("Error fetching station suggestions:", error);
    }
};
