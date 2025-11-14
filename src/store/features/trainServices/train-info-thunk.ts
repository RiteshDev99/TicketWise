import {createAsyncThunk} from "@reduxjs/toolkit";
import {getStationSuggestions, getTrainLists, Station, TrainListApiResponse, TrainListParams} from "./train-info-API";


export const fetchTrainList = createAsyncThunk<
    TrainListApiResponse | undefined,
    TrainListParams
>(
    "trainInfo/fetchTrainList",
    async (params, { rejectWithValue }) => {
        try {
            return await getTrainLists(params);
        } catch (error) {
            return rejectWithValue("Failed to fetch train list");
        }
    }
);


export const fetchStationSuggestions = createAsyncThunk<
    Station[],
    string
>(
    "trainInfo/fetchStationSuggestions",
    async (query, { rejectWithValue }) => {
        try {
            return await getStationSuggestions(query);
        } catch (error) {
            return rejectWithValue("Failed to fetch station suggestions");
        }
    }
);
