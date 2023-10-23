import React from 'react';
import style from './SearchBar.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { setSelectedCiudad } from '../../../redux/Slices/searchSlice';
import axios from 'axios';
// import miApi from "../../../../localidades.json";
import LocationSelector from '../LocationSelector/LocationSelector';


function SearchBar() {

  const [searchBox, setSearchBox] = useState("");
  const [searchData, setSearchData] = useState("");

  const selectedCiudad = useSelector((state) => state.search.selectedCiudad);

  const sendSearch = async () => {
    const search = await axios.get(`http://localhost:3001/ads/filters?profession=${searchBox}&location=${selectedCiudad}`);
    setSearchData(search.data);
  }

useEffect(()=>{
    console.log("DATOS RECIBIDOS: ", searchData);
},[searchData])


  return (
    <div className={style.container}>
      
      <div className={style.contInput}>
        <label>Profesional: </label>
        <input className={style.input} type="text" name="searchProf" id="searchProf" value={searchBox} onChange={(event) => setSearchBox(event.target.value)} />
      </div>
      
      <LocationSelector /> 
      
      <div>
        <button onClick={sendSearch}>BUSCAR</button>
      </div>
    </div>
  );

  
}

export default SearchBar;