import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const VITE_API_BASE = import.meta.env.VITE_API_BASE || "localhost";

// Setea el estado de usuario cuando hacen login o logout
export const loginWithGoogleSlice = createSlice({
  name: "googleLogin",
  initialState: {
    user: {},
  },
  reducers: {
    loginWithGoogle: (state, action) => {
      state.user = action.payload;
    },
    logoutGoogle: (state) => {
      state.user = {};
    },
  },
});

export const { loginWithGoogle, logoutGoogle } = loginWithGoogleSlice.actions;

export default loginWithGoogleSlice.reducer;

// Hace el fetch del para el login del usuario de Google
export const fetchUserLoginWithGoogle = (form) => {
  return async (dispatch) => {
    let endpoint = VITE_API_BASE + `/client/googlelogin`;

    try {
      const { data } = await axios.post(endpoint, form);
      dispatch(loginWithGoogle(data));
    } catch (error) {
      console.log(error);
    }
  };
};
