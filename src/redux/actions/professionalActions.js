import axios from "axios";
import { getAllProfessionals, getProfessionalByID } from "../professionalSlice";

export const getAllProf = () => (dispatch) => {
  axios("https://rickandmortyapi.com/api/character")
    .then((res) => dispatch(getAllProfessionals(res.data.results)))
    .catch((err) => console.log(err));
};
