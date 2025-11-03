import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userRecuder";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
