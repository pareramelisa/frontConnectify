import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL = `https://connectifyback-dp-production.up.railway.app`;
// const URL = `http://localhost:3001`;

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
      const endpoint = URL + `/client/register`;
      try {
        const { data } = await axios.post(endpoint, userData);
        dispatch(registerUser(data));
        console.log(data.message);
        return data.message;
      } catch (error) {
        console.log(error);
        return "Revice los datos ingresados";
      }
    } else if (type === "professional") {
      const endpoint = URL + `/professional/register`;

      try {
        const { data } = await axios.post(endpoint, userData);
        dispatch(registerUser(data));
        return data.message;
      } catch (error) {
        console.log(error);
        return "Revice los datos ingresados.";
      }
    }
  };
};

export const fetchUserDelete = (id, userData, type) => {
  return async (dispatch) => {
    if (type === "client") {
      const endpoint = URL + `/client/${id}/delete`;
      try {
        const { data } = await axios.post(endpoint, userData);
        dispatch(registerUser(data));
      } catch (error) {
        console.log(error);
      }
    } else if (type === "professional") {
      const endpoint = URL + `/professional/${id}/delete`;
      try {
        const { data } = await axios.post(endpoint, userData);
        dispatch(registerUser(data));
      } catch (error) {
        console.log(error);
      }
    }
  };
};
