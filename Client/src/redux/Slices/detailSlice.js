/* eslint-disable no-useless-catch */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const detailAd = createAsyncThunk('ads/detail', async (arg) => {
  const endpoint = `http://localhost:3001/ads/${arg.id}`;

  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.log(error, 'Error en el redux');
  }
});

const detailSlice = createSlice({
  name: 'detail',
  initialState: { detail: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(detailAd.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(detailAd.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.detail = action.payload;
      })
      .addCase(detailAd.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const getByIdAd = (state) => state.detail.detail;
export default detailSlice.reducer;
