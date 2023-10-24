import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Home from "./views/Home/Home"
import Login from './components/Login/Login';
import Detail from './components/AdsDetail/AdsDetail';
import './App.css';

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path='/detail/:id' element={<Detail/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
