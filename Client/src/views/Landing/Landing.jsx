import React from 'react';
import { NavLink } from 'react-router-dom';
import './Landing.css';
import { useDispatch } from 'react-redux';
import { setUserRole } from '../../redux/actions/userSlice';

const Landing = () => {
  const dispatch = useDispatch(); // Accede a la función dispatch para llamar a setUserRole

  const handleRoleChange = (role) => {
    dispatch(setUserRole(role));
  };

  return (
    <div className="landing-container">
      <NavLink to="/home">
        <button className="entrar" onClick={() => handleRoleChange('')}>
          Iniciar mi búsqueda (SearchBar)
        </button>
      </NavLink>
      <div>
        <NavLink to="/client/login">
          <button className="entrar" onClick={() => handleRoleChange('client')}>
            Ya soy cliente
          </button>
        </NavLink>

        <NavLink to="/client/registration">
          <button className="entrar">Soy nuevo Cliente</button>
        </NavLink>
      </div>

      <div>
        <NavLink to="/professional/login">
          <button className="entrar" onClick={() => handleRoleChange('expert')}>
            Ya soy Profesional
          </button>
        </NavLink>

        <NavLink to="/professional/registration">
          <button className="entrar" onClick={() => handleRoleChange('expert')}>
            Soy nuevo Profesional
          </button>
        </NavLink>
      </div>

      <NavLink to="/admin/login">
        <button className="entrar" onClick={() => handleRoleChange('admin')}>
          Login de Administrador
        </button>
      </NavLink>
    </div>
  );
};

export default Landing;
