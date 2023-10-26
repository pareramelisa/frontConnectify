import React, { useState, useEffect } from "react";
import Navbar from '../../components/Navbar/Navbar'
import Ads from "../../components/ProfessionalCard/ProfessionalCard";
import Login from "../../components/Login/Login";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { locationUser } from "../../redux/Slices/persistSlice";

const Home = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const [containerLogin, setContainerLogin] = useState(false)
  const users = useSelector(state => state.usersLogin.user)

  useEffect(() => {
    dispatch(locationUser(location.pathname));
  }, []);

  console.log(users);

  return (
    <div>
      <Navbar setContainerLogin={setContainerLogin}/>
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
      <Ads/>
    </div>
  );
};

export default Home;
