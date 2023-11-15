import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../Utils/AxiosInstance';
const VITE_API_BASE = import.meta.env.VITE_API_BASE || 'localhost';
console.log(VITE_API_BASE);

// const URL = `http://localhost:3001`;
const URL = VITE_API_BASE;
console.log(URL);

export const professionalSlice = createSlice({
  name: 'professionalSlice',
  initialState: {
    professionals: [],
    detail: {},
    deleted: {},
  },
  reducers: {
    getAllProfessionals: (state, action) => {
      state.professionals = action.payload;
    },
    getProfessionalByID: (state, action) => {
      state.detail = action.payload;
    },
    deleteProfessional: (state, action) => {
      state.deleted = action.payload;
    },
  },
});

export const { getAllProfessionals, getProfessionalByID, deleteProfessional } =
  professionalSlice.actions;

export default professionalSlice.reducer;

export const fetchProfsForAdmin = () => {
  return async (dispatch) => {
    const endpoint = URL + `/professional/`;
    try {
      const response = await axiosInstance.get(endpoint);
      console.log(response.data);
      const professionals = response.data;
      dispatch(getAllProfessionals(professionals));
      return professionals;
    } catch (error) {
      console.log(error);
      return 'No hay profesionales disponibles';
    }
  };
};
export const deleteProfByIdAdmin = (id) => {
  return async (dispatch) => {
    const endpoint = URL + `/professional/${id}/delete`;
    try {
      const deleted = await axiosInstance.patch(endpoint, id);

      dispatch(deleteProfessional(deleted));
      return deleted;
    } catch (error) {
      console.log(error);
      return 'No se pudo eliminar dicho profesional';
    }
  };
};
