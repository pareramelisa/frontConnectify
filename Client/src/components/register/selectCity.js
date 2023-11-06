import miApi from '../../../localidades.json';

function selectCitiesByProvince(data, selectedProvince) {
  const cities = data.localidades.filter((ciudad) => {
    return ciudad.provincia.nombre === selectedProvince;
  });
  const sortedCities = [...new Set(cities)].sort((a, b) => a.nombre.localeCompare(b.nombre));
  return sortedCities;
}

function getProvinces(data) {
  const provinces = data.localidades.map((provincia) => {
    return provincia.provincia.nombre;
  });
  return [...new Set(provinces)];
}

// Luego puedes usar estas funciones de la siguiente manera:

const selectedProvParticular = 'Nombre de la provincia que deseas seleccionar';
const citiesInSelectedProvince = selectCitiesByProvince(miApi, selectedProvParticular);
console.log('Ciudades en la provincia seleccionada:', citiesInSelectedProvince);

const provincesList = getProvinces(miApi);
console.log('Lista de provincias:', provincesList);
