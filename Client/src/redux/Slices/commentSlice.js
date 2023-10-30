/* eslint-disable no-useless-catch */
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://connectifyback-dp-production.up.railway.app/";

export const commentSlice = createSlice({
  name: "commentSlice",
  initialState: {
    comments: [],
    detail: {},
    deleted: {},
  },
  reducers: {
    getAllComments: (state, action) => {
      state.comments = action.payload;
    },
    getCommentById: (state, action) => {
      state.detail = action.payload;
    },
    deleteComments: (state, action) => {
      state.deleted = action.payload;
    },
    postComments: (state, action) => {
      state.comments = action.payload;
    },
  },
});

export const { getAllComments, getCommentById, deleteComments, postComments } =
  commentSlice.actions;
export default commentSlice.reducer;
export const FetchAllComments = () => {
  return async (dispatch) => {
    const endpoint = URL + `/comments/`;
    try {
      const response = await axios(endpoint);
      const comments = response.data;
      dispatch(getAllComments(comments));
      return comments;
    } catch (error) {
      console.error;
      return "No hay comentarios disponibles";
    }
  };
};

export const deleteCommentById = (id) => {
  return async (dispatch) => {
    const endpoint = URL + `/comments/${id}/delete`;
    try {
      const deleted = await axios.delete(endpoint, id);
      dispatch(deleteComments(deleted));
    } catch (error) {
      console.error;
      return "No se pudo eliminar el comentario";
    }
  };
};

export const getById = (professionalId) => {
  return async (dispatch) => {
    const endpoint = `http://localhost:3001/comments/${professionalId}`;
    try {
      const response = await axios(endpoint);
      const comments = response.data;
      dispatch(getCommentById(comments, professionalId));
      console.log(professionalId, "este es el prof")
      return comments;
    } catch (error) {
      console.error;
      return "No hay comentarios disponibles";
    }
  };
};


export const commentPost = (commentData) => {
  return async (dispatch) => {
    // const endpoint = URL + `/comments/`;
    try {
      const response = await axios.post(
        `http://localhost:3001/comments/`,
        commentData
      );

      const professionalId = commentData.professional;
      const updatedComments = await getById(professionalId); // Obtener los comentarios actualizados

      dispatch(postComments(updatedComments)); // Actualizar el estado con los comentarios actualizados
      return response.data;
    } catch (error) {
      console.error;
      return "No se pudo crear el comentario";
    }
  };
};
