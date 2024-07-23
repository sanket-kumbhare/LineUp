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
      const { accessToken, refreshToken, socialMediaTokens, loggedUser } =
        action.payload.data;
      state.authStatus = true;
      state.socialMediaTokens = socialMediaTokens;
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
