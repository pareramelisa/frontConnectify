/* eslint-disable react-hooks/exhaustive-deps */
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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

  //* Estados globales
  const adsFiltered = useSelector(state => state.ads.adsFiltered);
  const ads = useSelector(state => state.ads.ads);
  const {isAuthenticated, user} = useAuth0()
  
  //* Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage] = useState(9);
  //para ir dividiendo los anuncios en paginas definimos los indices
  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  // Guardamos los anuncios que se van a mostrar de indice en indice
  const currentAds = adsFiltered.slice(indexOfFirstAd, indexOfLastAd);

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

  //* Función para aplicar los filtros
  const applyFilters = async () => {
    dispatch(
      fetchFilter({
        profession,
        locationProf,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      })
    );
    setCurrentPage(1);
  };

  //* Función para limpiar los filtros da error, por ahora comentada
  const clearFilters = (e) => {
    e.preventDefault();
    setProfession('');
    setLocationProf('');
    setPriceRange([1000, 10000]);
    dispatch(fetchAds());
  };

  //* constantes para el filtro por profesion y ubicación
  const uniqueProfessions = [...new Set(ads.map((ad) => ad.profession))];
  const uniqueLocations = [...new Set(ads.map((ad) => ad.location))];

  //* useEffect para actualizar el estado de los anuncios
  useEffect(() => {
    dispatch(locationUser(location.pathname));
    dispatch(fetchAds());
    if (isAuthenticated) {
      dispatch(fetchUserLoginWithGoogle({email: user.email}))
    }
  }, []);

  return (
    <div>
      <Navbar setContainerLogin={setContainerLogin} />
      {containerLogin ? <Login setContainerLogin={setContainerLogin} /> : null}
      <div className={styles.filterStyle}>
        <div>
          <FormControl sx={{ m: 1, minWidth: 140, maxWidth: 200 }}>
            <InputLabel>Profesion</InputLabel>
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
          <Fab
            color="primary"
            onClick={() => applyFilters()}
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
            onClick={(e) => clearFilters(e)}
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
              />
            ))}
          </div>
        ) : (
          <div>
            <img
              src="https://i.pinimg.com/originals/33/1c/3d/331c3d4d2200ab540675c1d56d96bba8.gif"
              alt="Obrero"
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
