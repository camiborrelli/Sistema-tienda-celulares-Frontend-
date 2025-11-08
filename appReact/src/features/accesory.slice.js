import { createSlice } from "@reduxjs/toolkit";

export const getAccesories = (state) => state.accesory.accesories;
export const getCurrentAccesory = (state) => state.accesory.current ?? null;

const accesorySlice = createSlice({
  name: "accesory",
  initialState: {
    accesories: [],
    current: null,
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
    updateAccesory(state, action) {
      const idToUpdate = action.payload.id ?? action.payload._id;
      const index = state.accesories.findIndex((item) => (item.id ?? item._id) === idToUpdate);
      if (index !== -1) {
        state.accesories[index] = action.payload;
      }
    },
    setCurrent(state, action) {
      state.current = action.payload ?? null;
    },
  },
});

export const { createAccesory, list, deleteAccesorio, updateAccesory, setCurrent } =
  accesorySlice.actions;

export default accesorySlice.reducer;
