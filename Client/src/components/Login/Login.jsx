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
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";
import { fetchUserLogin } from "../../redux/Slices/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.usersLogin.user);
  const [showLogin, setShowLogin] = useState(false);
  const [showLoginClient, setShowLoginClient] = useState(false);

  const navigate = useNavigate();

  const { loginWithRedirect, isAuthenticated } = useAuth0();

  console.log(isAuthenticated);

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
  };

  const handlerLoginGoogle = () => {
    loginWithRedirect();
  };

  const handleShowClient = () => {
    setShowLogin(true)
    setShowLoginClient(true)
  }

  const handleShowProfessional = () => {
    setShowLogin(true)
    
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
        gap: 100,
      }}
    >
      {!showLogin ? (
        <div
          style={{
            width: "30rem",
            height: "20rem",
            border: "2px solid black",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
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
      ) : (
        <>
          {showLoginClient ? (
            <>
              <h2>Inicio Sesion</h2>
              <Box component="form" onSubmit={onSubmit} autoComplete="off">
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
            </>
          ) : (
            <>
              <h2>Inicio Sesion</h2>
              <Box component="form" onSubmit={onSubmit} autoComplete="off">
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
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Login;
