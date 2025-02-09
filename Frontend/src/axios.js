import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:4000', 

});

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers['Authorization'];
  }
};


export { api, setAuthToken };
