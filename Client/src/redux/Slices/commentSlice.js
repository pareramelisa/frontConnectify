/* eslint-disable no-useless-catch */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../Utils/AxiosInstance';
const VITE_API_BASE = import.meta.env.VITE_API_BASE || 'localhost';

// Define una función asincrónica para crear un comentario
export const postComment = createAsyncThunk(
  'comments/postComment',
  async (commentData) => {
    try {
      const endpoint = VITE_API_BASE + `/comments`;
      // "https://connectifyback-dp-production.up.railway.app/comments/postComments";

      // const endpoint = VITE_API_BASE + `/comments`
      //const endpoint = "http://localhost:3001/comments";

      const response = await axiosInstance.post(endpoint, commentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Define una función asincrónica para obtener los comentarios
export const getComments = createAsyncThunk('comment/getComment', async () => {
  try {
    const endpoint = VITE_API_BASE + `/comments`;
    // "https://connectifyback-dp-production.up.railway.app/comments/getComments";

    const response = await axiosInstance(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Define una función asincrónica para eliminar un comentario
export const deleteComments = createAsyncThunk(
  'comment/deleteComment',
  async (commentId) => {
    try {
      const endpoint = VITE_API_BASE + `/comments/${commentId}/delete`;
      // `https://connectifyback-dp-production.up.railway.app/comments/${commentId}/delete`;
      const response = await axiosInstance.delete(endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getCommentById = createAsyncThunk(
  'comment/getCommentById',
  async (commentId) => {
    try {
      const endpoint = VITE_API_BASE + `/comments/${commentId}`;
      // `https://connectifyback-dp-production.up.railway.app/comments/${commentId}`;
      const response = await axiosInstance(endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const fetchCommentsForAdmin = () => {
  return async (dispatch) => {
    // const endpoint = "http://localhost:3001" + `/comments`;
    const endpoint = VITE_API_BASE + `/comments`;
    try {
      const response = await axiosInstance.get(endpoint);
      const comments = response.data;
      dispatch(getAllComments(comments));
      return response.data;
    } catch (error) {
      console.log(error);
      return 'No hay commentarios';
    }
  };
};
export const deleteCommentByIdAdmin = (id) => {
  return async (dispatch) => {
    const endpoint = VITE_API_BASE + `/comments/${id}/delete`;
    // const endpoint = "http://localhost:3001" + `/comments/${id}/delete`;
    try {
      const deleted = await axiosInstance.patch(endpoint, id);
      dispatch(deleteComment(deleted));
      return deleted;
    } catch (error) {
      console.log(error);
      return 'No se pudo censurar dicho comentario';
    }
  };
};
export const checkCommentByIdAdmin = (id) => {
  return async (dispatch) => {
    const endpoint = VITE_API_BASE + `/comments/${id}/check`;
    // const endpoint = "http://localhost:3001" + `/comments/${id}/check`;
    try {
      const checked = await axiosInstance.patch(endpoint, id);
      dispatch(checkComment(checked));

      return checked;
    } catch (error) {
      console.log(error);
      return 'No se pudo marcar como revisado dicho comentario';
    }
  };
};

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    comments: [],
    status: 'idle',
    error: null,
    deleted: {},
    checked: {},
  },
  reducers: {
    getAllComments: (state, action) => {
      state.comments = action.payload;
    },
    deleteComment: (state, action) => {
      state.deleted = action.payload;
    },
    checkComment: (state, action) => {
      state.checked = action.payload;
    },
  },
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

export const { getAllComments, deleteComment, checkComment } =
  commentSlice.actions;

export default commentSlice.reducer;
