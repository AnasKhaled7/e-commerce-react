import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  userInfo: localStorage.getItem("token")
    ? jwtDecode(JSON.parse(localStorage.getItem("token")))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.token = action.payload.token;
      localStorage.setItem("token", JSON.stringify(action.payload.token));

      const userInfo = jwtDecode(action.payload.token);
      state.userInfo = userInfo;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    },

    clearCredentials(state) {
      state.token = null;
      localStorage.removeItem("token");

      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
