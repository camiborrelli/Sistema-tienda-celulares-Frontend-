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
    verPlan: (state, action) => {
      state.usuario = action.payload;
    },
    cambiarPlan: (state, action) => {
      state.usuario = action.payload;
    },
    verPerfil: (state, action) => {
      state.usuario = action.payload;
    },
    setPerfil: (state, action) => {
      state.usuario = action.payload;
    },
  },
});

export const {
  loguear,
  desloguear,
  listarUsuarios,
  verPlan,
  cambiarPlan,
  verPerfil,
  setPerfil,
} = userSlice.actions;

export default userSlice.reducer;
