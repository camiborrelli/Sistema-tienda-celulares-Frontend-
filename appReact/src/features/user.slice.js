import { createSlice } from "@reduxjs/toolkit";
export const getUsers = (state) => state.user.usuarios ?? [];

const initialState = {
  usuario: null,
  usuarios: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loguear: (state, action) => {
      state.usuario = action.payload;
      localStorage.setItem("Token", action.payload);
    },
    desloguear: (state) => {
      state.usuario = null;
      localStorage.clear();
    },
    listarUsuarios: (state, action) => {
      state.usuarios = action.payload;
    },
  },
});

export const { loguear, desloguear, listarUsuarios } = userSlice.actions;

export default userSlice.reducer;
