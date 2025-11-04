import { configureStore } from '@reduxjs/toolkit'
import locationFetchReducer from "./features/locationFetchSlice";
import stationReducer from "./features/station-searchSlice";

export const store = configureStore({
    reducer: {
        locationFetch: locationFetchReducer,
        station: stationReducer,

    },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
