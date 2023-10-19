import { NavLink } from "react-router-dom";
import React from "react";
import "./Landing.css";

const Landing = () => {
    return (
        <>
        <div className="landing-container"> 
       
        <NavLink  to={'/home'}>
                    <button className="entrar">ENTRAR</button>
                </NavLink>
        </div>
        </>
    )
}

export default Landing;