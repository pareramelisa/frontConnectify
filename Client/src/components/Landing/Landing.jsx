import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import './Landing.css';
import Logo from '../../assets/connectify.svg'
import Logo2 from '../../assets/logo.svg'
import SearchBar from './Utils/Searchbar';

function LandingPage() {
  
  const navigate = useNavigate();

  return (
    <div className='container'>
      <div className='landing'>
      <div className='container-logo'>
        <img src={Logo2} alt='Logo' className='logo2'/>
        <img src={Logo} alt='Logo' className='logo'/>
      </div>
      <Typography variant="h3">
      Encuentra a los mejores profesionales para tus necesidades.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={()=> {navigate("/login")}}
        className='button'
        >
        Ir al Login
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={()=> {navigate("/home")}}
        className='button'
        >
        Ir a la Página Principal
      </Button>
      <SearchBar/>
      </div>
      <div className='Card'>
      <img src='https://thegenuineleather.com/wp-content/uploads/2021/09/Money-Heist-El-Profesor-Black-Blazer.jpg' alt='Profe'></img>
      <span>Ely</span>
      <span>Profe de Ingles</span>
      <span>5.0</span>
      </div>
    </div>
  );
}

export default LandingPage;
