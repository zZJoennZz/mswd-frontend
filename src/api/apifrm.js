import axios from 'axios';

const apifrm = axios.create({
    baseURL: process.env.REACT_APP_API,
    headers : {
        'Authorization' : localStorage.getItem('token'),
        'Content-Type' : 'multipart/form-data',
        'Allow-Control-Allow-Origin' : '*',
    }
});

export default apifrm;