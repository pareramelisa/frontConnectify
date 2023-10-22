import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import './Landing.css';
import Logo from '../../assets/connectify.svg'
import Logo2 from '../../assets/logo.svg'
import SearchBar from './Utils/Searchbar';
import HomeIcon from '@mui/icons-material/Home'

function LandingPage() {
  
  const navigate = useNavigate();

  return (
    <div className='container'>
      <div className='landing'>
      <div className='container-logo'>
        <img src={Logo2} alt='Logo' className='logo2'/>
        <img src={Logo} alt='Logo' className='logo'/>
      </div>
      <Typography variant="h5" color="#545454">
      Encuentra a los mejores profesionales para tus necesidades.
      </Typography>
      <div className="goHome" >
      <Button
        variant="outlined"
        color="secondary"
        onClick={()=> {navigate("/home")}}
        className='button'
        >
         <HomeIcon />
      </Button>
      </div>
      <SearchBar/>
      <Button
        variant="contained"
        color="primary"
        onClick={()=> {navigate("/login")}}
        className='button'
        >
        Accede a tu cuenta
      </Button>
      </div>
      
    </div>
  );
}

export default LandingPage;
