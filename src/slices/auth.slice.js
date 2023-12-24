import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("token");
const decodedToken = localStorage.getItem("decodedToken");

const initialState = {
  token: token ? JSON.parse(token) : null,
  decodedToken: decodedToken ? JSON.parse(decodedToken) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.token = action.payload.token;
      localStorage.setItem("token", JSON.stringify(action.payload.token));

      const decodedToken = jwtDecode(action.payload.token);
      state.decodedToken = decodedToken;
      localStorage.setItem("decodedToken", JSON.stringify(state.decodedToken));
    },

    clearCredentials(state) {
      state.token = null;
      localStorage.removeItem("token");

      state.decodedToken = null;
      localStorage.removeItem("decodedToken");
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
