import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import logo from "../../assets/connectify.svg";
import "./Navbar2.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/Slices/loginSlice";


const settings = ["Perfil", "Logout"];

function NavBarDemo2({ setContainerLogin }) {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const users = useSelector((state) => state.usersLogin.user);
  const dispatch = useDispatch();
  const location = useLocation()
  const navigate = useNavigate()

  const { user, logout, isAuthenticated } = useAuth0();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleAvatarButton = async (e) => {
    const text = e.target.textContent;

    if (text === "Logout") {
      await dispatch(logoutUser());
    }

    if (text === "Logout") {
      logout();
    }
  };

  const handlerButtonLogin = () => {
    setContainerLogin(true);
  };

  return (
    <AppBar position="static" style={{ marginBottom: "1.5rem" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div className="containerNav">
            <Link to="/">
              <img src={logo} alt="" className="logoNav" />
            </Link>
            
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBarDemo2;
