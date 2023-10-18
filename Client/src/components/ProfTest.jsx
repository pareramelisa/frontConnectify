import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllProf } from "../redux/actions/professionalActions";

export const ProfTest = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProf());
  }, [dispatch]);

  return <div>ProfTest</div>;
};
