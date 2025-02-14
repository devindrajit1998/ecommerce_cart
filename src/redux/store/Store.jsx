import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "../reducer/RootReducer";

export const Store = configureStore({
    reducer: RootReducer,
});