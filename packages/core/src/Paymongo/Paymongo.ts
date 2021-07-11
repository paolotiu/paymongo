import { IsPublicKey, SecretOrPublicKey } from '@@common/types';
import { AxiosInstance } from 'axios';
import { createAxiosInstance } from '@@utils/createAxiosInstance';
import { createPaymentMethod, retreivePaymentMethod } from '@@paymentMethods/paymentMethods';
import { CreatePaymentMethodParams, RetrievePaymentMethodParams } from '@@paymentMethods/types';
import {
  // createPaymentIntent,
  retrievePaymentIntent,
  attachPaymentIntent,
  createPaymentIntent,
} from '@@paymentIntents/paymentIntents';
import { isomorphicBtoA } from '@@utils/isomorphicBtoA';
import { createSource, retrieveSource } from 'sources/sources';
import { CreateSourceParams, RetrieveSourceParams } from 'sources/types';
import {
  AttachPaymentIntentParams,
  CreatePaymentIntentParams,
  RetrievePaymentIntentParams,
} from '@@paymentIntents/types';

export class Paymongo<Key extends SecretOrPublicKey> {
  private _axiosInstance: AxiosInstance;

  constructor(key: Key) {
    const axiosInstance = createAxiosInstance({
      headers: {
        Authorization: `Basic ${isomorphicBtoA(key)}`,
      },
    });
    if (typeof window !== 'undefined' && key.includes('sk')) {
      throw new Error('Do not use the secret key in the browser');
    }
    this._axiosInstance = axiosInstance;
  }
  // {
  //     url,
  //     config,
  //     data,
  //     method,
  //   }: {
  //     url: string;
  //     data?: Record<string, any>;
  //     config?: AxiosRequestConfig;
  //     method: string;
  //   }

  paymentMethod = {
    create: <Metadata = undefined>(data: CreatePaymentMethodParams<Metadata>) =>
      createPaymentMethod(data, this._axiosInstance),

    retrieve: (data: RetrievePaymentMethodParams) =>
      retreivePaymentMethod(data, this._axiosInstance),
  };

  paymentIntent = {
    create: <Metadata = undefined>(data: CreatePaymentIntentParams<Metadata>) =>
      createPaymentIntent(data, this._axiosInstance),
    // createPaymentIntent(data, this._axiosInstance),

    retrieve: <Metadata = undefined>(data: RetrievePaymentIntentParams<IsPublicKey<Key>>) =>
      retrievePaymentIntent<Metadata, IsPublicKey<Key>>(data, this._axiosInstance),

    attach: <Metadata = undefined>(data: AttachPaymentIntentParams<IsPublicKey<Key>>) =>
      attachPaymentIntent<Metadata, IsPublicKey<Key>>(data, this._axiosInstance),
  };

  sources = {
    create: (data: CreateSourceParams) => createSource(data, this._axiosInstance),
    retrieve: (data: RetrieveSourceParams) => retrieveSource(data, this._axiosInstance),
  };
}
