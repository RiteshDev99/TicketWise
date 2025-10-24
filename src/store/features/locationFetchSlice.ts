import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fetchFromLocation: null,
    fetchFromLocationCode: null,
    fetchToLocation: null,
    fetchToLocationCode: null,
};

const locationFetchSlice = createSlice({
    name: "locationFetch",
    initialState,
    reducers: {
        setFromLocation: (state, action) => {
            state.fetchFromLocation = action.payload.name;
            state.fetchFromLocationCode = action.payload.code;
        },
        setToLocation: (state, action) => {
            state. fetchToLocation = action.payload.name;
            state.fetchToLocationCode = action.payload.code;
        },
        resetLocations: (state) => {
            state.fetchFromLocation = null;
            state.fetchFromLocation = null;
        }
    },
});

export const { setFromLocation, setToLocation, resetLocations } = locationFetchSlice.actions;

export default locationFetchSlice.reducer;