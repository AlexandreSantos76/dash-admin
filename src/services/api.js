import axios from 'axios';
const getToken = () => localStorage.getItem('@MonetizDB:token');
const api = axios.create({
  baseURL: process.env.REACT_APP_API_PATH
});


export default api;