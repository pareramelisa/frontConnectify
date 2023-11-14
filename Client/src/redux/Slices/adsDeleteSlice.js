import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../Utils/AxiosInstance';

const VITE_API_BASE = import.meta.env.VITE_API_BASE || 'localhost';

// Action para deshabilitar un anuncio
export const deleteAd = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'DISABLE_AD_START' });

      const response = await axiosInstance.patch(
        `${VITE_API_BASE}/ads/${id}/delete`
      );

      dispatch({
        type: 'DISABLE_AD_SUCCESS',
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: 'DISABLE_AD_FAILURE',
        payload: error.message,
      });
    }
  };
};

// Reducer para manejar el estado
const initialState = {
  adsDelete: [],
  loading: false,
  error: null,
};

const adsDeleteSlice = createSlice({
  name: 'adsDelete',
  initialState,
  reducers: {
    disableAdStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    disableAdSuccess: (state, action) => {
      state.loading = false;
      const updatedAds = state.adsDelete.map((ad) => {
        if (ad._id === action.payload._id) {
          return {
            ...ad,
            isDeleted: true,
          };
        }
        return ad;
      });
      state.adsDelete = updatedAds;
    },
    disableAdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { disableAdStart, disableAdSuccess, disableAdFailure } =
  adsDeleteSlice.actions;
export default adsDeleteSlice.reducer;
