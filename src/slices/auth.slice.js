import { createSlice } from "@reduxjs/toolkit";

const tokenFromStorage = localStorage.getItem("token");
const userInfoFromStorage = localStorage.getItem("userInfo");

const initialState = {
  token: tokenFromStorage ? JSON.parse(tokenFromStorage) : null,
  userInfo: userInfoFromStorage ? JSON.parse(userInfoFromStorage) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.token = action.payload.token;
      localStorage.setItem("token", JSON.stringify(action.payload.token));

      state.userInfo = action.payload.user;
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },

    clearCredentials(state) {
      state.token = null;
      localStorage.removeItem("token");

      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },

    updateUserInfo(state, action) {
      state.userInfo = action.payload.user;
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
  },
});

export const { setCredentials, clearCredentials, updateUserInfo } =
  authSlice.actions;

export default authSlice.reducer;
