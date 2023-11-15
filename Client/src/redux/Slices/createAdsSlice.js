import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const VITE_API_BASE = import.meta.env.VITE_API_BASE || 'localhost';

const initialState = {
  createAds: [],
  status: 'idle',
  loading: false,
  error: null,
};

// Función de utilidad para actualizar los anuncios después de deshabilitar uno
const updateAdsAfterDisable = (state, action) => {
  state.loading = false;
  const updatedAds = state.createAds.map((ad) =>
    ad._id === action.payload._id ? { ...ad, ...action.payload } : ad
  );

  state.createAds = updatedAds;
};

// Acciones asíncronas
export const createAd = createAsyncThunk('ads/createAd', async (adData) => {
  const endpoint = `${VITE_API_BASE}/ads`;
  const response = await axios.post(endpoint, adData);
  return response.data;
});

export const deleteAd = createAsyncThunk('ads/deleteAd', async (id) => {
  const response = await axios.patch(`${VITE_API_BASE}/ads/${id}/delete`);
  return response.data;
});

export const fetchAds = createAsyncThunk('ads/fetchAds', async (userId) => {
  const endpoint = `${VITE_API_BASE}/ads`;
  const response = await axios.get(endpoint);
  const adsFilter = response.data.filter((ad) => ad.creator[0]._id === userId);

  return adsFilter;
  //eliminado el tryCatch debido a que el createAsyncThunk ya maneja los errores.
});

// Slice
const createAdsSlice = createSlice({
  name: 'createAds',
  initialState,
  reducers: {
    disableAdStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    disableAdSuccess: updateAdsAfterDisable,
    disableAdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAd.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createAd.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.createAds.push(action.payload);
      })
      .addCase(createAd.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteAd.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteAd.fulfilled, (state, action) => {
        state.status = 'succeeded';
        updateAdsAfterDisable(state, action);
      })
      .addCase(deleteAd.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchAds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAds.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.createAds = action.payload; // Actualiza el estado con los anuncios obtenidos
      })
      .addCase(fetchAds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Exportar acciones y selector
export const { disableAdStart, disableAdSuccess, disableAdFailure } =
  createAdsSlice.actions;
export const dataAds = (state) => state.createAds.createAds;
export default createAdsSlice.reducer;
