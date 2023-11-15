import axios from 'axios';
const VITE_API_BASE = import.meta.env.VITE_API_BASE || 'localhost';

// Crea una instancia de Axios
const axiosInstance = axios.create({
  baseURL: VITE_API_BASE,
  timeout: 5000,
});

// Configura opciones de caché
axiosInstance.defaults.headers.common['Cache-Control'] = 'no-cache';
axiosInstance.defaults.headers.common['Pragma'] = 'no-cache';

export default axiosInstance;
