import axios from "axios";
import {
  getAllProfessionals,
  getProfessionalByID,
} from "../slice/professionalSlice";

export const getAllProf = () => (dispatch) => {
  axios("https://rickandmortyapi.com/api/character")
    .then((res) => dispatch(getAllProfessionals(res.data.results)))
    .catch((err) => console.log(err));
};
export const getProfByID = (id) => (dispatch) => {
  axios("https://rickandmortyapi.com/api/character/" + id)
    .then((res) => dispatch(getProfessionalByID(res.data)))
    .catch((err) => console.log(err));
};
