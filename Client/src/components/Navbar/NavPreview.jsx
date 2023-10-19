import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar >
        <p>client</p>
        <Button color="inherit" component={Link} to="/home">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/login">
          Iniciar Sesión
        </Button>
        <Button color="inherit"  component={Link} to="/registrationClients">
          Registro de Clientes
        </Button>
        <Button color="inherit" component={Link} to="/favorites">
          Favoritos
        </Button>
        <Button color="inherit" component={Link} to="/detail/profesional_id">
          Detalle del Profesional
        </Button>
        <Button color="inherit" component={Link} to="/buyPage/profesional_id">
          Comprar
        </Button>
        <Button color="inherit" component={Link} to="/successPay">
          Pago Exitoso
        </Button>
        <Button color="inherit" component={Link} to="/accountClient">
          Cuenta de Cliente
        </Button>
        <Button color="inherit" component={Link} to="/purchases">
          Historial de Compras
        </Button>
        
        <Button color="inherit" component={Link} to="/">
          Salir
        </Button>
        
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
