/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Navbar from '../../components/Navbar/Navbar'
import Login from "../../components/Login/Login";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { locationUser } from "../../redux/Slices/persistSlice";
// import SearchBar from "../../components/SearchBar/SearchBar";
import Professional from "../../components/Card/Professional";
import { fetchAds } from "../../redux/Slices/adsSlice";
import style from "./Home.module.css";
import Pagination from "../../components/Pagination/Pagination";
import { fetchFilter } from '../../redux/Slices/FiltersCombinedSlice';

const Home = () => {
  //* Declaraciones de variables
  const location = useLocation()
  const dispatch = useDispatch()
  
  //* Estados locales
  const [containerLogin, setContainerLogin] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [profession, setProfession] = useState("");
  const [locationProf, setLocationProf] = useState("");
  
  //* Estados globales
  const users = useSelector(state => state.usersLogin.user);
  const adsFiltered = useSelector(state => state.ads.adsFiltered);
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

  const handleMinPrice = (e) => {
    e.preventDefault();
    setMinPrice(e.target.value);
  };
  
  const handleMaxPrice = (e) => {
    e.preventDefault();
    setMaxPrice(e.target.value);
  };

  const handleProfession = (e) => {
    e.preventDefault();
    setProfession(e.target.value);
  };

  //* Función para aplicar los filtros
  const applyFilters = async () => {
    dispatch(fetchFilter({ profession, locationProf, minPrice, maxPrice }));
    setCurrentPage(1);
  };

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
    <label>Profesional: </label>
    <select onChange={handleProfession} value={profession}>
      <option value="">Seleccione una profesión</option>
      <option value="Plomero">Plomero</option>
      <option value="Panadero">Panadero</option>
      {/* Agrega opciones para todas las profesiones disponibles */}
    </select>
  </div>
  <div>
    <label>Ubicación: </label>
    <select onChange={handleLocation} value={locationProf}>
      <option value="">Seleccione una ubicación</option>
      <option value="Bogota">Bogota</option>
      <option value="Palermo">Palermo</option>
      {/* Agrega opciones para todas las ubicaciones disponibles */}
    </select>
  </div>
  <div>
    <label>Precio mínimo: </label>
    <input type="number" value={minPrice} onChange={handleMinPrice} />
  </div>
  <div>
    <label>Precio máximo: </label>
    <input type="number" value={maxPrice} onChange={handleMaxPrice} />
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
