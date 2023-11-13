import { Routes, Route } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing/Landing';
import Home from './views/Home/Home';
import CreateAdForm from './components/CreateAds/createAds';
import Detail from './components/AdsDetail/AdsDetail';
import Registration from './components/register/register';
import Favortites from './components/Favorites/Favorites';
import DashboardAdmin from './views/DashboardAdmin/DashboardAdmin';
import DashboardProf from './views/DashboardProf/DashboardProf';
import Payments from './components/ViewsPayments/ViewsPayments';
import ClientProfile from './views/DashboardClient/DashboardClient';
import Chat from './components/Chat/Chat';
import DashboardClient from './views/DashboardClient/DashboardClient';
import Team from './components/Footer/Team/Team';
import RequestPassword from './components/ResetPassword/RequestPassword/RequestPassword';
import ResetPassword from './components/ResetPassword/ResetPassword/ResetPassword';
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";

function App() {
  const users = useSelector((state) => state.usersLogin.user);

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/professional/dashboardProf"
            element={<DashboardProf />}
          />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/payments/:id" element={<Payments />} />
          <Route
            path="/professional/dashboardProf/createAds"
            element={<CreateAdForm />}
          />
          <Route path="/professional/registration" element={<Registration />} />
          <Route path="/client/registration" element={<Registration />} />
          <Route path="/client/favorites" element={<Favortites />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/client/profile" element={<ClientProfile />} />
          <Route path="/client/dashboard" element={<DashboardClient />} />
          <Route path="/ourTeam" element={<Team />} />
          <Route path="/password" element={<RequestPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {users.types === "admin" ? (
            <Route path="/admin/dashboard" element={<DashboardAdmin />} />
          ) : (
            <Route path="/admin/dashboard" element={<Landing />} />
          )}
          {/* <Route path="/admin/dashboard" element={<DashboardAdmin />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
