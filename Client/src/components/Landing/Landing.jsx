import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import './Landing.css';
import Logo from '../../assets/connectify.svg'
import Logo2 from '../../assets/logo.svg'
import SearchBar from './Utils/Searchbar';
import { useAuth0 } from '@auth0/auth0-react'

function LandingPage() {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth0()

  const handlerLogoutGoogle = () => {
    logout()
  }

  return (
    <div className='container'>
      <div className='landing'>
        {isAuthenticated && (
          <Button
            variant="contained"
            color="primary"
            onClick={handlerLogoutGoogle}
            className='button'
          >
            Logout
          </Button>
        )}
        <div className='container-logo'>
          <img src={Logo2} alt='Logo' className='logo2' />
          <img src={Logo} alt='Logo' className='logo' />
        </div>
        <Typography variant="h5" color="#545454">
          Encuentra a los mejores profesionales para tus necesidades.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={!isAuthenticated ? () => { navigate("/login") } : () => { navigate("/home") }}
          className='button'
        >
          {!isAuthenticated ? "Ir a Login" : "Ir a Home"}
        </Button>
      </div>
      <SearchBar />
      <Button
        variant="contained"
        color="primary"
        onClick={() => { navigate("/login") }}
        className='button'
      >
        Accede a tu cuenta
      </Button>
    </div>
  );
}

export default LandingPage;
