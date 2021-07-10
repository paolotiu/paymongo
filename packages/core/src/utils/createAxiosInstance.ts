import axios, { AxiosRequestConfig } from 'axios';

export const createAxiosInstance = (config?: AxiosRequestConfig) =>
  axios.create({
    ...config,
    headers: {
      common: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    },
    baseURL: 'https://api.paymongo.com/v1',
  });
