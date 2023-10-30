import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import "./Landing.css";
import Logo from "../../assets/connectify.svg";
import Logo2 from "../../assets/logo.svg";
import { useAuth0 } from "@auth0/auth0-react";
import { AiOutlineHome } from "react-icons/ai";
import { useEffect, useState } from "react";
import Login from "../Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { loginWithGoogle } from "../../redux/Slices/loginGoogleSlice";

function LandingPage() {
  const navigate = useNavigate();
  const users = useSelector((state) => state.usersLogin.user);
  const { isAuthenticated, user } = useAuth0();
  const [containerLogin, setContainerLogin] = useState(false);
  const dispatch = useDispatch();

  const handlerButtonLogin = () => {
    if (!isAuthenticated) {
      setContainerLogin(true);
    } else {
      navigate("/home");
    }
  };


  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loginWithGoogle(user.email))
      navigate('/home')
    }
  }, [dispatch, isAuthenticated, navigate]);

  return (
    <div className="container">
      {containerLogin ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            padding: "20px",
            background: "rgba(0,0,0,0.5)",
            zIndex: "10",
          }}
        >
          <Login  setContainerLogin={setContainerLogin}/>
        </div>
      ) : null}
      <div className="landing">
        <div className="container-logo">
          <img src={Logo2} alt="Logo" className="logo2" />
          <img src={Logo} alt="Logo" className="logo" />
        </div>
        <Typography variant="h5" color="#545454">
          Encuentra a los mejores profesionales para tus necesidades.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate("/home");
          }}
          className="button"
        >
          <AiOutlineHome style={{ fontSize: "2em" }} />
        </Button>
      </div>
      {
        !isAuthenticated && !users.name &&
        <Button
        variant="contained"
        color="primary"
        onClick={handlerButtonLogin}
        className="button"
      >
        Ir a Login
      </Button> 
      } 
     
    </div>
  );
}

export default LandingPage;
