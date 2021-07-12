import { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  CreatePaymentParams,
  ListAllPaymentsParams,
  PaymentResource,
  RetrievePaymentParams,
} from './types';

export const createPayment = async (
  data: CreatePaymentParams,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
) => {
  const res = await axiosInstance.post<{ data: PaymentResource }>('/payments', data, config);

  return res.data.data;
};

export const listAllPayments = async (
  data: ListAllPaymentsParams,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
) => {
  const res = await axiosInstance.get<{ data: PaymentResource[]; has_more: boolean }>('/payments', {
    ...config,
    params: { ...data, ...config?.params },
  });

  return res.data.data;
};

export const retrievePayment = async (
  data: RetrievePaymentParams,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
) => {
  const res = await axiosInstance.get<{ data: PaymentResource }>(`/payments/${data.id}`, config);

  return res.data.data;
};
