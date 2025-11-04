import { Station } from "@/src/api/station-searchApi";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface StationState {
    stations: Station[];
    loading: boolean;
    error: string | null;
}

const initialState: StationState = {
    stations: [],
    loading: false,
    error: null,
};

const stationSlice = createSlice({
    name: 'station',
    initialState,
    reducers: {
        setStations: (state, action: PayloadAction<Station[]>) => {
            state.stations = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        clearStations: (state) => {
            state.stations = [];
        },
    },
});

export const { setStations, setLoading, setError, clearStations } = stationSlice.actions;
export default stationSlice.reducer;
