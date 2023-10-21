import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
      state.user = [];
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
      endpoint = `http://localhost:3001/client/login/?email=${form.email}&password=${form.password}`;
    } else if (form.types === "professional") {
      endpoint = `http://localhost:3001/professional/login/?email=${form.email}&password=${form.password}`;
    } else if (form.types === "admin") {
      endpoint = `http://localhost:3001/admin/login/?email=${form.email}&password=${form.password}`;
    }

    try {
      const { data } = await axios.get(endpoint);
      dispatch(loginUser(data));
    } catch (error) {
      console.log(error);
    }
  };
};
