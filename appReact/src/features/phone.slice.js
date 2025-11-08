import { createSlice } from "@reduxjs/toolkit";

export const getPhones = (state) => state.phone.phones;
export const selectPhoneError = (state) => state.phone.error;
export const getCurrentCelular = (state) => state.phone.current;

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
    deletePhone(state, action) {
      state.phones = state.phones.filter(
        (phone) => phone._id !== action.payload
      );
    },
    updatePhone(state, action) {
      const index = state.phones.findIndex(
        (phone) => phone._id === action.payload._id
      );
      if (index !== -1) {
        state.phones[index] = action.payload;
      }
    },
    setCurrent(state, action) {
      state.current = action.payload ?? null;
    },
  },
});

export const { createPhone, listar, deletePhone, updatePhone, setCurrent } =
  phoneSlice.actions;

export default phoneSlice.reducer;
