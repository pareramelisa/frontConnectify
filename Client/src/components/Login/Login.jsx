/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import {Box} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import { fetchUserLogin } from "../../redux/Slices/loginSlice";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation, Link } from "react-router-dom";
import { locationUser } from "../../redux/Slices/persistSlice";
import validationLogin from "./validationLogin";
import style from "./Login.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Logo from "../../assets/LogoCLogin.png";
import LogoGoogle from '../../assets/Logo-Google.png'
import RequestPassword from '../ResetPassword/RequestPassword/RequestPassword';
import { setUserType } from '../../redux/Slices/userTypeSlice';

const Login = ({ setContainerLogin, setPopUpLogin }) => {
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = useState(false);
  const [showLoginClient, setShowLoginClient] = useState(false);
  const [showLoginProfessional, setShowLoginProfessional] = useState(false);
  const [popUpGoogle, setPopUpGoogle] = useState(false);

  const location = useLocation();

  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const [form, setForm] = useState({
    email: '',
    password: '',
    types: '',
  });

  const [error, setError] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const propiedad = e.target.id;
    const valor = e.target.value;

    setForm({ ...form, [propiedad]: valor });
    setError(validationLogin({ ...form, [propiedad]: valor }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(fetchUserLogin(form));
    console.log(result);
    if (result.access === true) {
      setShowLogin(true);
      setShowLoginProfessional(false);
      setShowLoginClient(false);
      setContainerLogin(false);
    } else {
      setPopUpLogin(true);
    }
  };

  const handlerLoginGoogle = () => {
    setPopUpGoogle(true);
    const loginGoogle = () => {
      loginWithRedirect();
      setPopUpGoogle(false);
    };

    setTimeout(loginGoogle, 2000);
  };

  const handleShowClient = (e) => {
    const propiedad = 'types';
    const valor = e.target.id;
    const userType = e.target.id;
    dispatch(setUserType(userType));
    setForm({ ...form, [propiedad]: valor });

    dispatch(locationUser(location.pathname));

    setShowLogin(true);
    setShowLoginClient(true);
  };

  const handleShowProfessional = (e) => {
    const propiedad = 'types';
    const valor = e.target.id;
    const userType = e.target.id;
    dispatch(setUserType(userType));
    setForm({ ...form, [propiedad]: valor });

    dispatch(locationUser(location.pathname));

    setShowLogin(true);
    setShowLoginProfessional(true);
  };

  const handlerCloseLogin = () => {
    setShowLogin(true);
    setContainerLogin(false);
    setShowLoginProfessional(false);
    setShowLoginClient(false);
  };

  const handlerBackLogin = () => {
    setForm({
      email: '',
      password: '',
      types: '',
    });
    setError({
      email: '',
      password: '',
    });
    if (showLoginClient) {
      setShowLoginClient(false);
      setShowLogin(false);
      setContainerLogin(true);
    } else {
      setShowLoginProfessional(false);
      setShowLogin(false);
      setContainerLogin(true);
    }
  };

  return (
    <div className={style.containerLogin}>
      {!showLogin && (
        <div className={style.login}>
          <div className={style.containerLogo}>
            <img src={Logo} alt="Logo Connectify" className={style.logo} />
            <div className={style.borderTop}></div>
          </div>
          <AiFillCloseCircle
            className={style.btnCerrar}
            onClick={handlerCloseLogin}
          />
          <div className={style.containerLoginStart}>
            <h3 className={style.loginTitle}>Modo de Inicio</h3>
            <div className={style.containerBtns}>
              <button
                className={style.btnClient}
                onClick={handleShowClient}
                id="client"
              >
                CLIENTE
              </button>
              <button
                className={style.btnProfessional}
                onClick={handleShowProfessional}
                id="professional"
              >
                PROFESIONAL
              </button>
            </div>
          </div>
        </div>
      )}

      {showLoginClient && (
        <div className={style.login}>
          <div className={style.containerLogo}>
            <img src={Logo} alt="Logo Connectify" className={style.logo} />
            <div className={style.borderTop}></div>
          </div>
          <BsFillArrowLeftCircleFill
            className={style.btnBack}
            onClick={handlerBackLogin}
          />
          <AiFillCloseCircle
            className={style.btnCerrar}
            onClick={handlerCloseLogin}
          />
          <div className={style.containerLoginClient}>
            <h3 className={style.clientTitle}>Cliente:</h3>
            <form className={style.loginForm} onSubmit={onSubmit}>
              <input
                id="email"
                type="email"
                onChange={handleChange}
                value={form.email}
              />
              <span className={style.spanFormEmail}>{error.email}</span>
              <input
                id="password"
                type="password"
                onChange={handleChange}
                value={form.password}
              />
              <span className={style.spanFormPass}>{error.password}</span>
              <button type="submit" className={style.btnGetIn}>
                ENTRAR
              </button>
            </form>
            <p className={style.notAccount}>
              No tenes cuenta?
              <Link to={'/client/registration'}>
                <span className={style.spanNotAccount}>REGISTRATE</span>
              </Link>
            </p>
            <p>
              <Link to={'/password'}>Recuperar contraseña</Link>
            </p>
            <div className={style.line}></div>
            <button className={style.btnGoogle} onClick={handlerLoginGoogle}>
              <img src={LogoGoogle} alt="" className={style.imageGoogle} />
              <span>Logueate con GOOGLE</span>
            </button>
          </div>
        </div>
      )}
      {showLoginProfessional && (
        <div className={style.login}>
          <div className={style.containerLogo}>
            <img src={Logo} alt="Logo Connectify" className={style.logo} />
            <div className={style.borderTop}></div>
          </div>
          <BsFillArrowLeftCircleFill
            className={style.btnBack}
            onClick={handlerBackLogin}
          />
          <AiFillCloseCircle
            className={style.btnCerrar}
            onClick={handlerCloseLogin}
          />
          <div className={style.containerLoginProfessional}>
            <h3 className={style.clientTitle}>Profesional:</h3>
            <form className={style.loginForm} onSubmit={onSubmit}>
              <input
                id="email"
                type="email"
                onChange={handleChange}
                value={form.email}
              />
              <span className={style.spanFormEmailProf}>{error.email}</span>
              <input
                id="password"
                type="password"
                onChange={handleChange}
                value={form.password}
              />
              <span className={style.spanFormPassProf}>{error.password}</span>
              <button type="submit" className={style.btnGetIn}>
                ENTRAR
              </button>
            </form>
            <p>
              <Link to={'/password'}>Recuperar contraseña</Link>
            </p>
            <p className={style.notAccount}>
              No tenes cuenta?
              <Link to={'/professional/registration'}>
                <span className={style.spanNotAccount}>REGISTRATE</span>
              </Link>
            </p>
          </div>
        </div>
      )}
{popUpGoogle && (
        <div className={style.containerPopUpGoogle}>
          <div className={style.boxPopUp}>
            <h4>Redirigiendo a Login de Google</h4>
            <Box>
              <CircularProgress />
            </Box>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
