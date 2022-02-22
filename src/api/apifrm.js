import axios from 'axios';

////set the payload headers and URL for forms
const apifrm = axios.create({
    baseURL: process.env.REACT_APP_API,
    headers : {
        'Authorization' : localStorage.getItem('token'),
        'Content-Type' : 'multipart/form-data',
        'Allow-Control-Allow-Origin' : '*',
    }
});

export default apifrm;