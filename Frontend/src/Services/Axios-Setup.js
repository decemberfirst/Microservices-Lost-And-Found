import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://reclamify.com/api/v1',
  withCredentials: true,
});

export default axiosInstance;
