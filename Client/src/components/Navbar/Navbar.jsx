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
import logo from "../../assets/logoTituloC001.png";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/Slices/loginSlice";
import style from './Navbar.module.css';
import carpetaEstrella from '../../assets/carpetaEstrella002.svg'


function ResponsiveAppBar({ setContainerLogin }) {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [nickName, setNickName] = useState(null);
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

    if (text === "Dashboard" && users === "client") {
      navigate(`/client/dashboard`);
    }

    if (text === "Dashboard" && users === "professional") {
      navigate(`/professional/dashboardProf`);
    }

    if (text === "Dashboard" && users === "admin") {
      navigate(`/admin/dashboard`);
    }

    if (text === "Historial Pagos" && location.pathname !== "/payments") {
      navigate(`/payments/${nickName}`);
    }

    if (text === "Logout" && usersLocal) {
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

  console.log(usersLocal.types);

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


  useEffect(() => {
    if (usersGoogle) {
      setNickName(usersGoogle.userName);
    }
    if(usersLocal){
      setNickName(usersLocal.userName)
    }
  }, [usersGoogle, usersLocal]);


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

                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src={user ? user.picture : usersLocal ? usersLocal.image : null}
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
                {
                  users === "admin" || users === "professional" ?
                  <ul className={style.menuAvatar} onClick={handleCloseUserMenu}>
                    <li onClick={handleAvatarButton}>Dashboard</li>
                    <li onClick={handleAvatarButton}>Logout</li>
                  </ul> :
                  users === "client" &&
                  <ul className={style.menuAvatar}>
                    <li onClick={handleAvatarButton}>Dashboard</li>
                    <li onClick={handleAvatarButton}>Historial Pagos</li>
                    <li onClick={handleAvatarButton}>Logout</li>
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