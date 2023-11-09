import { createSlice } from "@reduxjs/toolkit";

export const persistUserSlice = createSlice({
  name: "persistUser",
  initialState: {
    location: "",
    adsFilter: [],
  },
  reducers: {
    locationUser: (state, action) => {
      state.location = action.payload;
    },
    adsPersistFilter: (state, action) => {
      state.adsFilter = action.payload;
    },
  },
});

export const { locationUser } = persistUserSlice.actions;

export default persistUserSlice.reducer;
