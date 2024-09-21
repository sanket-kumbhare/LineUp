import { createSlice } from "@reduxjs/toolkit";

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
      const { accessToken, refreshToken, loggedUser, socialAccounts } =
        action.payload.data;
      state.authStatus = true;
      state.authUser = loggedUser;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.socialAccounts = socialAccounts;
    },
    authLogout: (state) => {
      state.authStatus = false;
      state.authUser = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.socialAccounts = null;
    },
  },
});

export const { authLogin, authLogout } = authSlice.actions;

export default authSlice.reducer;
