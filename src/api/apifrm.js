import axios from 'axios';

const apifrm = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers : {
        'Authorization' : localStorage.getItem('token'),
        'Content-Type' : 'multipart/form-data',
        'Allow-Control-Allow-Origin' : '*',
    }
});

export default apifrm;