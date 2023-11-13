import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const VITE_API_BASE = import.meta.env.VITE_API_BASE;

// Setea el estado de usuario cuando hacen login o logout
export const modifyProfSlice = createSlice({
  name: "modifyProf",
  initialState: {
    modify: "",
    detailProf: {},
  },
  reducers: {
    modifyData: (state, action) => {
      state.user = action.payload;
    },
    getProfByID: (state, action) => {
      state.detailProf = action.payload;
    },
  },
});

export const { modifyData, getProfByID } = modifyProfSlice.actions;

export default modifyProfSlice.reducer;

// Hace el fetch del para el login del usuario
export const fetchModifyDataProf = (form, id) => {
  return async (dispatch) => {
    let endpoint = VITE_API_BASE + `/professional/${id}`;

    try {
      const { data } = await axios.patch(endpoint, form);
      console.log(data);
      dispatch(modifyData(data));
    } catch (error) {
      return { access: false };
    }
  };
};

export const fetchGetProfById = (id) => {
  return async (dispatch) => {
    const endpoint = VITE_API_BASE + `/professional/${id}`;
    try {
      const { data } = await axios.get(endpoint);
      console.log(data);
      dispatch(getProfByID(data));
    } catch (error) {
      console.log(error);
    }
  };
};
