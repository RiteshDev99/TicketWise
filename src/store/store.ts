import { configureStore } from '@reduxjs/toolkit'
import locationFetchReducer from "./features/locationFetchSlice";

export const store = configureStore({
    reducer: {
        locationFetch: locationFetchReducer,

    },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
