/* eslint-disable no-useless-catch */
import { createSlice } from "@reduxjs/toolkit";
import { applyFilters } from "./adsSlice";
const VITE_API_BASE = import.meta.env.VITE_API_BASE;
import axios from "axios";

const FilterSlice = createSlice({
  name: "filter",
  initialState: {
    filterApplied: [],
  },
  reducers: {
    setSelectedFilter: (state, action) => {
      state.filterApplied = action.payload;
    },
  },
});

export const { setSelectedFilter } = FilterSlice.actions;
export default FilterSlice.reducer;

export const fetchFilter = ({
  profession,
  locationProf,
  province,
  workLocation,
  minPrice,
  maxPrice,
  sortPrice,
}) => {
  return async (dispatch) => {
    try {
      // let url = `http://localhost:3001/ads/filters?`;
      let url = VITE_API_BASE + `/ads/filters?`;
      // 'https://connectifyback-dp-production.up.railway.app/ads/filters?';

      // Valida y construye la URL de la solicitud en función de los parámetros proporcionados
      if (minPrice && maxPrice) {
        url += `minPrice=${minPrice}&maxPrice=${maxPrice}&`;
      }
      if (profession) {
        url += `profession=${profession}&`;
      }
      if (locationProf) {
        url += `location=${locationProf}&`;
      }
      if (province) {
        url += `province=${province}&`;
      }
      if (sortPrice) {
        url += `sortPrice=${sortPrice}&`;
      }
      if (workLocation) {
        url += `workLocation=${workLocation}&`;
      }
      const { data } = await axios.get(url);
      dispatch(applyFilters(data));
    } catch (error) {
      throw error;
    }
  };
};
