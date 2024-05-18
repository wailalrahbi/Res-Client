import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  status: "idle",
  error: null,
};

export const submitOrder = createAsyncThunk(
  "cart/submitOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://fsproject-server.onrender.com/submitOrder",
        orderData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      console.log("Reducer: addItemToCart", action.payload); // Debug!!!
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i._id === item._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
    },
    incrementItemQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.cartItems.find((i) => i._id === itemId);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementItemQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.cartItems.find((i) => i._id === itemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter((i) => i._id !== itemId);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitOrder.fulfilled, (state) => {
        state.status = "succeeded";
        state.cartItems = [];
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  addItemToCart,
  incrementItemQuantity,
  decrementItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
