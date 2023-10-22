import { createSlice } from "@reduxjs/toolkit";

export const professionalSlice = createSlice({
  name: "professionals",
  initialState: {
    professionals: [],
    detail: {},
  },
  reducers: {
    getAllProfessionals: (state, action) => {
      state.professionals = action.payload;
    },
    getProfessionalByID: (state, action) => {
      state.detail = action.payload;
    },
  },
});

export const { getAllProfessionals, getProfessionalByID } =
  professionalSlice.actions;

export default professionalSlice.reducer;
