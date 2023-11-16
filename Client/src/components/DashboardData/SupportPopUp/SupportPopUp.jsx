import { useState } from "react";
import style from "./SupportPopUp.module.css";
import { useNavigate } from "react-router-dom";
// import ClientDashboarsRenderer from "../Renderizers/clientDashboarsRenderer";
// import { DashboardClient } from "../../../views/DashboardClient/DashboardClient";

const SupportPopUp = ({ isVisible, professional, onClose }) => {
  const navigate = useNavigate();
  console.log(professional);
  console.log(professional.payments);

  const handlerToDetail = (_id) => {
    console.log(_id);
    navigate(`/detail/${_id}`);
  };
  const handlerToPayments = (userName) => {
    navigate(`/payments/${userName}`);
  };
  const handlerSeeClientsProfile = (userId) => {
    navigate(`/admin/client/dashboard/${userId}`);
  };
  const handlerSeeProfessionalsProfile = (userId) => {
    navigate(`/admin/professional/dashboard/${userId}`);
  };
  return (
    <div className={style.modal}>
      <button onClick={onClose}>Cerrar</button>
      <div className={style.overlay}>
        <div className={style.nameContainer}>
          <h2 className={style.overlayTitle}>
            {professional.name + " " + professional.lastName}
          </h2>
        </div>
        <div className={style.buttons}>
          {!professional.creator && !professional.profession && (
            <button onClick={() => handlerSeeClientsProfile(professional._id)}>
              Editar Perfil del Cliente
            </button>
          )}
          {!professional.creator && professional.profession && (
            <button
              onClick={() => handlerSeeProfessionalsProfile(professional._id)}
            >
              Editar Perfil del Profesional
            </button>
          )}

          {professional.title && (
            <button onClick={() => handlerToDetail(professional._id)}>
              Ver Detalle
            </button>
          )}
          {professional.payments?.length > 0 && (
            <button onClick={() => handlerToPayments(professional.userName)}>
              Ver Pagos
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default SupportPopUp;
