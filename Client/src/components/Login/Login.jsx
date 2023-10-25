import {
  Box,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Typography,
  IconButton
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";
import { fetchUserLogin } from "../../redux/Slices/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

const Login = ({ setContainerLogin }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.usersLogin.user);
  const [showLogin, setShowLogin] = useState(false);
  const [showLoginClient, setShowLoginClient] = useState(false);
  const [showLoginProfessional, setShowLoginProfessional] = useState(false);

  const navigate = useNavigate();

  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const [form, setForm] = useState({
    email: "",
    password: "",
    types: "",
  });

  const [error, setError] = useState({
    errorEmail: false,
    errorPassword: false,
    messageEmail: "",
    messagePassword: "",
  });

  const handleChange = (e) => {
    const propiedad = e.target.id;
    const valor = e.target.value;

    setForm({ ...form, [propiedad]: valor });
  };

  const handleChangeType = (e) => {
    const propiedad = "types";
    const valor = e.target.defaultValue;

    setForm({ ...form, [propiedad]: valor });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(fetchUserLogin(form));
    navigate(-1)
  };

  const handlerLoginGoogle = () => {
    loginWithRedirect();
  };

  const handleShowClient = () => {
    setShowLogin(true);
    setShowLoginClient(true);
  };

  const handleShowProfessional = () => {
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
      setShowLoginClient(false)
      setShowLogin(false);
      setContainerLogin(true);
    }else{
      setShowLoginProfessional(false);
      setShowLogin(false);
      setContainerLogin(true);
    }
  }

  console.log(user);
  console.log(form);

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
              fontWeight: 'bold',
            }}
            onClick={handlerCloseLogin}
          >
            <CancelRoundedIcon/>
          </IconButton>
          <Button
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
            position: 'relative',
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
              fontWeight: 'bold',
            }}
            onClick={handlerCloseLogin}
          >
            <CancelRoundedIcon/>
          </IconButton>
          <IconButton
            disableElevation
            style={{
              position: "absolute",
              top: "5px",
              left: "5px",
              color: "#000000",
              fontWeight: 'bold',
            }}
            onClick={handlerBackLogin}
          >
            <ArrowCircleLeftIcon/>
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
                required
                onChange={handleChange}
                value={form.email}
              />
              <span>Esto es un span</span>
              <TextField
                label="Password"
                variant="outlined"
                id="password"
                type="password"
                fullWidth
                required
                onChange={handleChange}
                value={form.password}
              />
              <span>Esto es un span</span>
            </div>
            <div>
              <FormControl>
                <FormLabel id="user-login">
                  <RadioGroup
                    defaultValue="Cliente"
                    name="radio-buttons-user-login"
                    row
                    onChange={handleChangeType}
                  >
                    <FormControlLabel
                      value="client"
                      id="types"
                      control={<Radio />}
                      label="Cliente"
                    />
                    <FormControlLabel
                      value="professional"
                      id="types"
                      control={<Radio />}
                      label="Profesional"
                    />
                  </RadioGroup>
                </FormLabel>
              </FormControl>
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
            position: 'relative',
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
              fontWeight: 'bold',
            }}
            onClick={handlerCloseLogin}
          >
            <CancelRoundedIcon/>
          </IconButton>
          <IconButton
            disableElevation
            style={{
              position: "absolute",
              top: "5px",
              left: "5px",
              color: "#000000",
              fontWeight: 'bold',
            }}
            onClick={handlerBackLogin}
          >
            <ArrowCircleLeftIcon/>
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
                required
                onChange={handleChange}
                value={form.email}
              />
              <span>Esto es un span</span>
              <TextField
                label="Password"
                variant="outlined"
                id="password"
                type="password"
                fullWidth
                required
                onChange={handleChange}
                value={form.password}
              />
              <span>Esto es un span</span>
            </div>
            <div>
              <FormControl>
                <FormLabel id="user-login">
                  <RadioGroup
                    defaultValue="Cliente"
                    name="radio-buttons-user-login"
                    row
                    onChange={handleChangeType}
                  >
                    <FormControlLabel
                      value="client"
                      id="types"
                      control={<Radio />}
                      label="Cliente"
                    />
                    <FormControlLabel
                      value="professional"
                      id="types"
                      control={<Radio />}
                      label="Profesional"
                    />
                    <FormControlLabel
                      value="admin"
                      id="types"
                      control={<Radio />}
                      label="Administrador"
                    />
                  </RadioGroup>
                </FormLabel>
              </FormControl>
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
