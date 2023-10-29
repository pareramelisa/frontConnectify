import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  adsDelete: [],
  status: 'idle',
  error: null,
};

export const deleteAdById = createAsyncThunk('ads/deleteAdById', async (id, { rejectWithValue }) => {
  try {
    // Realizar una solicitud de eliminación a la API utilizando Axios
    const response = await axios.patch(`/api/ads/${id}/delete`);

    // Comprobar si la solicitud fue exitosa
    if (response.status !== 204) {
      throw new Error('Failed to delete ad');
    }

    // Devuelve el ID del anuncio eliminado para que puedas filtrar el estado localmente
    return id;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const adsDeleteSlice = createSlice({
  name: 'adsDelete',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteAdById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteAdById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Elimina el anuncio con el ID recibido del estado local
        state.adsDelete = state.adsDelete.filter((ad) => ad.id !== action.payload);
      })
      .addCase(deleteAdById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { } = adsDeleteSlice.actions;

export default adsDeleteSlice.reducer;