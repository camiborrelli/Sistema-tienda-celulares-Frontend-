import { createSlice } from "@reduxjs/toolkit";

export const selectPhones = (state) => state.phone.items;
export const selectPhoneError = (state) => state.phone.error;

const phoneSlice = createSlice({
  name: "phone",
  initialState: {
    items: [],
    error: null,
  },
  reducers: {
    // add created phone to the start of the list
    createPhone(state, action) {
      state.items.unshift(action.payload);
    },
    // replace list with payload
    listar(state, action) {
      state.items = action.payload;
    },
  },
});

export const { createPhone, listar } = phoneSlice.actions;

export default phoneSlice.reducer;
