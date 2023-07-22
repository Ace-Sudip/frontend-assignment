"use client"
import { configureStore } from '@reduxjs/toolkit';
import productReducer from '@/features/product/productSlice'
import cartReducer, { cartTotal } from '@/features/cart/cartSlice'


const store = configureStore({
 
    reducer: {
     
        product: productReducer,
        cart: cartReducer,

    },
})

export default store