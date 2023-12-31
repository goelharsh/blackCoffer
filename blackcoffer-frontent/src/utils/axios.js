import axios from 'axios';
// config


// ----------------------------------------------------------------------
const HOST_API = "https://blackcoffer-backend.onrender.com/"
const axiosInstance = axios.create({
  baseURL: HOST_API,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
