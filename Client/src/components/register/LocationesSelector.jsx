import React, { useEffect, useState } from 'react';
import miApi from "../../../localidades.json";


function LocationSelectors() {
  const [provinciasParticular, setProvinciasParticular] = useState([]);
  const [ciudadesParticular, setCiudadesParticular] = useState([]);
  const [selectedProvParticular, setSelectedProvParticular] = useState('Filtro de Prov.');

  const [provinciasLaboral, setProvinciasLaboral] = useState([]);
  const [ciudadesLaboral, setCiudadesLaboral] = useState([]);
  const [selectedProvLaboral, setSelectedProvLaboral] = useState('Filtro de Prov. Laboral');

  const [selectedCiudadParticular, setSelectedCiudadParticular] = useState('Filtro de City');
  const [selectedCiudadLaboral, setSelectedCiudadLaboral] = useState('Filtro de City Laboral');

  const handlerProvinciasParticular = (event) => {
    const provincia = event.target.value;
    setSelectedProvParticular(provincia);
  }

  const handlerProvinciasLaboral = (event) => {
    const provincia = event.target.value;
    setSelectedProvLaboral(provincia);
  }

  useEffect(() => {
    const cityParticular = miApi.localidades.filter((ciudad) => {
      return ciudad.provincia.nombre === selectedProvParticular;
    });
    const sortedCitiesParticular = [...new Set(cityParticular)].sort((a, b) => a.nombre.localeCompare(b.nombre));
    setCiudadesParticular(sortedCitiesParticular);
  }, [selectedProvParticular]);

  useEffect(() => {
    const provParticular = miApi.localidades.map((provincia) => {
      return provincia.provincia.nombre;
    });
    const provSetParticular = new Set(provParticular);
    setProvinciasParticular([...provSetParticular].sort());
  }, []);

  useEffect(() => {
    const cityLaboral = miApi.localidades.filter((ciudad) => {
      return ciudad.provincia.nombre === selectedProvLaboral;
    });
    const sortedCitiesLaboral = [...new Set(cityLaboral)].sort((a, b) => a.nombre.localeCompare(b.nombre));
    setCiudadesLaboral(sortedCitiesLaboral);
  }, [selectedProvLaboral]);

  useEffect(() => {
    const provLaboral = miApi.localidades.map((provincia) => {
      return provincia.provincia.nombre;
    });
    const provSetLaboral = new Set(provLaboral);
    setProvinciasLaboral([...provSetLaboral].sort());
  }, []);

  return (
    <div>
      <div>
        <label>Provincia (Particular): </label>
        <select name='filterProvinciasParticular' value={selectedProvParticular} onChange={handlerProvinciasParticular}>
          <option value="filterProvinciasParticular">Elija Provincia</option>
          {provinciasParticular.length > 0 ? (
            provinciasParticular.map((provincia, index) => (
              <option key={index} value={provincia}>{provincia}</option>
            ))
          ) : (
            <option value='withoutProvinciasParticular'>Error cargando provincias</option>
          )}
        </select>
      </div>

      <div>
        <label>Ciudad (Particular): </label>
        <select name='filterCiudadesParticular' value={selectedCiudadParticular} onChange={(event) => setSelectedCiudadParticular(event.target.value)}>
          <option value="filterCiudadesParticular">Elija Ciudad</option>
          {ciudadesParticular.length > 0 ? (
            ciudadesParticular.map((ciudad, index) => (
              <option key={index} value={ciudad.nombre}>{ciudad.nombre}</option>
            ))
          ) : (
            <option value='withoutCiudadesParticular'>Error cargando ciudades</option>
          )}
        </select>
      </div>

      <div>
        <label>Provincia (Laboral): </label>
        <select name='filterProvinciasLaboral' value={selectedProvLaboral} onChange={handlerProvinciasLaboral}>
          <option value="filterProvinciasLaboral">Elija Provincia</option>
          {provinciasLaboral.length > 0 ? (
            provinciasLaboral.map((provincia, index) => (
              <option key={index} value={provincia}>{provincia}</option>
            ))
          ) : (
            <option value='withoutProvinciasLaboral'>Error cargando provincias</option>
          )}
        </select>
      </div>

      <div>
        <label>Ciudad (Laboral): </label>
        <select name='filterCiudadesLaboral' value={selectedCiudadLaboral} onChange={(event) => setSelectedCiudadLaboral(event.target.value)}>
          <option value="filterCiudadesLaboral">Elija Ciudad</option>
          {ciudadesLaboral.length > 0 ? (
            ciudadesLaboral.map((ciudad, index) => (
              <option key={index} value={ciudad.nombre}>{ciudad.nombre}</option>
            ))
          ) : (
            <option value='withoutCiudadesLaboral'>Error cargando ciudades</option>
          )}
        </select>
      </div>
    </div>
  );
}

export default LocationSelectors;
