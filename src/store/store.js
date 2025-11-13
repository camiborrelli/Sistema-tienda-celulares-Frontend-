import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user.slice";
import phoneReducer from "../features/phone.slice";
import accesoryReducer from "../features/accesory.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    phone: phoneReducer,
    accesory: accesoryReducer,
  },
});
