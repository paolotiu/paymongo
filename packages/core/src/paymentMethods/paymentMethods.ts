import { AxiosRequestConfig } from 'axios';
import { axiosInstance } from '../utils/axiosInstance';
import {
  CreatePaymentMethodParams,
  PaymentMethodResource,
  RetrievePaymentMethodParams,
} from './types';

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

export const retreivePaymentMethod = async <MetaData = Record<string, any> | undefined>(
  data: RetrievePaymentMethodParams,
  config?: AxiosRequestConfig
) => {
  const res = await axiosInstance.get<PaymentMethodResource<MetaData>>(
    `/payment_methods/${data.id}`,
    config
  );

  return res.data.data;
};
