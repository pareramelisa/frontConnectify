import isoLogo from "./assets/logo.svg";
import connectifyLogo from "/connectify.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ClientRegister from "./components/register/clientRegister";

function App() {
  return (
    <>
      <div>
        <a
          href="https://github.com/GiseleCuello/Connectify/tree/main"
          target="_blank"
        >
          <img
            src={isoLogo}
            className="logo-spiner"
            alt="iso logo Connectify"
          />
        </a>
      </div>
      <img src={connectifyLogo} className="logo" alt="Connectify logo" />

      {/* <Routes>
        <Route
          path="/pruebaderegistro"
          element={
            <>
              <ClientRegister />
            </>
          }
        />
      </Routes> */}
    </>
  );
}

export default App;
