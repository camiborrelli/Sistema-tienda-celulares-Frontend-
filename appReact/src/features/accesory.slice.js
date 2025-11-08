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
    deleteAccesorio(state, action) {
      const idToRemove = action.payload;
      state.accesories = state.accesories.filter((item) => {
        const id = item._id ?? item.id ?? item.nombre;
        return id !== idToRemove;
      });
    },
  },
});

export const { createAccesory, list, deleteAccesorio } = accesorySlice.actions;

export default accesorySlice.reducer;
