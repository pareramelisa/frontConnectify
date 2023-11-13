/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import style from "./Professional.module.css";

import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";

const Professional = ({
  id,
  name,
  location,
  description,
  profession,
  image,
  setContainerLogin,
}) => {
  const fullName = `${name}`;

  const { isAuthenticated } = useAuth0();
  const users = useSelector((state) => state.usersLogin.user);
  const navigate = useNavigate();

  const handlerLogin = () => {
    if (isAuthenticated || users.name) {
      return navigate(`/detail/${id}`);
    }
    setContainerLogin(true);
  };

  return (

    <div className={style.backgroundContainer}>

    <div className={style.cardStyle} >
    <div  onClick={handlerLogin}>

      <img className={style.profilePic} src={image} alt="prueba"  />

      <h4 className={style.h3}>{fullName}</h4>

      <h6 className={style.h4}>{location}</h6>

      <h4 className={style.h5}>{profession}</h4>
      
      
       <p className={style.description}>{description}</p> 
    </div>
    </div>
  
    </div>
  
  );
};

export default Professional;
