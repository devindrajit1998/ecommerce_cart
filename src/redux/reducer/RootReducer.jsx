import { combineReducers } from "@reduxjs/toolkit";
import cartSlice from "../slices/CartSlice";
import ProductSlice from "../slices/ProductSlice";

const RootReducer = combineReducers({
    ProductSlice: ProductSlice,
    cartSlice: cartSlice
});

export default RootReducer;