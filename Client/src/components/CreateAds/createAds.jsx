import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAd } from '../../redux/Slices/createAdsSlice';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Button, Divider, Grid, InputLabel, Paper } from '@mui/material';
import NavBar from '../../components/Navbar/Navbar';
import Footer from '../Footer/Footer';
import { fetchAds } from '../../redux/Slices/adsSlice';
import Notification from './Notification/Notification';
import ButtonBack from '../Utils/ButtonBack/ButtonBack';
import {
  isValidTitle,
  isValidPrice,
  isValidDescription,
} from './AdsValidations';

function CreateAdForm() {
  const dispatch = useDispatch();
  const [showNotification, setShowNotification] = useState(false);
  const [idAnuncio, setIdAnuncio] = useState('');
  const [hasReachedLimit, setHasReachedLimit] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    title: '',
    price: '',
    description: '',
  });
  const user = useSelector((state) => state.usersLogin.user);

  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem('formData');
    return savedFormData
      ? JSON.parse(savedFormData)
      : {
          title: '',
          description: '',
          price: '',
          contractType: '',
          workLocation: '',
        };
  });

  const isFormFilled = Object.values(formData).every((value) => value !== '');

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (fieldName, value) => {
    let validation;

    switch (fieldName) {
      case 'title':
        validation = isValidTitle(value);
        break;
      case 'price':
        validation = isValidPrice(value);
        break;
      case 'description':
        validation = isValidDescription(value);
        break;
      default:
        validation = { isValid: true, errorMessage: '' };
    }

    if (!validation.isValid) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: validation.errorMessage,
      }));
      return;
    }

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: '',
    }));

    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInput = {
      ...formData,
      creator: user._id,
      price: Number(formData.price),
      profession: user.profession[0],
      location: user.province[0],
    };

    try {
      const response = await dispatch(createAd(userInput));
      if (response.payload && response.payload._id) {
        // Éxito al crear el anuncio
        setIdAnuncio(response.payload._id);
        setShowNotification(true);
        dispatch(fetchAds());
      } else {
        // Manejar el caso en el que response.payload es undefined o no tiene _id
        console.error(
          'Error al crear el anuncio:',
          'No puede crear mas de 2 anuncios'
        );
        setHasReachedLimit(true);
      }
    } catch (error) {
      console.error('Error al crear el anuncio:', error);
    }
  };

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div style={{ marginLeft: '50px' }}>
        <ButtonBack />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '30px',
            marginBottom: '20px',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 300,
          }}
        >
          Crea tu anuncio
        </h1>
      </div>
      <Divider />
      <Grid
        container
        justifyContent="center"
        sx={{ paddingBottom: 25, paddingTop: 4 }}
      >
        <Grid item xs={10}>
          <Paper elevation={3} sx={{ padding: 10, boxShadow: 10 }}>
            <form style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
              <Grid container spacing={5}>
                <Grid item xs={6} style={{ textAlign: 'left' }}>
                  <TextField
                    label="Título"
                    variant="standard"
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                  {validationErrors.title && (
                    <p style={{ color: 'red' }}>{validationErrors.title}</p>
                  )}
                  <TextField
                    label="Precio"
                    variant="standard"
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    required
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                  {validationErrors.province && (
                    <p style={{ color: 'red' }}>{validationErrors.price}</p>
                  )}
                  <InputLabel id="contractType">
                    Tipo de contratación
                  </InputLabel>
                  <Select
                    label="Tipo de contratación"
                    variant="standard"
                    name="contractType"
                    value={formData.contractType}
                    onChange={(e) =>
                      handleInputChange('contractType', e.target.value)
                    }
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  >
                    <MenuItem value="Full-time">Full-time</MenuItem>
                    <MenuItem value="Part-time">Part-time</MenuItem>
                    <MenuItem value="Freelance">Freelance</MenuItem>
                    <MenuItem value="Other">Otro</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={6} style={{ textAlign: 'left' }}>
                  <TextField
                    label="Descripción"
                    variant="standard"
                    multiline
                    rows={3}
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange('description', e.target.value)
                    }
                    required
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                  {validationErrors.description && (
                    <p style={{ color: 'red' }}>
                      {validationErrors.description}
                    </p>
                  )}
                  <InputLabel id="workLocation">
                    Modalidad de trabajo:
                  </InputLabel>
                  <Select
                    label="Modalidad de trabajo"
                    variant="standard"
                    name="workLocation"
                    value={formData.workLocation}
                    onChange={(e) =>
                      handleInputChange('workLocation', e.target.value)
                    }
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  >
                    <MenuItem value="Presencial">Presencial</MenuItem>
                    <MenuItem value="Remoto">Remoto</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <div style={{ paddingTop: '40px' }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!isFormFilled || hasReachedLimit}
                >
                  Crear anuncio
                </Button>
                {hasReachedLimit && (
                  <p style={{ color: 'red', marginTop: '10px' }}>
                    Has alcanzado el límite de anuncios (máximo 2).
                  </p>
                )}
                {showNotification && <Notification anuncio={idAnuncio} />}
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default CreateAdForm;
