import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.loggedIn = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.loggedIn = false;
    },
    updateUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload.user,
      };
    },
  },
});

export const { setUser, clearUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
