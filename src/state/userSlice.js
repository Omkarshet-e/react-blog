import { createSlice } from "@reduxjs/toolkit";

function getUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return { userData: user, isUser: true };
  } else {
    return { userData: null, isUser: false };
  }
}
const initialState = getUser();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LOGIN: (state, action) => {
      state.isUser = true;
      state.userData = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    LOGOUT: (state) => {
      state.isUser = false;
      state.userData = null;
      localStorage.removeItem("user");
    },
  },
});

export const { LOGIN, LOGOUT } = userSlice.actions;
export default userSlice.reducer;
