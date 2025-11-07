import { createSlice } from "@reduxjs/toolkit";

export const getAccesories = (state) => state.accesory.accesories;

const accesorySlice = createSlice({
  name: "accesory",
  initialState: {
    accesories: [],
  },
  reducers: {
    createAccesory(state, action) {
      state.accesories.push(action.payload);
    },
    list(state, action) {
      state.accesories = action.payload;
    },
  },
});

export const { createAccesory, list } = accesorySlice.actions;

export default accesorySlice.reducer;
