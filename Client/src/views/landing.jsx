// import isoLogo from "./assets/logo.svg";
import isoLogo from "../assets/logo.svg";
import connectifyLogo from "../../public/connectify.svg";
import "../App.css";

const Landing = () => {
  return (
    <div>
      <a
        href="https://github.com/GiseleCuello/Connectify/tree/main"
        target="_blank"
      >
        <img src={isoLogo} className="logo-spiner" alt="iso logo Connectify" />
      </a>
      <img src={connectifyLogo} className="logo" alt="Connectify logo" />
    </div>
  );
};
export default Landing;
