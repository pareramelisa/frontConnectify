/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import style from "./PaymentsCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import fetchUserLoginWithGoogle from "../../redux/Slices/loginGoogleSlice";

function PaymentsCard(data) {
  const profData = data.data.professionalId;
  const bDate = data.data.date.split("T")[0];
  const bState = data.data.isCompleted.toString();
  const dispatch = useDispatch();
  const [professionalData, setProfessionalData] = useState(null);
  const [buyDate, setBuyDate] = useState(null);
  const [buyState, setBuyState] = useState(null);
  const { isAuthenticated, user } = useAuth0;
  const users = useSelector((state) => state.usersLogin.user);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const comments = useSelector((state) => state.comment.comments);
  const [userComments, setUserComments] = useState([]);


  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserLoginWithGoogle({ email: user.email }));
    }
    setProfessionalData(profData);
    setBuyDate(bDate);
    setBuyState(bState);

    
  }, [profData, bDate, bState, isAuthenticated, dispatch]);



  return (
    <div className={style.contentAll}>
      <div className={style.roundMask}>
        {professionalData && professionalData.image && (
          <img src={professionalData.image} alt="Image" />
        )}
      </div>

      <div className={style.dates}>
        {professionalData && professionalData.profession && (
          <h4>{`${professionalData.profession}`}</h4>
        )}
        {professionalData && professionalData.name && (
          <h5>{`${professionalData.name} ${professionalData.lastName}`}</h5>
        )}
      </div>
      <div className={style.date}>
        {buyDate && <h4>Fecha:</h4>}
        {buyDate && <h5>{buyDate}</h5>}
      </div>
      <div className={style.state}>
        {buyState && <h4>Estado:</h4>}
        {buyState && <h5>{buyState}</h5>}
      </div>

    </div>
  );
}

export default PaymentsCard;
