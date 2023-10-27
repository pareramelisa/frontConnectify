/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Navbar from '../../components/Navbar/Navbar'
import Login from "../../components/Login/Login";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { locationUser } from "../../redux/Slices/persistSlice";
import Professional from "../../components/Card/Professional";
import { fetchAds } from "../../redux/Slices/adsSlice";
import style from "./Home.module.css";
import Pagination from "../../components/Pagination/Pagination";
import { fetchFilter } from '../../redux/Slices/FiltersCombinedSlice';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const Home = () => {
  //* Declaraciones de variables
  const location = useLocation()
  const dispatch = useDispatch()
  
  //* Estados locales
  const [containerLogin, setContainerLogin] = useState(false);
  const [priceRange, setPriceRange] = useState([1000, 10000]);
  const [profession, setProfession] = useState("");
  const [locationProf, setLocationProf] = useState("");
  
  //* Estados globales
  const users = useSelector(state => state.usersLogin.user);
  const adsFiltered = useSelector(state => state.ads.adsFiltered);
  const ads = useSelector(state => state.ads.ads);
  console.log(users);

  //* Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage] = useState(9);
  //para ir dividiendo los anuncios en paginas definimos los indices
  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  // Guardamos los anuncios que se van a mostrar de indice en indice
  const currentAds = adsFiltered.slice(indexOfFirstAd, indexOfLastAd);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
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
    dispatch(fetchFilter({ profession, locationProf, minPrice: priceRange[0], maxPrice: priceRange[1] }));
    setCurrentPage(1);
  };

  //* constantes para el filtro por profesion y ubicación
  const uniqueProfessions = [...new Set(ads.map((ad) => ad.profession))];
  const uniqueLocations = [...new Set(ads.map((ad) => ad.location))];


  //* useEffect para actualizar el estado de los anuncios
  useEffect(() => {
    dispatch(locationUser(location.pathname));
    dispatch(fetchAds());
  }, [dispatch]);

  return (
    <div>
      <Navbar setContainerLogin={setContainerLogin}/>
      {containerLogin ? (
      <Login  setContainerLogin={setContainerLogin}/>
      ) : null}
      <div className={style.filterStyle}>
      <div>
    <label>Profesion: </label>
    <select onChange={handleProfession} value={profession}>
    {uniqueProfessions.map((profession) => (
    <option key={profession} value={profession}>
      {profession}
    </option>
     ))}
     </select>
  </div>
  <div>
    <label>Ubicación: </label>
    <select onChange={handleLocation} value={locationProf}>
      {uniqueLocations.map((locations) => (
        <option key={locations} value={locations}>
          {locations}
        </option>
      ))}
    </select>
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
    <button onClick={() => applyFilters()}>BUSCAR</button>
  </div>
  </div>
    <div className={style.container}>
    <div className={style.card}>
      {currentAds.map((ad) => (
        <Professional
          key={ad._id}
          id={ad._id}
          name={ad.creator[0].name}
          lastName={ad.creator[0].lastName}
          location={ad.creator[0].location}
          description={ad.description}
          price={ad.price}
          profession={ad.profession}
          image={ad.creator[0].image}
        />
      ))}
    </div>
    </div>
    <Pagination
      currentPage={currentPage}
      adsPerPage={adsPerPage}
      totalAds={adsFiltered.length}
      onPageChange={paginate}
      currentAds={currentAds}
    />
    </div>
  );
};

export default Home;
