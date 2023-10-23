import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    selectedCiudad: 'Filtro de City',
  },
  reducers: {
    setSelectedCiudad: (state, action) => {
      state.selectedCiudad = action.payload;
    },
  },
});

export const { setSelectedCiudad } = searchSlice.actions;
export default searchSlice.reducer;