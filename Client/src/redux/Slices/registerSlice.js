import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const VITE_API_BASE = import.meta.env.VITE_API_BASE || 'localhost';

export const userRegisterSlice = createSlice({
  name: "usersRegister",
  initialState: {
    user: "",
  },
  reducers: {
    registerUser: (state, action) => {
      state.user = action.payload;
    },
    deleteUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { registerUser, deleteUser } = userRegisterSlice.actions;

export default userRegisterSlice.reducer;

export const fetchUserRegister = (userData, type) => {
  return async (dispatch) => {
    if (type === "client") {
      const endpoint = `${VITE_API_BASE}/client/register`;
      try {
        const { data } = await axios.post(endpoint, userData);
        dispatch(registerUser(data));
        console.log(data.message);
        return data.message;
      } catch (error) {
        console.log(error);
        return "Revise los datos ingresados";
      }
    } else if (type === "professional") {
      const endpoint = `${VITE_API_BASE}/professional/register`;

      try {
        const { data } = await axios.post(endpoint, userData);
        dispatch(registerUser(data));
        return data.message;
      } catch (error) {
        console.log(error);
        return "Revise los datos ingresados.";
      }
    }
  };
};

export const fetchUserDelete = (id, userData, type) => {
  return async (dispatch) => {
    if (type === "client") {
      const endpoint = `${VITE_API_BASE}/client/${id}/delete`;
      try {
        const { data } = await axios.post(endpoint, userData);
        dispatch(registerUser(data));
      } catch (error) {
        console.log(error);
      }
    } else if (type === "professional") {
      const endpoint = `${VITE_API_BASE}/professional/${id}/delete`;
      try {
        const { data } = await axios.post(endpoint, userData);
        dispatch(registerUser(data));
      } catch (error) {
        console.log(error);
      }
    }
  };
};
