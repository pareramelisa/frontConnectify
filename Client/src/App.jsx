import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Home from "./views/Home/Home"
import Login from './components/Login/Login';

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
