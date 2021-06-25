import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_PATH
});
api.defaults.headers.authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6NTIyNjU3MzIsIm5hbWUiOiJwcm92aXNvcmlvIiwiaWF0IjoxNTE2MjM5MDIyfQ.oMCJvqkrhl2NUvAJZ19avkZQZ9ibLOUJ9r4MVL2DuzU`;
export default api;