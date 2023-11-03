import React, { useEffect, useState } from "react";
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
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import logo from "../../assets/connectify.svg";
import "./Navbar.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/Slices/loginSlice";
import BookIcon from '@mui/icons-material/Book';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';

const settings = ["Perfil", "Historial Pagos", "Logout"];

function ResponsiveAppBar({ setContainerLogin }) {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [nickName, setNickName] = useState(null);

  const users = useSelector((state) => state.usersLogin.user);
  const favoriteCount = useSelector((state) => state.favorites.favoriteCount);
  const favorite = useSelector((state) => state.favorites.favoriteProfessionals);
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

    if (text === "Perfil" && users.types === 'client') {
      navigate(`/client/dashboard`)
    }

    if (text === "Perfil" && users.types === 'professional') {
      navigate(`/professional/dashboardProf`)
    }

    if (text === "Perfil" && users.types === 'admin') {
      navigate(`/admin/dashboard`)
    }

    if (text === 'Historial Pagos' && location.pathname !== "/payments") {
      navigate(`/payments/${nickName}`)
    }
    
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



  useEffect(()=>{
    console.log("USERUSER...", user);
    if (user && user.nickname) {
      setNickName(user.nickname);
    }
  },[user])


  return (
    <AppBar position="static" style={{ marginBottom: "1.5rem" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div className="containerNav">
            <Link to="/">
              <img src={logo} alt="" className="logoNav" />
            </Link>
            <Box
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            ></Box>
            <Box sx={{ flexGrow: 0 }}>
              {isAuthenticated || users.name ? (
                <div>
                  {
                    (location.pathname !== "/home") &&(
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/home')}
                    style={{
                      marginRight: '1rem'
                    }}
                  >
                    Home
                  </Button>
                  )}

                <Badge badgeContent={favoriteCount} color="secondary" style={{marginRight: '1rem'}}>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/client/favorites')}
                  >
                    <FolderSpecialIcon></FolderSpecialIcon>
                  </Button>
                </Badge>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src={user ? user.picture : users ? users.image : null}
                      />
                    </IconButton>
                  </Tooltip>
                </div>
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
                    <Button textalign="center" onClick={handleAvatarButton}>
                      {setting}
                    </Button>
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
