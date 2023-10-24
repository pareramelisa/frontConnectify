import style from './LocationSelector.module.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCiudad, setSelectedProvincia } from '../../../../redux/Slices/searchSlice';

import miApi from "../../../../../localidades.json";


function LocationSelectors() {
  const [provincias, setProvincias] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [selectedProv, setSelectedProv] = useState("Filtro de Prov.");

  const selectedCiudad = useSelector((state) => state.search.selectedCiudad);
  const dispatch = useDispatch();

  const handlerProvincias = (event) => {
    const provincia = event.target.value;
    setSelectedProv(provincia);
    dispatch(setSelectedProvincia(provincia));
  }

  useEffect(() => {
    const city = miApi.localidades.filter((ciudad) => {
      return ciudad.provincia.nombre === selectedProv;
    });
    const sortedCities = [...new Set(city)].sort((a, b) => a.nombre.localeCompare(b.nombre));
    setCiudades(sortedCities);
  }, [selectedProv]);

  useEffect(() => {
    const prov = miApi.localidades.map((provincia) => {
      return provincia.provincia.nombre;
    });
    const provSet = new Set(prov);
    setProvincias([...provSet].sort());
  }, []);

  return (
    <div className={style.contSelects}>
      
      <div className={style.contProvincia}>
        <label>Provincia: </label>
        <select className={style.input} name='filterProvincias' value={selectedProv} onChange={handlerProvincias}>
          <option value="filterProvincias">Elija Provincia</option>
          {provincias.length > 0 ? (
            provincias.map((provincia, index) => (
              <option key={index} value={provincia}>{provincia}</option>
            ))
          ) : (
            <option value='withoutProvincias'>Error cargando provincias</option>
          )}
        </select>
      </div>

      <div className={style.contCiudad}>
        <label>Ciudad: </label>
        <select className={style.input} name='filterCiudades' value={selectedCiudad} onChange={(event) => dispatch(setSelectedCiudad(event.target.value))}>
          <option value="filterCiudades">Elija Ciudad</option>
          {ciudades.length > 0 ? (
            ciudades.map((ciudad, index) => (
              <option key={index} value={ciudad.nombre}>{ciudad.nombre}</option>
            ))
          ) : (
            <option value='withoutCiudades'>Error cargando ciudades</option>
          )}
        </select>
      </div>
    </div>
  );
}

export default LocationSelectors;