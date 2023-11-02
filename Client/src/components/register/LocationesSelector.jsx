import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import miApi from '../../../localidades.json';

function LocationSelectors() {
  const [provinciasParticular, setProvinciasParticular] = useState([]);
  const [ciudadesParticular, setCiudadesParticular] = useState([]);
  const [selectedProvParticular, setSelectedProvParticular] = useState('');

  const [provinciasLaboral, setProvinciasLaboral] = useState([]);
  const [ciudadesLaboral, setCiudadesLaboral] = useState([]);
  const [selectedProvLaboral, setSelectedProvLaboral] = useState('');

  const [selectedCiudadParticular, setSelectedCiudadParticular] = useState('');
  const [selectedCiudadLaboral, setSelectedCiudadLaboral] = useState('');

  const handlerProvinciasParticular = (event) => {
    const provincia = event.target.value;
    setSelectedProvParticular(provincia);
  };

  const handlerProvinciasLaboral = (event) => {
    const provincia = event.target.value;
    setSelectedProvLaboral(provincia);
  };

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
    <div style={{ padding: '15px' , backgroundColor: 'white'}}>
      <div style={{ padding: '5px' }}>
        <FormControl variant="outlined" fullWidth style={{ backgroundColor: 'white', marginBottom: '5px' }}>
          <InputLabel>Provincia (Particular)</InputLabel>
          <Select
            value={selectedProvParticular}
            onChange={handlerProvinciasParticular}
            label="Provincia (Particular)"
          >
            <MenuItem value="filterProvinciasParticular">Elija Provincia</MenuItem>
            {provinciasParticular.map((provincia, index) => (
              <MenuItem key={index} value={provincia}>{provincia}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
  
      <div style={{ padding: '5px' }}>
        <FormControl variant="outlined" fullWidth style={{ backgroundColor: 'white', marginBottom: '5px' }}>
          <InputLabel>Ciudad (Particular)</InputLabel>
          <Select
            value={selectedCiudadParticular}
            onChange={(event) => setSelectedCiudadParticular(event.target.value)}
            label="Ciudad (Particular)"
          >
            <MenuItem value="filterCiudadesParticular">Elija Ciudad</MenuItem>
            {ciudadesParticular.map((ciudad, index) => (
              <MenuItem key={index} value={ciudad.nombre}>{ciudad.nombre}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
  
      <div style={{ padding: '5px' }}>
        <FormControl variant="outlined" fullWidth style={{ backgroundColor: 'white', marginBottom: '5px' }}>
          <InputLabel>Provincia (Laboral)</InputLabel>
          <Select
            value={selectedProvLaboral}
            onChange={handlerProvinciasLaboral}
            label="Provincia (Laboral)"
          >
            <MenuItem value="filterProvinciasLaboral">Elija Provincia</MenuItem>
            {provinciasLaboral.map((provincia, index) => (
              <MenuItem key={index} value={provincia}>{provincia}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
  
      <div style={{ padding: '5px' }}>
        <FormControl variant="outlined" fullWidth style={{ backgroundColor: 'white' }}>
          <InputLabel>Ciudad (Laboral)</InputLabel>
          <Select
            value={selectedCiudadLaboral}
            onChange={(event) => setSelectedCiudadLaboral(event.target.value)}
            label="Ciudad (Laboral)"
          >
            <MenuItem value="filterCiudadesLaboral">Elija Ciudad</MenuItem>
            {ciudadesLaboral.map((ciudad, index) => (
              <MenuItem key={index} value={ciudad.nombre}>{ciudad.nombre}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
  
  
}

export default LocationSelectors;
