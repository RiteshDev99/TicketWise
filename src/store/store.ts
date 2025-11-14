import { configureStore } from '@reduxjs/toolkit'
import locationFetchReducer from "./features/locationFetchSlice";
import trainInfoReducer from "./features/trainServices/train-info-slice";

export const store = configureStore({
    reducer: {
        locationFetch: locationFetchReducer,
        trainInfo: trainInfoReducer,

    },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
