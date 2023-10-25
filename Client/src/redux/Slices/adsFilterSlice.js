import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  adsFiltered: [],
  error: null,
};

const adsFilteredSlice = createSlice({
  name: 'adsFiltered',
  initialState,
  reducers: {
    setAdsFiltered: (state, action) => {
      state.adsFiltered = action.payload;
      state.error = null; //
    },
    getAllProfessionals: (state, action) => {
        state.professionals = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setAdsFiltered, setError } = adsFilteredSlice.actions;

export const fetchAdsByCreatorId = (creatorId) => async (dispatch) => {
  try {
    const response = await axios.get('https://connectifyback-dp-production.up.railway.app/ads');
    if (response.status === 200) {
      const data = response.data;
      const adsFiltered = data.filter((ad) => ad.creator[0] === creatorId);
      dispatch(setAdsFiltered(adsFiltered));
    } else {
      dispatch(setError('Error al obtener anuncios.'));
    }
  } catch (error) {
    dispatch(setError('Error de red: No se pudo obtener los anuncios.'));
  }
};

export const selectAdsByCreatorId = (state) => state.adsFiltered.adsFiltered;
export const selectError = (state) => state.adsFiltered.error;

export default adsFilteredSlice.reducer;

