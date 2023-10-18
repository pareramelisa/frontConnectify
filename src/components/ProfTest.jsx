import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProf } from "../redux/actions/professionalActions";

export const ProfTest = () => {
  const dispatch = useDispatch();
  const { professionals } = useSelector((state) => state.professionals);
  useEffect(() => {
    dispatch(getAllProf());
  }, [dispatch]);

  return (
    <div>
      {professionals &&
        professionals.map((p, i) => {
          return (
            <div key={i}>
              <p>{p.name}</p>
              <img src={p.image} alt={p.name} />
            </div>
          );
        })}
    </div>
  );
};
