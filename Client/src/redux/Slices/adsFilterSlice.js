import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';


const initialState = {
  adsFilter: [],
  error: null,
};

const adsFilterSlice = createSlice({
  name: 'adsFilter',
  initialState,
  reducers: {
    setAdsFilter: (state, action) => {
      state.adsFilter = action.payload;
      state.error = null; //
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setAdsFilter, setError } = adsFilterSlice.actions;

export const fetchAdsByCreatorId = (userId) => async (dispatch) => {
  const users = useSelector(state => state.usersLogin.user)
  const userId = users._id
  try {
    const response = await axios.get('https://connectifyback-dp-production.up.railway.app/ads');
    if (response.status === 200) {
      const data = response.data;
      const adsFilter = data.filter((ad) => ad.creator[0] === userId);
      dispatch(setAdsFilter(adsFilter));
    } else {
      dispatch(setError('Error al obtener anuncios.'));
    }
  } catch (error) {
    dispatch(setError('Error de red: No se pudo obtener los anuncios.'));
  }
};

export const selectAdsByCreatorId = (state) => state.adsFilter.adsFilter;
export const selectError = (state) => state.adsFilter.error;

export default adsFilterSlice.reducer;

