import { useNavigate } from "react-router-dom";
// import { Button, Typography } from "@mui/material";
import style from './Landing.module.css';
// import Logo from "../../assets/connectify.svg";
// import Logo2 from "../../assets/logo.svg";
import { useAuth0 } from "@auth0/auth0-react";
import { AiOutlineHome } from "react-icons/ai";
import { useEffect, useState } from "react";
import Login from "../Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { loginWithGoogle } from "../../redux/Slices/loginGoogleSlice";
// import IconButton from '@mui/material/IconButton'
// import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { fetchGetAllFavorites } from "../../redux/Slices/favoritesSlice";

import Cover from '../Cover/Cover'


import Mujer from '../../assets/Mujer.png';
import Logo1 from '../../assets/LogoC.png';
import Titulo from '../../assets/ConnectifyLetras.png'
import home from '../../assets/home.png'


function LandingPage() {
  const navigate = useNavigate();
  const users = useSelector((state) => state.usersLogin.user);
  const favorites = useSelector((state) => state.favorites.favoriteProfessionals)
  const { isAuthenticated, user } = useAuth0();
  const [containerLogin, setContainerLogin] = useState(false);
  const [popUpLogin, setPopUpLogin] = useState(false);
  const dispatch = useDispatch();

  const handlerButtonLogin = () => {
    if (!isAuthenticated) {
      setContainerLogin(true);
    } else {
      navigate("/home");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loginWithGoogle(user.email));
      navigate("/home");
    }
  }, [dispatch, isAuthenticated, navigate]);

  // Aca sacas el PopUp
  const handlerCloseLoginPopUp = () => {
    setPopUpLogin(false);
  };

  console.log(users._id);
  console.log(favorites)

   return (
    <>
      <Cover />

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
