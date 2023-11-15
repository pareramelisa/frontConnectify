import { useState } from "react";
import style from "./SupportPopUp.module.css";
import { useNavigate } from "react-router-dom";
// import ClientDashboarsRenderer from "../Renderizers/clientDashboarsRenderer";
// import { DashboardClient } from "../../../views/DashboardClient/DashboardClient";

const SupportPopUp = ({ isVisible, professional, onClose }) => {
  const navigate = useNavigate();

  const handlerToDetail = (_id) => {
    navigate(`/detail/${_id}`);
  };
  const handlerToPayments = (userName) => {
    navigate(`/payments/${userName}`);
  };
  const handlerSeeClientsProfile = (userId) => {
    console.log(userId);
    navigate(`/admin/client/dashboard/${userId}`);
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
          {!professional.creator && (
            <button onClick={() => handlerSeeClientsProfile(professional._id)}>
              Editar Perfil
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
