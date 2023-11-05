import { Box, Button, TextField, IconButton, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";
import { fetchUserLogin } from "../../redux/Slices/loginSlice";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { useLocation, Link } from "react-router-dom";
import { locationUser } from "../../redux/Slices/persistSlice";
import validationLogin from "./validationLogin";

const Login = ({ setContainerLogin, setPopUpLogin }) => {
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = useState(false);
  const [showLoginClient, setShowLoginClient] = useState(false);
  const [showLoginProfessional, setShowLoginProfessional] = useState(false);
  
  const location = useLocation();

  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const [form, setForm] = useState({
    email: "",
    password: "",
    types: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
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
      setPopUpLogin(true); // Mostrar el mensaje emergente para el inicio de sesión incorrecto
    }
  };

  const handlerLoginGoogle = () => {
    loginWithRedirect();
  };

  const handleShowClient = (e) => {
    const propiedad = "types";
    const valor = e.target.id;
    setForm({ ...form, [propiedad]: valor });

    dispatch(locationUser(location.pathname));

    setShowLogin(true);
    setShowLoginClient(true);
  };

  const handleShowProfessional = (e) => {
    const propiedad = "types";
    const valor = e.target.id;
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100vh",
        gap: "2",
        zIndex: "999",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      {!showLogin && (
        <div
          style={{
            position: "relative",
            width: "30rem",
            height: "20rem",
            border: "2px solid black",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.9)",
          }}
        >
          <IconButton
            disableElevation
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              color: "#000000",
              fontWeight: "bold",
            }}
            onClick={handlerCloseLogin}
          >
            <CancelRoundedIcon />
          </IconButton>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2 style={{ paddingBottom: "3rem" }}>Inicio Sesion</h2>
            <div
              style={{
                display: "flex",
                gap: "2rem",
                marginBottom: "4rem",
              }}
            >
              <Button
                id="client"
                variant="contained"
                disableElevation
                style={{
                  paddingTop: "0.7rem",
                  paddingBottom: "0.7rem",
                  paddingLeft: "3rem",
                  paddingRight: "3rem",
                }}
                onClick={handleShowClient}
              >
                Cliente
              </Button>
              <Button
                id="professional"
                variant="contained"
                disableElevation
                style={{
                  paddingTop: "0.7rem",
                  paddingBottom: "0.7rem",
                  paddingLeft: "2rem",
                  paddingRight: "2rem",
                }}
                onClick={handleShowProfessional}
              >
                Profesional
              </Button>
            </div>
          </div>
        </div>
      )}

      {showLoginClient && (
        <Box
          component="form"
          onSubmit={onSubmit}
          autoComplete="off"
          style={{
            position: "relative",
            width: "50rem",
            height: "25rem",
            border: "2px solid black",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "rgba(255,255,255,0.9)",
            gap: "1rem",
          }}
        >
          <IconButton
            disableElevation
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              color: "#000000",
              fontWeight: "bold",
            }}
            onClick={handlerCloseLogin}
          >
            <CancelRoundedIcon />
          </IconButton>
          <IconButton
            disableElevation
            style={{
              position: "absolute",
              top: "5px",
              left: "5px",
              color: "#000000",
              fontWeight: "bold",
            }}
            onClick={handlerBackLogin}
          >
            <ArrowCircleLeftIcon />
          </IconButton>

          <div className="btnGoogle">
            {!isAuthenticated && (
              <div>
                <Button
                  variant="contained"
                  disableElevation
                  startIcon={<GoogleIcon />}
                  onClick={handlerLoginGoogle}
                >
                  Google
                </Button>
              </div>
            )}
          </div>
          <div
            style={{
              width: "70%",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "0.8rem",
              }}
            >
              <TextField
                label="Email"
                variant="outlined"
                id="email"
                type="email"
                fullWidth
                onChange={handleChange}
                value={form.email}
              />
              <span>{error.email}</span>
              <TextField
                label="Password"
                variant="outlined"
                id="password"
                type="password"
                fullWidth
                onChange={handleChange}
                value={form.password}
              />
              <span>{error.password}</span>
            </div>
          </div>

          <Button variant="outlined" type="submit" sx={{ mt: 2 }}>
            Submit
          </Button>
          <Link to={"/client/registration"}>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ fontSize: "1rem", color: "#5241e8" }}
            >
              No tenes cuenta aun?
            </Typography>
          </Link>
        </Box>
      )}

      {showLoginProfessional && (
        <Box
          component="form"
          onSubmit={onSubmit}
          autoComplete="off"
          style={{
            position: "relative",
            width: "50rem",
            height: "25rem",
            border: "2px solid black",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "rgba(255,255,255,0.9)",
            gap: "2rem",
          }}
        >
          <IconButton
            disableElevation
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              color: "#000000",
              fontWeight: "bold",
            }}
            onClick={handlerCloseLogin}
          >
            <CancelRoundedIcon />
          </IconButton>
          <IconButton
            disableElevation
            style={{
              position: "absolute",
              top: "5px",
              left: "5px",
              color: "#000000",
              fontWeight: "bold",
            }}
            onClick={handlerBackLogin}
          >
            <ArrowCircleLeftIcon />
          </IconButton>
          <div>
            <div>
              <TextField
                label="Email"
                variant="outlined"
                id="email"
                type="email"
                fullWidth
                onChange={handleChange}
                value={form.email}
              />
              <span>{error.email}</span>
              <TextField
                label="Password"
                variant="outlined"
                id="password"
                type="password"
                fullWidth
                onChange={handleChange}
                value={form.password}
              />
              <span>{error.password}</span>
            </div>
          </div>

          <Button variant="outlined" type="submit" sx={{ mt: 2 }}>
            Submit
          </Button>
          <Link to={"/professional/registration"}>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ fontSize: "1rem", color: "#5241e8" }}
            >
              No tenes cuenta aun?
            </Typography>
          </Link>
        </Box>
      )}
    </div>
  );
};

export default Login;
