/* eslint-disable react-hooks/exhaustive-deps */
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import Fab from '@mui/material/Fab';
import { IoMdRefresh } from 'react-icons/io';
import { MdPersonSearch } from 'react-icons/md';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Login from '../../components/Login/Login';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { locationUser } from '../../redux/Slices/persistSlice';
import Professional from '../../components/Card/Professional';
import { fetchAds } from '../../redux/Slices/adsSlice';
import styles from './Home.module.css';
import Pagination from '../../components/Pagination/Pagination';
import { fetchFilter } from '../../redux/Slices/FiltersCombinedSlice';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Footer from '../../components/Footer/Footer';
import Chat from '../../components/Chat/Chat';
import ButtonTop from '../../components/Utils/ButtonTop/ButtonTop';
import { useAuth0 } from '@auth0/auth0-react';
import { fetchUserLoginWithGoogle } from '../../redux/Slices/loginGoogleSlice';

const Home = () => {
  //* Declaraciones de variables
  const location = useLocation();
  const dispatch = useDispatch();

  //* Estados locales
  const [containerLogin, setContainerLogin] = useState(false);
  const [priceRange, setPriceRange] = useState([1000, 10000]);
  const [profession, setProfession] = useState('');
  const [locationProf, setLocationProf] = useState('');
  const [popUpLogin, setPopUpLogin] = useState(false);
  const [sortPrice, setSortPrice] = useState('');
  const [workLocation, setWorkLocation] = useState('');
  const [chatOpen, setChatOpen] = useState(false);

  //* Estados globales
  const adsFiltered = useSelector((state) => state.ads.adsFiltered);
  const ads = useSelector((state) => state.ads.ads);
  const { isAuthenticated, user } = useAuth0();
  //traer usuario ya después de iniciar sesión
  const nickname = user?.nickname || ''; // Usando operador opcional para evitar errores si no está definido
  //const email = user?.email || ''; Usar cuando se necesite el email

  //* Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage] = useState(9);
  //para ir dividiendo los anuncios en paginas definimos los indices
  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  // Guardamos los anuncios que se van a mostrar de indice en indice
  // const currentAds = adsFiltered.slice(indexOfFirstAd, indexOfLastAd);
  const currentAds = adsFiltered
    ? adsFiltered.slice(indexOfFirstAd, indexOfLastAd)
    : [];

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //* Filtros Combinados
  const handleLocation = (e) => {
    e.preventDefault();
    setLocationProf(e.target.value);
  };

  const handleProfession = (e) => {
    e.preventDefault();
    setProfession(e.target.value);
  };

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
  };

  const handleRemoteWork = (e) => {
    setWorkLocation(e.target.value);
  };

  const handlesortPrice = (e) => {
    e.preventDefault();
    setSortPrice(e.target.value);
  };

  //* Función para aplicar los filtros
  const applyFilters = async () => {
    dispatch(
      fetchFilter({
        profession,
        locationProf,
        workLocation,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        sortPrice,
      })
    );
  };

  //* Función para limpiar los filtros da error, por ahora comentada
  const clearFilters = (e) => {
    e.preventDefault();
    setProfession('');
    setLocationProf('');
    setSortPrice('');
    setPriceRange([1000, 10000]);
    setWorkLocation('');
    dispatch(fetchAds());
  };

  //* Función para abrir el chat
  // Función para alternar la visibilidad del chat
  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  //* constantes para el filtro por profesion y ubicación
  const uniqueProfessions = [...new Set(ads.map((ad) => ad.profession))];
  const uniqueLocations = [...new Set(ads.map((ad) => ad.location))];

  //* useEffect para actualizar el estado de los anuncios
  useEffect(() => {
    dispatch(locationUser(location.pathname));
    if (isAuthenticated) {
      dispatch(fetchUserLoginWithGoogle({ email: user.email }));
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (adsFiltered.length < 1) {
      dispatch(fetchAds());
    }
  }, []);

  const handlerCloseLoginPopUp = () => {
    setPopUpLogin(false);
  };

  console.log(currentAds);
  console.log(ads);

  return (
    <div>
      <Navbar setContainerLogin={setContainerLogin} />
      {containerLogin ? (
        <Login
          setContainerLogin={setContainerLogin}
          setPopUpLogin={setPopUpLogin}
        />
      ) : null}
      {popUpLogin && (
        <div
          style={{
            position: 'absolute',
            width: '25rem',
            height: '10rem',
            top: '38%',
            left: '36%',
            border: '2px solid black',
            borderRadius: '20px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.9)',
            zIndex: '1000',
          }}
        >
          <IconButton
            disableElevation
            style={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              color: '#000000',
              fontWeight: 'bold',
            }}
            onClick={handlerCloseLoginPopUp}
          >
            <CancelRoundedIcon />
          </IconButton>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <h3>Email y/o Password incorrectos</h3>
          </div>
        </div>
      )}
      <div className={styles.filterStyle}>
        <div>
          <FormControl sx={{ m: 1, minWidth: 140, maxWidth: 200 }}>
            <InputLabel
              sx={{
                '&:focus-within': {
                  '& ~ .MuiInputLabel-root': {
                    marginTop: '-0.8em',
                  },
                },
              }}
            >
              Profesion
            </InputLabel>
            <Select
              id="ProfesionSearch"
              onChange={handleProfession}
              value={profession}
            >
              {uniqueProfessions.map((profession) => (
                <MenuItem key={profession} value={profession}>
                  {profession}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 1, minWidth: 140, maxWidth: 200 }}>
            <InputLabel>Ciudad</InputLabel>
            <Select
              id="LocationSearch"
              onChange={handleLocation}
              value={locationProf}
            >
              {uniqueLocations.map((locations) => (
                <MenuItem key={locations} value={locations}>
                  {locations}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <label>Selecciona un rango de precios:</label>
          <div>
            <span>${priceRange[0]}</span> - <span>${priceRange[1]}</span>
          </div>
          <Slider
            range
            min={1000}
            max={10000}
            step={100}
            value={priceRange}
            onChange={handlePriceRangeChange}
          />
        </div>
        <div>
          <FormControl sx={{ m: 1, minWidth: 170, maxWidth: 200 }}>
            <InputLabel>Orden por Precio</InputLabel>
            <Select id="sortPrice" onChange={handlesortPrice} value={sortPrice}>
              <MenuItem value="asc">Ascendente</MenuItem>
              <MenuItem value="desc">Descendente</MenuItem>
            </Select>
          </FormControl>
        </div>
        <FormControl sx={{ m: 1, minWidth: 170, maxWidth: 200 }}>
          <InputLabel>Trabajo</InputLabel>
          <Select
            id="workLocation"
            onChange={handleRemoteWork}
            value={workLocation}
          >
            <MenuItem value="Remoto">Remoto</MenuItem>
            <MenuItem value="Presencial">Presencial</MenuItem>
          </Select>
        </FormControl>
        <div>
          <Fab
            color="primary"
            onClick={applyFilters}
            style={{
              zIndex: '1',
            }}
          >
            <MdPersonSearch style={{ fontSize: '2.5em' }} />
          </Fab>
        </div>
        <div>
          <Fab
            color="primary"
            className={styles.spinButton}
            onClick={clearFilters}
            style={{
              zIndex: '1',
            }}
          >
            <IoMdRefresh style={{ fontSize: '2em' }} />
          </Fab>
        </div>
      </div>
      <div className={styles.container}>
        {currentAds.length !== 0 && adsFiltered.length !== 0 ? (
          <div className={styles.card}>
            {currentAds.map((ad) => (
              <Professional
                key={ad._id}
                id={ad._id}
                name={ad.creator[0].name}
                lastName={ad.creator[0].lastName}
                location={ad.location}
                description={ad.description}
                price={ad.price}
                profession={ad.profession}
                image={ad.creator[0].image}
                setContainerLogin={setContainerLogin}
              />
            ))}
          </div>
        ) : (
          <div>
            <img
              src="https://i.pinimg.com/originals/33/1c/3d/331c3d4d2200ab540675c1d56d96bba8.gif"
              alt="Obrero"
              style={{ width: '500px' }}
            />
            <h2
              style={{
                paddingLeft: '3.5em',
                paddingBottom: '5em',
              }}
            >
              No se encontraron Anuncios
            </h2>
          </div>
        )}
      </div>
      <div className={styles.buttonContainer}>
        <ButtonTop />
      </div>
      {isAuthenticated ? (
        <button
          className="open-chat-button"
          onClick={toggleChat}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 9999, // Asegura que el botón del chat aparezca por encima de otros contenidos
          }}
        >
          Abrir Chat
        </button>
      ) : null}
      {chatOpen && <Chat nickname={nickname} />}
      {currentAds.length !== 0 && adsFiltered.length !== 0 ? (
        <Pagination
          currentPage={currentPage}
          adsPerPage={adsPerPage}
          totalAds={adsFiltered.length}
          onPageChange={paginate}
          currentAds={currentAds}
        />
      ) : null}
      <Footer />
    </div>
  );
};

export default Home;
