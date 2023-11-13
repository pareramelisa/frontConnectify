/* eslint-disable no-unused-vars */
import React from "react";
import style from "./ViewsPayments.module.css";
const VITE_API_BASE = import.meta.env.VITE_API_BASE;
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PaymentsCard from "../PaymentsCard/PaymentsCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../Navbar/Navbar";
import CommentBox from "../CommentsClient/CommentBox";
import ReviewButton from "../CommentsClient/ReviewButton";

function ViewsPayments() {

  const { user, isAuthenticated } = useAuth0();
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);
  const { pathname, search } = useLocation(); // ( pathname: url - search: Querys )
  const path = pathname.split("/")[2];
  const detail = useSelector((state) => state.detail);
  const users = useSelector((state) => state.usersLogin.user);
  const comments = useSelector((state) => state.comment.comments);
  const [paymentData, setPaymentData] = useState(null);
  const [userName, setUserName] = useState("");

  const [openCommentBoxId, setOpenCommentBoxId] = useState(null);

  // Nueva lógica para mapear los comentarios y verificar si el usuario ha dejado un comentario para cada profesional
  const professionalCommentsMap = comments.reduce((acc, comment) => {
    if (comment.Professional._id) {
      acc[comment.Professional._id] = true;
    }
    return acc;
  }, {});

  console.log(professionalCommentsMap, "coment?");

  const handleCommentBoxToggle = (professionalId) => {
      setOpenCommentBoxId((prevId) => (prevId === professionalId ? null : professionalId));
    };

  const handleClose = () => {
      setOpenCommentBoxId(null);
    }
 
  

  useEffect(() => {
    setUserName(path);

    if (search) {
      //! Si hay search => tiene query (VENGO DE PAGAR)
      //!  GUARDO DATOS EN DB

      const dataMP = search.substring(1).split("&");

      let payment_id, idProf, status, payment_type;

      for (const pair of dataMP) {
        const [key, value] = pair.split("=");

        switch (key) {
          case "payment_id":
            payment_id = value;
            break;
          case "idProf":
            idProf = value;
            break;
          case "status":
            status = value;
            break;
          case "payment_type":
            payment_type = value;
            break;
        }
      }

      const valuesMP = {
        profIDID: idProf, //dataMP[0].split("=")[1],
        paymentIDD: payment_id, //dataMP[3].split("=")[1],
        status: status, //dataMP[4].split("=")[1],
        paymentType: payment_type, //dataMP[6].split("=")[1],
      };

      const fetchData = async () => {
        try {
          //Veo si ya existe el ID de pago para evitar copias
          // const checkPayment = await axios.get(`http://localhost:3001/payments/check/${valuesMP.paymentIDD}`);
          const checkPayment = await axios.get(
            `https://connectifyback-dp-production.up.railway.app/payments/check/${valuesMP.paymentIDD}`
          );
          if (checkPayment.data.exists) {
            searchData();
          } else {
            // const response = await axios.post("http://localhost:3001/payments/register", {
            const response = await axios.post(
              "https://connectifyback-dp-production.up.railway.app/payments/register",
              {
                professionalId: valuesMP.profIDID, //professionalID,
                paymentID: valuesMP.paymentIDD,
                userName: userName,
                isCompleted: valuesMP.status,
              }

            );
            searchData();
          }
        } catch (error) {
          console.log("Error ViewPayments,", error);

        }
      };

      fetchData();
    } else {
      searchData();
    }
  }, [search, userName]);

  // Leyendo datos por userName de la DB -----------------------------------------------------
  const searchData = async () => {
    try {
      const resp = await axios.get(
        VITE_API_BASE + `/payments/search/${userName}`
        // `http://localhost:3001/payments/search/${userName}`
      );
      setPaymentData(resp.data);
    } catch (error) {
      console.log("Error AxiosGet in ViewPayments,", error);
    }
  };

  return (
    <div className={style.contentAll}>
      <Navbar />
      <div className={style.contentAll}>
        <div className={style.contTitle}>
          <h2>Historial de pagos</h2>

          <h4>
            {paymentData && paymentData[0] && paymentData[0].userName
              ? `User: ${paymentData[0].userName}`
              : "Hasta la fecha no se registran pagos realizados."}
          </h4>
          {paymentData &&
          paymentData.map((data) => (
            <div key={data.paymentID}>
              <PaymentsCard data={data} />
              <ReviewButton
                  comments={comments}
                  handleCommentBoxToggle={handleCommentBoxToggle}
                  openCommentBoxId={openCommentBoxId}
                  professionalId={data.professionalId}
                  hasCommented={professionalCommentsMap[data.professionalId] || false}
                  handleClose={handleClose}
                />
            </div>
  ))}
        </div>
      </div>
    </div>
  );
}
export default ViewsPayments;
