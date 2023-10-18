import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfByID } from "../redux/actions/professionalActions";
export const DetailTest = () => {
  const dispatch = useDispatch();
  const { detail } = useSelector((state) => state.professionals);
  useEffect(() => {
    dispatch(getProfByID(10));
  }, [dispatch]);
  return (
    <div>{Object.keys(detail).length > 0 && <span>{detail.name}</span>}</div>
  );
};
