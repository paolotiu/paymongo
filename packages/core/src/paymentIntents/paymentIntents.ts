import { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  AttachPaymentIntentParams,
  CreatePaymentIntentParams,
  PaymentIntentResource,
  RetrievePaymentIntentParams,
} from './types';

export const createPaymentIntent = async <Metadata = undefined>(
  data: CreatePaymentIntentParams<Metadata>,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
) => {
  const res = await axiosInstance.post<PaymentIntentResource<Metadata>>(
    '/payment_intents',
    data,
    config
  );

  return res.data.data;
};

export const retrievePaymentIntent = async <
  Metadata = undefined,
  UsingPublic extends boolean = true
>(
  data: RetrievePaymentIntentParams<UsingPublic>,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
) => {
  const { id, client_key } = data;

  const res = await axiosInstance.get<PaymentIntentResource<Metadata>>(`/payment_intents/${id}`, {
    params: { client_key, ...config?.params },
    ...config,
  });

  return res.data.data;
};

export const attachPaymentIntent = async <Metadata = undefined, UsingPublic extends boolean = true>(
  data: AttachPaymentIntentParams<UsingPublic>,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
) => {
  const { id, ...params } = data;
  const res = await axiosInstance.post<PaymentIntentResource<Metadata>>(
    `/payment_intents/${id}/attach`,
    params,
    config
  );

  return res.data.data;
};
