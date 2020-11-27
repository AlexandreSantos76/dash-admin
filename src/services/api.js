import axios from 'axios';
const getToken = () => localStorage.getItem('@MonetizDB:token');
const api = axios.create({
  baseURL: 'http://localhost:3333'
});


export default api;