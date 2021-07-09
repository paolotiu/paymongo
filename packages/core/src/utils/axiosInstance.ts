import axios from 'axios';

export const axiosInstance = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  baseURL: 'https://api.paymongo.com/v1',
});
