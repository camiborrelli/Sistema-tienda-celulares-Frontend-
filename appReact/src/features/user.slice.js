import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usuario: null,
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
  },
});

export const { loguear, desloguear } = userSlice.actions;

export default userSlice.reducer;
