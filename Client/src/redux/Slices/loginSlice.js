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
      endpoint = `https://connectifyback-dp-production.up.railway.app/client/login/?email=${form.email}&password=${form.password}`;
    }

    if (form.types === "professional") {
      endpoint = `https://connectifyback-dp-production.up.railway.app/professional/login/?email=${form.email}&password=${form.password}`;
    }

    if (form.types === "admin") {
      endpoint = `https://connectifyback-dp-production.up.railway.app/admin/login/?email=${form.email}&password=${form.password}`;
    }

    console.log(endpoint);
    console.log(form);
    try {
      const { data } = await axios.get(endpoint);
      console.log(data);
      if (data.name) {
        dispatch(loginUser(data));
        return { access: true };
      }
    } catch (error) {
      return { access: false };
    }
  };
};
