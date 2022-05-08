// axios
import axios from 'axios';
// redux
import { reduxStore } from '../App';
import { logout, fetchRefreshToken } from '../redux/slices/auth';

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL =
  'https://facturador-electronico-api.herokuapp.com/api'; // process.env.REACT_APP_URL_API;
// axiosInstance.defaults.baseURL = 'http://localhost:1234'; // process.env.REACT_APP_URL_API;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response) {
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        reduxStore.dispatch(fetchRefreshToken());
        return axiosInstance(originalRequest);
      }
      if (error.response.status === 403) {
        return reduxStore.dispatch(logout());
      }
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  (config) => {
    const {
      auth: { accessToken }
    } = reduxStore.getState();
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

// other axios client

export const axiosClient = axios.create();

axiosClient.defaults.baseURL = 'https://facturador-api-mvp.herokuapp.com/api';
// axiosClient.defaults.baseURL = 'http://localhost:1234/api';

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response) {
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        reduxStore.dispatch(fetchRefreshToken());
        return axiosInstance(originalRequest);
      }
      if (error.response.status === 403) {
        return reduxStore.dispatch(logout());
      }
    }
    return Promise.reject(error);
  }
);

axiosClient.interceptors.request.use(
  (config) => {
    const {
      auth: { accessToken }
    } = reduxStore.getState();
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);
