import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    selectedCiudad: 'Filtro de City',
    selectedProvincia: 'Filtro de Prov.',
  },
  reducers: {
    setSelectedCiudad: (state, action) => {
      state.selectedCiudad = action.payload;
    },
    setSelectedProvincia: (state, action) => {
      state.selectedProvincia = action.payload;
    },
  },
});

export const { setSelectedCiudad, setSelectedProvincia } = searchSlice.actions;
export default searchSlice.reducer;