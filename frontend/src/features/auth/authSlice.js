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
      state.authUser = loggedUser;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.socialMediaTokens = socialMediaTokens;
    },
    authLogout: (state) => {
      state.authStatus = false;
      state.authUser = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.socialMediaTokens = null;
    },
  },
});

export const { authLogin, authLogout } = authSlice.actions;

export default authSlice.reducer;
