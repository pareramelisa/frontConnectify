import { createSlice } from "@reduxjs/toolkit";

export const persistUserSlice = createSlice({
  name: "persistUser",
  initialState: {
    location: "",
  },
  reducers: {
    locationUser: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { locationUser } = persistUserSlice.actions;

export default persistUserSlice.reducer;
