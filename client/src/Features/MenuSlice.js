import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getItems = createAsyncThunk("items/getItems", async (_id) => {
  try {
    const response = await axios.get(
      "https://res-server-05da.onrender.com/getItems"
    );
    return response.data.items;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
});

export const addItems = createAsyncThunk("items/addItems", async (itemData) => {
  try {
    console.log(itemData);
    const response = await axios.post(
      "https://res-server-05da.onrender.com/addItems",
      {
        name: itemData.name,
        price: itemData.price,
        pic: itemData.pic,
      }
    );

    const items = response.data.items;
    return items;
  } catch (error) {
    console.log(error);
  }
});

export const updateItems = createAsyncThunk(
  "items/updateItems",
  async (priceData) => {
    try {
      const response = await axios.post(
        "https://res-server-05da.onrender.com/updateItems",
        {
          name: priceData.name,
          price: priceData.price,
          pid: priceData.pid,
        }
      );

      const items = response.data.items;
      return items;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteItems = createAsyncThunk(
  "items/deleteItems",
  async (postid) => {
    try {
      await axios.delete(
        `https://res-server-05da.onrender.com/deleteItems/${postid}`
      );
      return postid;
    } catch (error) {
      console.log(error);
    }
  }
);

const initVal = {
  items: [],
  status: "idle",
  error: null,
  isSuccess: false,
  isError: false,
  isLoading: false,
};

const ItemsSlice = createSlice({
  name: "items",
  initialState: initVal,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.status = "Sucess";
        state.items = action.payload;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.status = "Rejected";
        state.error = action.error.message;
      })

      .addCase(addItems.pending, (state) => {
        // state.isLoading = true;
        state.status = "Loading";
      })
      .addCase(addItems.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.status = "Sucess";
        state.items.unshift(action.payload);
      })
      .addCase(addItems.rejected, (state, action) => {
        // state.isLoading = false;
        // state.isError = true;
        state.status = "Rejected";
        state.error = action.error.message;
      })

      .addCase(updateItems.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(updateItems.fulfilled, (state, action) => {
        state.status = "Sucess";
        const updatedItemIndex = state.items.findIndex(
          (items) => items._id === action.payload._id
        );
        console.log(action.payload);

        if (updatedItemIndex !== -1) {
          // state.items[updatedItemIndex] = action.payload;
          state.items[updatedItemIndex].price = action.payload.price;
          // state.items[updatedItemIndex].name = action.payload.name;
        }
      })
      .addCase(updateItems.rejected, (state, action) => {
        state.status = "Rejected";
        state.error = action.error.message;
      })

      .addCase(deleteItems.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(deleteItems.fulfilled, (state, action) => {
        state.status = "Sucess";
        state.items = state.items.filter(
          (items) => items._id !== action.payload
        );
      })
      .addCase(deleteItems.rejected, (state, action) => {
        state.status = "Rejected";
        state.error = action.error.message;
      });
  },
});

export default ItemsSlice.reducer;
