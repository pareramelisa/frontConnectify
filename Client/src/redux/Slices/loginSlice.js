import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const VITE_API_BASE = import.meta.env.VITE_API_BASE;

// Setea el estado de usuario cuando hacen login o logout
export const userLoginSlice = createSlice({
  name: "usersLogin",
  initialState: {
    user: [],
  },
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = {};
    },
  },
});

export const { loginUser, logoutUser } = userLoginSlice.actions;

export default userLoginSlice.reducer;

// Hace el fetch del para el login del usuario
export const fetchUserLogin = (form) => {
  return async (dispatch) => {
    let endpoint = "";

    if (form.types === "client") {
      endpoint = VITE_API_BASE + `/client/login/`;
    } else if (form.types === "professional") {
      endpoint = VITE_API_BASE + `/professional/login/`;
    }

    console.log(endpoint);

    try {
      const { data } = await axios.post(endpoint, form);
      console.log(data);
      if (data.userName) {
        dispatch(loginUser(data));
        return { access: true };
      }
    } catch (error) {
      return { access: false };
    }
  };
};
