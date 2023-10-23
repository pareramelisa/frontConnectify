import { Box, Button, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import { useState } from "react";
import { fetchUserLogin } from "../../redux/Slices/loginSlice";
import {useDispatch, useSelector} from 'react-redux';
import {useAuth0} from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.usersLogin.user)

  const navigate = useNavigate();

  const {loginWithRedirect, isAuthenticated } = useAuth0()

  console.log(isAuthenticated);

  const [form, setForm] = useState({
    email: "",
    password: "",
    types: ""
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
    const propiedad = 'types'
    const valor = e.target.defaultValue;

    setForm({ ...form, [propiedad]: valor });
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    await dispatch(fetchUserLogin(form))
  }

  const handlerLoginGoogle = () => {
    loginWithRedirect()
  }

  
  console.log(user);
  console.log(form);

  return (
    <div style={{display: "flex", alignItems: "center", padding: "3em", flexDirection: "column"}}>
      <h2>Inicio Sesion</h2>
      <Box
        component="form"
        onSubmit={onSubmit}
        autoComplete="off"
      >
        {
          !isAuthenticated && (
          <div>
          <Button variant="contained" disableElevation startIcon={<GoogleIcon/>} onClick={handlerLoginGoogle}>Google</Button>
          </div>
          )
        }
        
        <div>
          <TextField
            label="Email"
            variant="outlined"
            id="email"
            type="email"
            fullWidth
            required
            error={error.errorEmail}
            helperText={error.messageEmail}
            onChange={handleChange}
            value={form.email}
          />
          <TextField
            label="Password"
            variant="outlined"
            id="password"
            type="password"
            fullWidth
            required
            error={error.errorPassword}
            helperText={error.messagePassword}
            onChange={handleChange}
            value={form.password}
          />
          <FormControl>
            <FormLabel id="user-login">
              <RadioGroup defaultValue='Cliente' name="radio-buttons-user-login" row onChange={handleChangeType}>
                <FormControlLabel value='client' id="types" control={<Radio/>} label='Cliente' />
                <FormControlLabel value='professional' id="types" control={<Radio/>} label='Profesional' />
                <FormControlLabel value='admin' id="types" control={<Radio/>} label='Administrador' />
              </RadioGroup>
            </FormLabel>
          </FormControl>
        </div>

        <Button variant="outlined" type="submit" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default Login;
