"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const remainingItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.cartItems = remainingItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      alert(`${action.payload.name}remove Successfully `);
    },

    decreaseCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        state.cartItems = nextCartItems;
        alert(`${action.payload.name}remove Successfully `);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state, action) => {
      if (state.cartItems.length === 0) {
        alert("cart is already empty");
      } else {
        state.cartItems = [];
        alert("Carts Cleared Successfully");
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    cartTotal: (state, action) => {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, decreaseCart, clearCart, cartTotal } =
  cartSlice.actions;
