import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Home from "./views/Home/Home"
import Login from './components/Login/Login';
import CreateAdForm from './components/CreateAds/createAds';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <>
      <div className="App">
        <Navbar/>
        {/* <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/createAds" element={<CreateAdForm/>} />
        </Routes> */}
      </div>
    </>
  );
}

export default App;
