import { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  CreatePaymentMethodParams,
  PaymentMethodResource,
  RetrievePaymentMethodParams,
} from './types';

export const createPaymentMethod = async <Metadata = undefined>(
  data: CreatePaymentMethodParams<Metadata>,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
) => {
  const res = await axiosInstance.post<{ data: PaymentMethodResource<Metadata> }>(
    '/payment_methods',
    data,
    config
  );

  return res.data.data;
};

export const retreivePaymentMethod = async <Metadata = Record<string, any> | undefined>(
  data: RetrievePaymentMethodParams,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
) => {
  const res = await axiosInstance.get<{ data: PaymentMethodResource<Metadata> }>(
    `/payment_methods/${data.id}`,
    config
  );

  return res.data.data;
};
