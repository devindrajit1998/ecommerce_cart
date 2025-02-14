import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    loading: false,
    products: [],
    error: null,
}

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
    try {
        const response = await axios.get("https://fakestoreapi.com/products");
        return response.data;
    } catch (error) {
        throw error;
    }
})


export const ProductSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.error = null;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.products = [];
            })
    }
})



export default ProductSlice.reducer;