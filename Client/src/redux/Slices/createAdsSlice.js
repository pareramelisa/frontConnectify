import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const createAd = createAsyncThunk('ads/createAd', async (adData) => {
    try {
      const endpoint = "http://localhost:3001/ads";
      const response = await axios.post(endpoint, adData);
      return response.data;
    } catch (error) {
      throw error
    }
  });

  const createAdsSlice = createSlice({
    name: 'createAds',
    initialState: { createAds: [], status: "idle", error: null },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createAd.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(createAd.fulfilled, (state) => {
          state.status = 'succeeded';
          state.createAds.push = action.payload;
        })
        .addCase(createAd.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });
  
  export const dataAds = (state) => state.createAds.ads;
  export default createAdsSlice.reducer;