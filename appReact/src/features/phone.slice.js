import { createSlice } from "@reduxjs/toolkit";

export const getPhones = (state) => state.phone.phones;
export const selectPhoneError = (state) => state.phone.error;

const phoneSlice = createSlice({
  name: "phone",
  initialState: {
    phones: [],
    error: null,
  },
  reducers: {
    createPhone(state, action) {
      state.phones.push(action.payload);
    },
    listar(state, action) {
      state.phones = action.payload;
    },
  },
});

export const { createPhone, listar } = phoneSlice.actions;

export default phoneSlice.reducer;
