import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const VITE_API_BASE = import.meta.env.VITE_API_BASE || "localhost";

export const updateAd = createAsyncThunk("ads/updateAd", async (id, data) => {
  try {
    const response = await axios.patch(VITE_API_BASE + `/ads/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

const adsUpdateSlice = createSlice({
  name: "adsUpdate",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateAd.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAd.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateAd.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default adsUpdateSlice.reducer;
