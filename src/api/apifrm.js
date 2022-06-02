import axios from 'axios';

////set the payload headers and URL for forms
const apifrm = axios.create({
    baseURL: process.env.REACT_APP_API,
    headers : {
        'Authorization' : localStorage.getItem('token'),
        'Content-Type' : 'multipart/form-data',
        'Allow-Control-Allow-Origin' : '*',
    },
    validateStatus: function validateStatus(status) {
        let default_ = status >= 200 && status < 300;
        let extra = status === 404;
        return default_ || extra;
    }
});

export default apifrm;