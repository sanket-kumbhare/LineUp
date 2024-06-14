import { createSlice } from "@reduxjs/toolkit";
import auth from "../../api/auth";

const initialState = {
  status: false,
  authUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLogin: (state, action) => {
      state.status = true;
      state.authUser = action.payload.authUser;
    },
    authLogout: (state) => {
      state.status = false;
      state.authUser = null;
    },
  },
});

export const { authLogin, authLogout } = authSlice.actions;

export default authSlice.reducer;
