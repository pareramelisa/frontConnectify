import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
      const endpoint = "http://localhost:3001/client/register";
      try {
        const { data } = await axios.post(endpoint, userData);
        dispatch(registerUser(data));
      } catch (error) {
        console.log(error);
      }
    } else if (type === "professional") {
      const endpoint = "http://localhost:3001/professional/register";
      try {
        const { data } = await axios.post(endpoint, userData);
        dispatch(registerUser(data));
      } catch (error) {
        console.log(error);
      }
    }
  };
};

export const fetchUserDelete = (id, userData, type) => {
  return async (dispatch) => {
    if (type === "client") {
      const endpoint = `http://localhost:3001/client/${id}/delete`;
      try {
        const { data } = await axios.post(endpoint, userData);
        dispatch(registerUser(data));
      } catch (error) {
        console.log(error);
      }
    } else if (type === "professional") {
      const endpoint = `http://localhost:3001/client/${id}/delete`;
      try {
        const { data } = await axios.post(endpoint, userData);
        dispatch(registerUser(data));
      } catch (error) {
        console.log(error);
      }
    }
  };
};
