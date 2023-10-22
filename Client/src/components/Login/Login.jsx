import React from "react";
import { Box, Button, TextField } from "@mui/material";
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

  const onSubmit = async (e) => {
    e.preventDefault()
    await dispatch(fetchUserLogin(form))
  }

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
          <TextField
            label="Type"
            variant="outlined"
            id="types"
            type="types"
            fullWidth
            onChange={handleChange}
            value={form.types}
          />
        </div>

        <Button variant="outlined" type="submit" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </>
  );
};

export default Login;
