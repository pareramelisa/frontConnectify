import { Box, Button, TextField, IconButton } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";
import { fetchUserLogin } from "../../redux/Slices/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { useLocation } from "react-router-dom";
import { locationUser } from "../../redux/Slices/persistSlice";
import validationLogin from "./validationLogin";

const Login = ({ setContainerLogin }) => {
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
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const propiedad = e.target.id;
    const valor = e.target.value;

    setForm({ ...form, [propiedad]: valor });
    setError(validationLogin({ ...form, [propiedad]: valor }))
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(fetchUserLogin(form));
    if (result) {
      setShowLogin(true);
      setShowLoginProfessional(false);
      setShowLoginClient(false);
    }
    setContainerLogin(false);
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
        width: "100%",
        height: "100vh",
        gap: "2",
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
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "column",
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
          <h2>Inicio Sesion</h2>
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
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "column",
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
          <h2>Inicio Sesion</h2>
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
        </Box>
      )}
    </div>
  );
};

export default Login;
