/* eslint-disable no-useless-catch */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const detailAd = createSlice({
  name: 'detailId',
  initialState: {
    detail: [],
  },
  reducers: {
    setDetail: (state, action) => {
      state.detail = action.payload;
    },
  },
});

export const { setDetail } = detailAd.actions;

export default detailAd.reducer;

export const fetchDetail = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`https://connectifyback-dp-production.up.railway.app/ads/${id}`);
      dispatch(setDetail(data));
    } catch (error) {
      throw error;
    }
  };
};
