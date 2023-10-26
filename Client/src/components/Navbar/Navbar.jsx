import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../../assets/connectify.svg";
import "./Navbar.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/Slices/loginSlice";


const settings = ["Dashboard", "Profile", "Logout"];

function ResponsiveAppBar({setContainerLogin}) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  
  const navigate = useNavigate()
  const users = useSelector(state => state.user)
  const dispatch = useDispatch()

  const {user, logout, isAuthenticated } = useAuth0();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlerLogoutGoogle = () => {
    navigate('/login')
  }

  const handleAvatarButton = async (e) => {
    const text = e.target.textContent

    if (users) {
      await dispatch(logoutUser())
    }

    if (text === 'Logout') {
      logout()
    }
  }

  const handlerButtonLogin = () => {
    setContainerLogin(true);
  };

  console.log(user);
  console.log(users);

  return (
    <AppBar position="static" style={{marginBottom: '1.5rem'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div className="containerNav">
            <img src={logo} alt="" className="logoNav" />
            <Box
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            ></Box>
            <Box sx={{ flexGrow: 0 }}>
              {isAuthenticated || users ? (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src={user?.picture}
                    />
                  </IconButton>
                </Tooltip>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlerButtonLogin}
                  className="button"
                >
                  Ir a Login
                </Button>
              )}

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Button textAlign="center" onClick={handleAvatarButton}>{setting}</Button>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
