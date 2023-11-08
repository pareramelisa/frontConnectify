import style from "./SupportPopUp.module.css";

const SupportPopUp = ({ isVisible, professional, onClose }) => {
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
          {!professional.creator && <button>Editar Perfil</button>}
          <button>Ver Detalle</button>
          {professional.profession && <button>Editar Aviso</button>}
          <button>Enviar Mensaje</button>
        </div>
      </div>
    </div>
  );
};
export default SupportPopUp;
