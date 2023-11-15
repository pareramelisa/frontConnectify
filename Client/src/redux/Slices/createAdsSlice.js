import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const VITE_API_BASE = import.meta.env.VITE_API_BASE || "localhost";
import axiosInstance from "../Utils/AxiosInstance";

const initialState = {
  createAds: [],
  status: "idle",
  loading: false,
  error: null,
};

const updateAdsAfterDisable = (state, action) => {
  state.loading = false;

  const updatedAds = state.createAds.filter(
    (ad) => ad._id !== action.payload._id
  );

  state.createAds = updatedAds;
};

export const createAd = createAsyncThunk("ads/createAd", async (adData) => {
  const endpoint = `${VITE_API_BASE}/ads`;
  const response = await axios.post(endpoint, adData);
  return response.data;
});

export const deleteAd = createAsyncThunk("ads/deleteAd", async (id) => {
  const response = await axiosInstance.patch(
    `${VITE_API_BASE}/ads/${id}/delete`
  );
  return response.data;
});

export const fetchAdsToProfDashboard = createAsyncThunk(
  "adsCreate/fetchAdsToProfDashboard",
  async (userId) => {
    const endpoint = `${VITE_API_BASE}/ads`;
    const response = await axiosInstance.get(endpoint);
    const adsFilter = response.data.filter(
      (ad) => ad.creator[0]._id === userId
    );

    return adsFilter;
  }
);

const createAdsSlice = createSlice({
  name: "createAds",
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
        state.status = "loading";
      })
      .addCase(createAd.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.createAds.push(action.payload);
      })
      .addCase(createAd.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteAd.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAd.fulfilled, (state, action) => {
        state.status = "succeeded";
        updateAdsAfterDisable(state, action);
      })
      .addCase(deleteAd.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchAdsToProfDashboard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdsToProfDashboard.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.createAds = action.payload; // Actualiza el estado con los anuncios obtenidos
      })
      .addCase(fetchAdsToProfDashboard.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { disableAdStart, disableAdSuccess, disableAdFailure } =
  createAdsSlice.actions;
export const dataAds = (state) => state.createAds.createAds;
export default createAdsSlice.reducer;
