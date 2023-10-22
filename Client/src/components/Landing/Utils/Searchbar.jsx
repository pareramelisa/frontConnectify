import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { TextField, Button, Menu, MenuItem } from '@mui/material';
import './Searchbar.css';

const SearchBar = () => {
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [profession, setProfession] = useState('');
  const [location, setLocation] = useState('');
  const options1 = ['Plomero', 'Electricista', 'Profesor', 'Programador', 'Mecánico'];
  const options2 = ['Colombia', 'Ecuador', 'Argentina', 'Chile'];

  const navigate = useNavigate();

  const handleOpen1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = (option) => {
    setAnchorEl1(null);
    if (option) {
      setProfession(option);
    }
  };

  const handleOpen2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = (option) => {
    setAnchorEl2(null);
    if (option) {
      setLocation(option);
    }
  };

  const handleSearch = () => {
    if(!profession) {
      navigate(`/search/${location}`);
    } else {
      navigate(`/search/${profession}/${location}`);
    }
  };

  return (
    <div className="search">
      <div className='container-inputs'>
        <TextField
          type="text"
          value={profession}
          onClick={handleOpen1}
          label="Selecciona una opción"
          variant="outlined"
        />
        <Menu
          anchorEl={anchorEl1}
          open={Boolean(anchorEl1)}
          onClose={() => handleClose1(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          {options1.map((option) => (
            <MenuItem
              key={option}
              onClick={() => handleClose1(option)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
      <div className='container-inputs'>
        <TextField
          type="text"
          value={location}
          onClick={handleOpen2}
          label="Selecciona una opción"
          variant="outlined"
        />
        <Menu
          anchorEl={anchorEl2}
          open={Boolean(anchorEl2)}
          onClose={() => handleClose2(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          {options2.map((option) => (
            <MenuItem
              key={option}
              onClick={() => handleClose2(option)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
      <Button variant="contained" onClick={handleSearch} className='submit'>
        Buscar
      </Button>
    </div>
  );
};

export default SearchBar;
