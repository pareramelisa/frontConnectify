import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const VITE_API_BASE = import.meta.env.VITE_API_BASE || 'localhost';

// Define una función asincrónica para cargar los anuncios
export const fetchAds = createAsyncThunk('ads/fetchAds', async () => {
  const endpoint = `${VITE_API_BASE}/ads`;
  const response = await axios.get(endpoint);
  return response.data;
  //eliminado el tryCatch debido a que el createAsyncThunk ya maneja los errores.
});

const adsSlice = createSlice({
  name: 'ads',
  initialState: {
    ads: [],
    deleted: {},
    adsFiltered: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    applyFilters: (state, action) => {
      // Aquí actualizas el estado adsFiltered con los filtros aplicados
      state.adsFiltered = action.payload;
    },
    getAllAds: (state, action) => {
      state.ads = action.payload;
    },
    deleteAd: (state, action) => {
      state.deleted = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAds.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ads = action.payload;
        state.adsFiltered = action.payload;
      })
      .addCase(fetchAds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAds = (state) => state.ads.ads;
export const { applyFilters, getAllAds, deleteAd } = adsSlice.actions;
export default adsSlice.reducer;

export const fetchAdsForAdmin = () => {
  return async (dispatch) => {
    const endpoint = `${VITE_API_BASE}/ads`;
    try {
      const response = await axios.get(endpoint);
      console.log(response.data);
      const ads = response.data;
      dispatch(getAllAds(ads));
      return ads;
    } catch (error) {
      console.log(error);
      return 'No hay avisos disponibles';
    }
  };
};
export const deleteAdByIdAdmin = (id) => {
  return async (dispatch) => {
    const endpoint = `${VITE_API_BASE}/ads/${id}/delete`;
    try {
      const deleted = await axios.patch(endpoint, id);

      dispatch(deleteAd(deleted));
    } catch (error) {
      console.log(error);
      return 'No se pudo eliminar dicho anuncio';
    }
  };
};
