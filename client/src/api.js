import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router";
const Axios = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});


Axios.interceptors.request.use(
    
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
            const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        Navigate('/login');
        return Promise.reject('Session expired, please log in again.');
      }

        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            console.error("Error response:", error.response);
        } else if (error.request) {
            console.error("Error request:", error.request);
        } else {
            console.error("Error message:", error.message);
        }
        return Promise.reject(error);
    }
);

export default Axios;
