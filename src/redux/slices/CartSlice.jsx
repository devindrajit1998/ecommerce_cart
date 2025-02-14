import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    cartItems: [],
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const currentProduct = action.payload;
            const itemExists = state.cartItems?.find(item => item.id === currentProduct.id);
            if (itemExists) {
                state.cartItems = state.cartItems?.map((item) => item.id === currentProduct.id ? { ...item, quantity: item.quantity + 1 } : item);
                localStorage.setItem('cart', JSON.stringify(state.cartItems));
            } else {
                state.cartItems.push({ ...currentProduct, quantity: 1 });
                localStorage.setItem('cart', JSON.stringify(state.cartItems));
            }
        },
        increment: (state, action) => {
            const currentId = action.payload;
            const existingProduct = state.cartItems.find(item => item.id === currentId);
            if (existingProduct) {
                existingProduct.quantity += 1;
                localStorage.setItem('cart', JSON.stringify(state.cartItems));
            }
        },
        decrement: (state, action) => {
            const currentId = action.payload;
            const existingProduct = state.cartItems.find(item => item.id === currentId);
            if (existingProduct) {
                existingProduct.quantity -= 1;
                localStorage.setItem('cart', JSON.stringify(state.cartItems));
            }
        },
        removeSingle: (state, action) => {
            const currentId = action.payload;
            state.cartItems = state.cartItems.filter(item => item.id !== currentId);
            localStorage.setItem('cart', JSON.stringify(state.cartItems));
        },
        updateCart:(state, action) => {
            state.cartItems = action.payload;
            // localStorage.setItem('cart', JSON.stringify(state.cartItems));
        }
    },
});


export const { addToCart, increment, decrement, removeSingle, updateCart } = cartSlice.actions;
export default cartSlice.reducer;