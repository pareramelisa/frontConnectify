/* eslint-disable no-useless-catch */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const VITE_API_BASE = import.meta.env.VITE_API_BASE || 'localhost'

// Define una función asincrónica para crear un comentario
export const postComment = createAsyncThunk(
  "comments/postComment",
  async (commentData) => {
    try {

      // const endpoint = VITE_API_BASE + `/comments`
        const endpoint = "http://localhost:3001/comments";

      // const endpoint = VITE_API_BASE + `/comments/postComments`
        // "https://connectifyback-dp-production.up.railway.app/comments/postComments";

      const response = await axios.post(endpoint, commentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Define una función asincrónica para obtener los comentarios
export const getComments = createAsyncThunk("comment/getComment", async () => {
  try {

    // const endpoint = VITE_API_BASE + `/comments`
    const endpoint = "http://localhost:3001/comments";

    // const endpoint = VITE_API_BASE + `/comments/postComments`
      // "https://connectifyback-dp-production.up.railway.app/comments/getComments";

    const response = await axios(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Define una función asincrónica para eliminar un comentario
export const deleteComments = createAsyncThunk(
  "comment/deleteComment",
  async (commentId) => {
    try {
      const endpoint = VITE_API_BASE + `/comments/${commentId}/delete`
      // `https://connectifyback-dp-production.up.railway.app/comments/${commentId}/delete`;
      const response = await axios.delete(endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getCommentById = createAsyncThunk(
  "comment/getCommentById",
  async (commentId) => {
    try {
      const endpoint = VITE_API_BASE + `/comments/${commentId}`
      // `https://connectifyback-dp-production.up.railway.app/comments/${commentId}`;
      const response = await axios(endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: { comments: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(postComment.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteComments.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.payload._id
        );
      })
      .addCase(deleteComments.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getCommentById.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(getCommentById.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default commentSlice.reducer;