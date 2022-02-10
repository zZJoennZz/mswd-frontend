import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API,
    headers : {
        'Authorization' : localStorage.getItem('token'),
        'Accept' : 'application/json',
        'Content-Type' : 'application/json',
        'Allow-Control-Allow-Origin' : '*',
    }
});

export default api;