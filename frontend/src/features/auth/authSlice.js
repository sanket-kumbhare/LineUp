import { createSlice } from "@reduxjs/toolkit";
import auth from "../../api/auth";

const initialState = {
  authStatus: false,
  authUser: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLogin: (state, action) => {
      const { accessToken, refreshToken, loggedUser } = action.payload.data;
      console.log(action);
      state.authStatus = true;
      state.authUser = loggedUser;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    authLogout: (state) => {
      state.authStatus = false;
      state.authUser = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { authLogin, authLogout } = authSlice.actions;

export default authSlice.reducer;
