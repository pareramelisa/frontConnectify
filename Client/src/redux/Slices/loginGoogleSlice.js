/* eslint-disable no-useless-catch */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const loginWithGoogle = createAsyncThunk(
  "user/loginWithGoogle",
  async (email) => {
    const endpoint =
      "https://connectifyback-dp-production.up.railway.app/client/googlelogin";

    const response = await axios.post(
      endpoint,
       email ,
    //   {
    //     // headers: {
    //     //   "Content-Type": "application/json",
    //     // },
    //   }
    );
    return response.data;
  }
);

const userSlice = createSlice({
  name: "googleUser",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.googleUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.googleUser = action.payload;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { loginUser } = userSlice.actions;
export default userSlice.reducer;
