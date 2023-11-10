import miApi from '../../../localidades.json';

function getCitiesByProvince(data) {
  const citiesByProvince = {};
  data.localidades.forEach((ciudad) => {
    const provincia = ciudad.provincia.nombre;
    if (!citiesByProvince[provincia]) {
      citiesByProvince[provincia] = [];
    }
    citiesByProvince[provincia].push(ciudad.nombre);
  });
  return citiesByProvince;
}

function getProvinces(data) {
  const provinces = data.localidades.map((provincia) => {
    return provincia.provincia.nombre;
  });
  return [...new Set(provinces)];
}

// Luego puedes usar estas funciones de la siguiente manera:

const citiesByProvince = getCitiesByProvince(miApi);
console.log('Lista de ciudades por provincia:', citiesByProvince);

const selectedProvince = 'Nombre de la provincia que deseas seleccionar';
const citiesInSelectedProvince = citiesByProvince[selectedProvince];
console.log('Ciudades en la provincia seleccionada:', citiesInSelectedProvince);

const provincesList = getProvinces(miApi);
console.log('Lista de provincias:', provincesList);

