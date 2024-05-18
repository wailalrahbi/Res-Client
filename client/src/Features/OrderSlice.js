import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const completeOrder = createAsyncThunk(
  "orders/completeOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://fsproject-server.onrender.com/completeOrder",
        {
          orderId,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://fsproject-server.onrender.com/getOrders"
      );
      return response.data.orders;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCompletedOrders = createAsyncThunk(
  "orders/fetchCompletedOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://fsproject-server.onrender.com/getCompletedOrders"
      );
      return response.data.orders;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  orders: [],
  completedOrders: [],
  status: "idle",
  completedStatus: "idle",
  error: null,
  completedError: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchCompletedOrders.pending, (state) => {
        state.completedStatus = "loading";
      })
      .addCase(fetchCompletedOrders.fulfilled, (state, action) => {
        state.completedStatus = "succeeded";
        state.completedOrders = action.payload;
      })
      .addCase(fetchCompletedOrders.rejected, (state, action) => {
        state.completedStatus = "failed";
        state.completedError = action.payload;
      })
      .addCase(completeOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(completeOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = state.orders.filter(
          (order) => order._id !== action.meta.arg
        );
      })
      .addCase(completeOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default ordersSlice.reducer;
