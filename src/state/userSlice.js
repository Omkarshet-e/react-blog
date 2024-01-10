import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  isUser: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LOGIN: (state, action) => {
      state.isUser = true;
      state.userData = action.payload.userData;
    },
    LOGOUT: (state) => {
      state.isUser = false;
      state.userData = null;
    },
  },
});

export const { LOGIN, LOGOUT } = userSlice.actions;
export default userSlice.reducer;
