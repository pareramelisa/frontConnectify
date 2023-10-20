// import isoLogo from "./assets/logo.svg";
// import connectifyLogo from "/connectify.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ClientRegister from "./components/register/clientRegister";
import Landing from "./views/landing/landing";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Landing />
            </>
          }
        />
        <Route
          path="/pruebaderegistro"
          element={
            <>
              <ClientRegister />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
