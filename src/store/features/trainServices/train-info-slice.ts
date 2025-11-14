import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    fetchTrainList,
    fetchStationSuggestions
} from "./train-info-thunk";
import {
    Station,
    TrainListApiResponse
} from "./train-info-API";

interface TrainInfoState {
    trainList: TrainListApiResponse | null;
    stations: Station[];
    loading: boolean;
    error: string | null;
}

const initialState: TrainInfoState = {
    trainList: null,
    stations: [],
    loading: false,
    error: null,
};

const trainInfoSlice = createSlice({
    name: "trainInfo",
    initialState,
    reducers: {
        clearTrainList(state) {
            state.trainList = null;
        },
        clearStations(state) {
            state.stations = [];
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchTrainList.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchTrainList.fulfilled, (state, action) => {
            state.loading = false;
            state.trainList = action.payload || null;
        });
        builder.addCase(fetchTrainList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to load train list";
        });

        builder.addCase(fetchStationSuggestions.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchStationSuggestions.fulfilled, (state, action) => {
            state.loading = false;
            state.stations = action.payload || [];
        });
        builder.addCase(fetchStationSuggestions.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to load stations";
        });
    },
});

export const { clearTrainList, clearStations } = trainInfoSlice.actions;
export default trainInfoSlice.reducer;
