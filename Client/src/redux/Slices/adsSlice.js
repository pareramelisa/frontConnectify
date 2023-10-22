/* eslint-disable no-useless-catch */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define una función asincrónica para cargar los anuncios
export const fetchAds = createAsyncThunk("ads/fetchAds", async () => {
  
  try {
    const endpoint = "http://localhost:3001/ads";

    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const adsSlice = createSlice({
  name: "ads",
  initialState: { ads: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAds.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAds.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ads = action.payload;
      })
      .addCase(fetchAds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAds = (state) => state.ads.ads;

export default adsSlice.reducer;