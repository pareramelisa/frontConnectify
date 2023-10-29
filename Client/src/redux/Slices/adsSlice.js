import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define una función asincrónica para cargar los anuncios
export const fetchAds = createAsyncThunk("ads/fetchAds", async () => {
  const endpoint = "https://connectifyback-dp-production.up.railway.app/ads";
  const response = await axios.get(endpoint);
  return response.data;
  //eliminado el tryCatch debido a que el createAsyncThunk ya maneja los errores.
});

const adsSlice = createSlice({
  name: "ads",
  initialState: { ads: [], adsFiltered: [], status: "idle", error: null },
  reducers: {
    applyFilters: (state, action) => {
      // Aquí actualizas el estado adsFiltered con los filtros aplicados
      state.adsFiltered = action.payload;
    },
    getAllAds: (state, action) => {
      state.ads = action.payload;
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
export const { applyFilters } = adsSlice.actions;
export default adsSlice.reducer;

// export const fetchAdsForAdmin = () => {
//   return async (dispatch) => {
//     const endpoint = URL + `/ads/`;
//     try {
//       const response = await axios.get(endpoint);
//       console.log(response.data);
//       const ads = response.data;
//       dispatch(getAllProfessionals(ads));
//       return ads;
//     } catch (error) {
//       console.log(error);
//       return "No hay avisos disponibles";
//     }
//   };
// };
