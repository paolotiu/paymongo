import { AxiosRequestConfig } from 'axios';
import { axiosInstance } from '../utils/axiosInstance';
import { CreatePaymentMethodParams, PaymentMethodResource } from './types';

export const createPaymentMethod = async <MetaData = undefined>(
  data: CreatePaymentMethodParams<MetaData>,
  config?: AxiosRequestConfig
) => {
  const res = await axiosInstance.post<PaymentMethodResource<MetaData>>(
    '/payment_methods',
    data,
    config
  );

  return res.data.data;
};
