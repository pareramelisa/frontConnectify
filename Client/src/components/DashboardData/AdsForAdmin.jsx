import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllProfessionals } from "../../redux/Slices/professionalSlice";

const ProfsForAdmin = () => {
  const [profsList, setProfsList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const professionals = await dispatch(getAllProfessionals());
        setProfsList(professionals);
      } catch (error) {
        console.error("falló el fetchear los profs:", error);
      }
    };
    fetchData();
  }, [dispatch]);
  console.log(profsList);
  return (
    <>
      {profsList.map((prof) => (
        <h2 key={prof.id}>{prof.name}</h2>
      ))}
      <h1>++++++</h1>
    </>
  );
};

export default ProfsForAdmin;
