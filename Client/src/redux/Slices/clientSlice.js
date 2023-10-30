import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const VITE_API_BASE = import.meta.env.VITE_API_BASE

// const URL = `http://localhost:3001`;
// const URL = `https://connectifyback-dp-production.up.railway.app`;

export const clientSlice = createSlice({
  name: "clientSlice",
  initialState: {
    clients: [],
    detail: {},
    deleted: {},
  },
  reducers: {
    getAllClients: (state, action) => {
      state.clients = action.payload;
    },
    getClientByID: (state, action) => {
      state.detail = action.payload;
    },
    deleteClient: (state, action) => {
      state.deleted = action.payload;
    },
  },
});

export const { getAllClients, getClientByID, deleteClient } =
  clientSlice.actions;

export default clientSlice.reducer;

export const fetchClientsForAdmin = () => {
  return async (dispatch) => {
    const endpoint = VITE_API_BASE + `/client/`;
    try {
      const response = await axios.get(endpoint);
      console.log(response.data);
      const clients = response.data;
      dispatch(getAllClients(clients));
      return clients;
    } catch (error) {
      console.log(error);
      return "No hay clientes disponibles";
    }
  };
};
export const deleteClientByIdAdmin = (id) => {
  return async (dispatch) => {
    const endpoint = VITE_API_BASE + `/client/${id}/delete`;
    try {
      const deleted = await axios.patch(endpoint, id);

      dispatch(deleteClient(deleted));
    } catch (error) {
      console.log(error);
      return "No se pudo bannear dicho cliente";
    }
  };
};
