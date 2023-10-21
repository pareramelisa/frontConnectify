import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userRole: null,
  },
  reducers: {
    setUserRole: (state, action) => {
      state.userRole = action.payload;
    },
  },
});

export const { setUserRole } = userSlice.actions;
export default userSlice.reducer;