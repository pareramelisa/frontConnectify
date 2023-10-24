import React from "react";
import Logo from "../../assets/connectify.svg";
import style from "./Navbar.module.css";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const { logout, isAuthenticated } = useAuth0();

  const handlerLogoutGoogle = () => {
    logout();
  };

  return (
    <nav className={style.nav}>
      <div>
        <img src={Logo} alt="" />
      </div>
      <div>
        {isAuthenticated && (
          <ul className={style.ul}>
            <li>Favoritos</li>
            <li>Historial de Compras</li>
          </ul>
        )}
      </div>

      {isAuthenticated && (
        <div>
          <button>Perfil</button>
          <button onClick={handlerLogoutGoogle}>Salir</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

