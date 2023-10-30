import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favoriteProfessionals: [],
    favoriteCount: 0,
  },
  reducers: {
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
      state.favoriteCount -= 1;
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
