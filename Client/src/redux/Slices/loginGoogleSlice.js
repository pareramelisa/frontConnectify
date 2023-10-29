import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
  },
});

export const { loginWithGoogle } = loginWithGoogleSlice.actions;

export default loginWithGoogleSlice.reducer;

// Hace el fetch del para el login del usuario
export const fetchUserLoginWithGoogle = (form) => {
  return async (dispatch) => {
    let endpoint = "https://connectifyback-dp-production.up.railway.app/client/googlelogin";

    try {
      const { data } = await axios.post(endpoint, form);
      dispatch(loginUser(data));
    } catch (error) {
      console.log(error);
    }
  };
};
