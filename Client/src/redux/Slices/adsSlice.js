import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = "https://connectifyback-dp-production.up.railway.app";
// const URL = "http://localhost:3001";
// Define una función asincrónica para cargar los anuncios
export const fetchAds = createAsyncThunk("ads/fetchAds", async () => {
  const endpoint = "https://connectifyback-dp-production.up.railway.app/ads";
  const response = await axios.get(endpoint);
  return response.data;
  //eliminado el tryCatch debido a que el createAsyncThunk ya maneja los errores.
});

const adsSlice = createSlice({
  name: "ads",
  initialState: {
    ads: [],
    deleted: {},
    adsFiltered: [],
    status: "idle",
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
        state.status = "loading";
      })
      .addCase(fetchAds.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ads = action.payload;
        state.adsFiltered = action.payload;
      })
      .addCase(fetchAds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAds = (state) => state.ads.ads;
export const { applyFilters, getAllAds, deleteAd } = adsSlice.actions;
export default adsSlice.reducer;

export const fetchAdsForAdmin = () => {
  return async (dispatch) => {
    const endpoint = "https://connectifyback-dp-production.up.railway.app/ads";
    try {
      const response = await axios.get(endpoint);
      console.log(response.data);
      const ads = response.data;
      dispatch(getAllAds(ads));
      return ads;
    } catch (error) {
      console.log(error);
      return "No hay avisos disponibles";
    }
  };
};
export const deleteAdByIdAdmin = (id) => {
  return async (dispatch) => {
    const endpoint = URL + `/ads/${id}/delete`;
    try {
      const deleted = await axios.patch(endpoint, id);
      console.log(44444);
      console.log(deleted);
      console.log(44444);

      dispatch(deleteAd(deleted));
    } catch (error) {
      console.log(error);
      return "No se pudo bannear dichao anuncio";
    }
  };
};
