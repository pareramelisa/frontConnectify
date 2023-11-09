import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import miApi from '../../../localidades.json';

function LocationSelectors() {
  const [provincias, setProvincias] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [selectedDireccion, setSelectedDireccion] = useState('');

  const handlerProvincias = (event) => {
    const provincia = event.target.value;
    const direccion = provincia + (selectedCiudad ? ', ' + selectedCiudad : '');
    setSelectedDireccion(direccion);
  };

  const handlerCiudades = (event) => {
    const ciudad = event.target.value;
    const direccion = (selectedProv ? selectedProv + ', ' : '') + ciudad;
    setSelectedDireccion(direccion);
  };

  useEffect(() => {
    const cities = miApi.localidades.filter((ciudad) => {
      return ciudad.provincia.nombre === selectedProv;
    });
    const sortedCities = [...new Set(cities)].sort((a, b) => a.nombre.localeCompare(b.nombre));
    setCiudades(sortedCities);
  }, [selectedProv]);

  useEffect(() => {
    const provs = miApi.localidades.map((provincia) => {
      return provincia.provincia.nombre;
    });
    const provSet = new Set(provs);
    setProvincias([...provSet].sort());
  }, []);

  return (
    <div style={{ padding: '15px' , backgroundColor: 'white'}}>
      <div style={{ padding: '5px' }}>
        <FormControl variant="outlined" fullWidth style={{ backgroundColor: 'white', marginBottom: '5px' }}>
          <InputLabel>Dirección</InputLabel>
          <Select
            value={selectedDireccion}
            onChange={(event) => setSelectedDireccion(event.target.value)}
            label="Dirección"
          >
            <MenuItem value="">Elija Dirección</MenuItem>
            {provincias.map((provincia, index) => (
              ciudades.filter(ciudad => ciudad.provincia.nombre === provincia).map((ciudad, index) => (
                <MenuItem key={index} value={provincia + ', ' + ciudad.nombre}>{provincia + ', ' + ciudad.nombre}</MenuItem>
              ))
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default LocationSelectors;
