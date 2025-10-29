import axios from 'axios';
import { store } from '../app/store';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Axios request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.user?.token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

