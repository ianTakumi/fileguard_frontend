import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  session: null,
  loggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { session, user } = action.payload;

      // Structure the Supabase user data properly
      state.user = {
        id: user.id,
        email: user.email,
        first_name: user.user_metadata?.first_name || user.first_name || "",
        last_name: user.user_metadata?.last_name || user.last_name || "",
        role: user.user_metadata?.role || user.role || "",
        avatar: user.user_metadata?.avatar || null,
        phone_number: user.user_metadata?.phone_number || "",
      };

      state.session = session;
      state.loggedIn = true;
    },

    clearUser: (state) => {
      state.user = null;
      state.session = null;
      state.loggedIn = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
