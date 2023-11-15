import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const VITE_API_BASE = import.meta.env.VITE_API_BASE;

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favoriteProfessionals: [],
    favoriteCount: 0,
    isSaved: false,
  },
  reducers: {
    getAllFavorites: (state, action) => {
      state.favoriteProfessionals = action.payload;
      state.favoriteCount = state.favoriteProfessionals.length;
    },
    addFavorite: (state, action) => {
      state.favoriteProfessionals = action.payload;
      state.favoriteCount += 1;
      state.isSaved = true;
    },
    removeFavorite: (state, action) => {
      state.favoriteProfessionals = action.payload;
      state.isSaved = false;

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
    try {
      const { data } = await axios.get(VITE_API_BASE + `/fav/${clientId}/`);

      dispatch(getAllFavorites(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchAddFavorites = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(VITE_API_BASE + `/fav/save/`, form);

      dispatch(addFavorite(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchRemoveFavorites = (form) => {
  return async (dispatch) => {
    console.log(form);
    try {
      const { data } = await axios.post(VITE_API_BASE + `/fav/delete/`, form);
      console.log(data);
      dispatch(removeFavorite(data));
    } catch (error) {
      console.log(error);
    }
  };
};
