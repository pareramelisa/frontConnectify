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
import logo from "../../assets/logoTituloC001.png";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/Slices/loginSlice";
import style from './Navbar.module.css';
import carpetaEstrella from '../../assets/carpetaEstrella002.svg'

const settings = ["Perfil", "Historial Pagos", "Logout"];

function ResponsiveAppBar({ setContainerLogin }) {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [nickName, setNickName] = useState(null);

  const users = useSelector((state) => state.usersLogin.user);
  const favoriteCount = useSelector((state) => state.favorites.favoriteCount);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout, isAuthenticated } = useAuth0();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Funciones del Menu
  const handleAvatarButton = async (e) => {
    const text = e.target.textContent;

    if (text === "Perfil" && users.types === "client") {
      navigate(`/client/dashboard`);
    }

    if (text === "Perfil" && users.types === "professional") {
      navigate(`/professional/dashboardProf`);
    }

    if (text === "Perfil" && users.types === "admin") {
      navigate(`/admin/dashboard`);
    }

    if (text === "Historial Pagos" && location.pathname !== "/payments") {
      navigate(`/payments/${nickName}`);
    }

    if (text === "Logout" && users) {
      dispatch(logoutUser());
      navigate('/home')
    }

    if (text === "Logout" && isAuthenticated) {
      logout();
    }
  };

  const handlerButtonLogin = () => {
    setContainerLogin(true);
  };

  useEffect(() => {
    if (user && user.nickname) {
      setNickName(user.nickname);
    }else{
      setNickName(users.userName)
    }
  }, [user]);

  return (
    <AppBar position="static" style={{ marginBottom: "1.5rem" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div className={style.containerNav}>
            <Link to="/home">
              <img src={logo} alt="" className={style.logoNav} />
            </Link>
            
            <Box sx={{ flexGrow: 0 }}>
              {isAuthenticated || users.userName ? (
                <div>
                  {location.pathname !== "/home" && (
                    <Button className={style.buttonHome}
                      
                      onClick={() => navigate("/home")}
                      
                    >
                      Home
                    </Button>
                  )}
                  {users.types !== "admin" &&
                    users.types !== "professional" && (
                      <Badge
                        badgeContent={favoriteCount}
                        color="secondary"
                        style={{ marginRight: "1rem" }}
                      >
                        <button className={style.buttonCarpeta} onClick={() => navigate("/client/favorites")}>
                          <img className={style.imgCarpetaEstrella} src={carpetaEstrella} alt="" />
                        </button>
                      
                      </Badge>
                    )}

                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src={user ? user.picture : users ? users.image : null}
                      />
                    </IconButton>
                  </Tooltip>
                </div>
              ) : 
                location.pathname !== "/client/registration" && location.pathname !== "/professional/registration" ?
                (<Button
                  variant="contained"
                  color="primary"
                  onClick={handlerButtonLogin}
                  className={style.button}
                >
                  Login
                </Button>) :
                null
              }

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
                    <Typography textalign="center" onClick={handleAvatarButton}>
                      {setting === "Historial Pagos" && users.types === "client"
                        ? setting
                        : setting === "Historial Pagos" &&
                          (users.types === "admin" ||
                            users.types === "professional")
                        ? ""
                        : setting}
                    </Typography>
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
