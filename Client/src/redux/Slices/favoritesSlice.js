import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const VITE_API_BASE = import.meta.env.VITE_API_BASE;

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favoriteProfessionals: [],
    favoriteCount: 0,
  },
  reducers: {
    getAllFavorites: (state, action) => {
      state.favoriteProfessionals = action.payload;
    },
    addFavorite: (state, action) => {
      // Verifica si el profesional ya está en la lista de favoritos
      const isFavorite = state.favoriteProfessionals.some(
        (prof) => prof._id === action.payload._id
      );

      if (!isFavorite) {
        state.favoriteProfessionals.push(action.payload);
        state.favoriteCount += 1;
      }
    },
    removeFavorite: (state, action) => {
      state.favoriteProfessionals = state.favoriteProfessionals.filter(
        (prof) => prof._id !== action.payload._id
      );
      if (state.favoriteCount > 1) {
        state.favoriteCount -= 1;
      } else {
        state.favoriteCount = 0;
      }
    },
  },
});

export const { addFavorite, removeFavorite, getAllFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;

export const fetchGetAllFavorites = (clientId) => {
  return async (dispatch) => {
    console.log(clientId);
    try {
      const { data } = axios.get(`http://localhost:3001/fav/${clientId}/`);
      console.log(data);
      dispatch(getAllFavorites(data));
    } catch (error) {
      console.log(error);
    }
  };
};
