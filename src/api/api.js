import axios from 'axios';

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers : {
        'Authorization' : localStorage.getItem('token'),
        'Accept' : 'application/json',
        'Content-Type' : 'application/json',
        'Allow-Control-Allow-Origin' : '*',
    }
});

export default api;