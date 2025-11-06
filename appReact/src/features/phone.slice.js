import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../data/api";

export const selectPhones = (state) => state.phone.items;
export const selectPhoneError = (state) => state.phone.error;
export const selectPhoneStatus = (state) => state.phone.status;

// Async thunk to fetch phones from the API
export const fetchPhones = createAsyncThunk(
  "phone/fetchPhones",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/celulares");
      return response.data;
    } catch (err) {
      // normalize error
      const message =
        err?.response?.data?.message || err.message || "Error fetching phones";
      return rejectWithValue(message);
    }
  }
);

const phoneSlice = createSlice({
  name: "phone",
  initialState: {
    items: [],
    error: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  },
  reducers: {
    createPhone(state, action) {
      state.items.unshift(action.payload);
    },
    listar(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhones.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPhones.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPhones.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { createPhone, listar } = phoneSlice.actions;

export default phoneSlice.reducer;
