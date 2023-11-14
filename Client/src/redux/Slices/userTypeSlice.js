// userTypesSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userTypesSlice = createSlice({
  name: 'userTypes',
  initialState: {
    userType: '',
  },
  reducers: {
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
  },
});

export const { setUserType } = userTypesSlice.actions;

export const selectUserType = (state) => state.userTypes.userType;

export default userTypesSlice.reducer;
