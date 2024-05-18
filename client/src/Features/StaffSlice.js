import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("staffs/login", async (userData) => {
  try {
    const response = await axios.post(
      "https://fsproject-server.onrender.com/login",
      {
        remail: userData.email,
        rpassword: userData.pass,
      }
    );
    console.log(response);
    return response.data.User;
  } catch (error) {
    alert("Invalid Credentials...");
  }
});

export const registerUser = createAsyncThunk(
  "staffs/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://fsproject-server.onrender.com/registerUser",
        userData
      );
      return response.data.staffs;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue("Registration failed");
    }
  }
);

const initVal = {
  staff: {},
  isSuccess: false,
  isError: false,
  isLoading: false,
};

export const StaffSlice = createSlice({
  name: "staffs",
  initialState: initVal,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.staff = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export default StaffSlice.reducer;
