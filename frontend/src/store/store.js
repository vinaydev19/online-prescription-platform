import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { set } from "date-fns";
import {
    persistStore, persistReducer,
    FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { apiSlice } from "./api/apiSlice";
import doctorReducer from "./slices/doctorSlice";
import patientReducer from "./slices/patientSlice";


const persistConfig = {
    key: 'HermanosOPP',
    version: 1,
    storage,
    whitelist: ['doctor', 'patient'],
};

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    doctor: doctorReducer,
    patient: patientReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    devTools: true,
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export default store;