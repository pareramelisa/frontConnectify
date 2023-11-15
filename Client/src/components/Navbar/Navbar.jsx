/* eslint-disable react/prop-types */
import  { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
// import logo from "../../assets/LogoLetrasFondoBlanco.png";
import logo from "../../assets/logoTituloC001.png";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/Slices/loginSlice";
import style from './Navbar.module.css';
import carpetaEstrella from '../../assets/carpetaEstrella002.svg'
import { logoutGoogle } from "../../redux/Slices/loginGoogleSlice";


function ResponsiveAppBar({ setContainerLogin }) {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [users, setUsers] = useState('')

  const usersLocal = useSelector((state) => state.usersLogin.user);
  const usersGoogle = useSelector((state) => state.googleLogin.user);

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

    if (text === "Mi Panel" && users === "client") {
      navigate(`/client/dashboard`);
    }

    if (text === "Mi Panel" && users === "professional") {
      navigate(`/professional/dashboardProf`);
    }

    if (text === "Mi Panel" && users === "admin") {
      navigate(`/admin/dashboard`);
    }

    if (text === "Historial de Pagos" && location.pathname !== "/payments") {
      const nickNameGoogle = usersGoogle && usersGoogle.userName
      const nickNameLocal = usersLocal && usersLocal.userName
      if (nickNameGoogle) {
        navigate(`/payments/${nickNameGoogle}`);
      }
      if (nickNameLocal) {
        navigate(`/payments/${nickNameLocal}`);
      }
    }
    if (text === "Salir" && usersLocal) {
      await dispatch(logoutUser());
        navigate('/home');
    }

    if (text === "Salir" && isAuthenticated) {
      await dispatch(logoutGoogle())
      logout();
    }
  };

  const handlerButtonLogin = () => {
    setContainerLogin(true);
  };

  useEffect(() => {
    if (usersGoogle) {
      setUsers(usersGoogle.types)
    }

    if (usersLocal.types === 'client') {
      setUsers('client')
    }

    if (usersLocal.types === 'professional') {
      setUsers('professional')
    }

    if (usersLocal.types === 'admin') {
      setUsers('admin')
    }
    
  }, [usersLocal, usersGoogle])


  return (
    <AppBar position="static" style={{ marginBottom: "1.5rem" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div className={style.containerNav}>
            <Link to="/">
              <img src={logo} alt="" className={style.logoNav} />
            </Link>
            
            <Box sx={{ flexGrow: 0 }}>
              {isAuthenticated || usersLocal.userName ? (
                <div>
                  {location.pathname !== "/home" && (
                    <button className={style.buttonHome} onClick={() => navigate("/home")}>Home</button>
                  )}
                  {users !== "admin" &&
                    users !== "professional" && (
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
                  
                  {users === "client" && (
                  <Tooltip title="CLIENTE">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src={user ? user.picture : usersLocal ? usersLocal.image : null}
                      />
                    </IconButton>
                  </Tooltip>
                  )}
                  
                  {users === "professional" && (
                  <Tooltip title="PROFESIONAL">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src={user ? user.picture : usersLocal ? usersLocal.image : null}
                      />
                    </IconButton>
                  </Tooltip>
                  )}
                
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
                {
                  users === "admin" || users === "professional" ?
                  <ul className={style.menuAvatar} onClick={handleCloseUserMenu}>
                    <li onClick={handleAvatarButton}>Mi Panel</li>
                    <li onClick={handleAvatarButton}>Salir</li>
                  </ul> :
                  users === "client" &&
                  <ul className={style.menuAvatar} onClick={handleCloseUserMenu}>
                    <li onClick={handleAvatarButton}>Mi Panel</li>
                    <li onClick={handleAvatarButton}>Historial de Pagos</li>
                    <li onClick={handleAvatarButton}>Salir</li>
                  </ul>
                }
                
              </Menu>
            </Box>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;