import React from "react";
import { Box, Button, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import { useState } from "react";
import { fetchUserLogin } from "../../redux/Slices/loginSlice";
import {useDispatch, useSelector} from 'react-redux'

const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.usersLogin.user)

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
  
  console.log(user);
  console.log(form);

  return (
    <>
      <h2>Inicio Sesion</h2>
      <Box
        component="form"
        onSubmit={onSubmit}
        autoComplete="off"
      >
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
    </>
  );
};

export default Login;
