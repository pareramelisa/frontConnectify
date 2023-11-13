import { useNavigate } from "react-router-dom";
import style from "./Landing.module.css";
import Cover from "../Cover/Cover";
import Mujer from "../../assets/Mujer.png";
import Logo1 from "../../assets/LogoC.png";
import Titulo from "../../assets/ConnectifyLetras.png";
import home from "../../assets/home.png";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <Cover className={style.cover}/>

      <div className={style.contenedorLanding}>
        <div className={style.contMujer}>
          <img className={style.imgMujer} src={Mujer} alt="" />
        </div>
        <div className={style.contConnectify}>
          <div className={style.contLogo}>
            <img className={style.imgLogo} src={Logo1} alt="" />
          </div>
          <div className={style.contTitulo}>
            <img className={style.imgTitulo} src={Titulo} alt="" />
          </div>
          <div className={style.subTitulo}>
            <h2>Encontrá profesionales de una manera segura.</h2>
          </div>
          <div className={style.contButtons}>
            <button className={style.home} onClick={() => navigate("/home")}>
              <img src={home} alt="" />
              {/* HOME */}
            </button>
            {/* <button className={style.Login}>LOGIN</button> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
