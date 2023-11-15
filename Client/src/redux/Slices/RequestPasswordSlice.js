/* eslint-disable no-useless-catch */
import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../Utils/AxiosInstance';
const VITE_API_BASE = import.meta.env.VITE_API_BASE;
// const VITE_API_BASE = 'http://localhost:3001';

export const RequestPassword = createSlice({
  name: 'RequestPassword',
  initialState: {
    request: [],
  },
  reducers: {
    setRequest: (state, action) => {
      state.request = action.payload;
    },
  },
});

export const { setRequest } = RequestPassword.actions;

export default RequestPassword.reducer;

export const fetchRequest = (email, userType) => {
  return async (dispatch) => {
    try {
      let response;
      if (userType === 'client') {
        response = await axiosInstance.post(
          `${VITE_API_BASE}/recovery/client/request-recovery-password`,
          { email }
        );
        dispatch(setRequest(response));
      }
      if (userType === 'professional') {
        response = await axiosInstance.post(
          `${VITE_API_BASE}/recovery/professional/request-recovery-password`,
          { email }
        );
        dispatch(setRequest(response));
      }
      // Devuelve la respuesta si la solicitud fue exitosa
      return response;
    } catch (error) {
      throw (
        error.response?.data?.message || 'Error desconocido en la solicitud'
      );
    }
  };
};

export const resetRequest = ({ tokenRecovery, NewPassword, userType }) => {
  return async (dispatch) => {
    try {
      let response;
      if (userType === 'professional') {
        response = await axiosInstance.post(
          `${VITE_API_BASE}/recovery/professional/reset-password`,
          { tokenRecovery, NewPassword }
        );
        dispatch(setRequest(response));
      }
      if (userType === 'client') {
        response = await axiosInstance.post(
          `${VITE_API_BASE}/recovery/client/reset-password`,
          { tokenRecovery, NewPassword }
        );
        dispatch(setRequest(response));
      }
      // Devuelve la respuesta si la solicitud fue exitosa
      return response;
    } catch (error) {
      throw (
        error.response?.data?.message || 'Error desconocido en la solicitud'
      );
    }
  };
};
