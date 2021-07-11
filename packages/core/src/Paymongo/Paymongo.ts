import { IsPublicKey, SecretOrPublicKey } from '@@common/types';
import { AxiosInstance } from 'axios';
import btoa from 'btoa-lite';
import { createAxiosInstance } from '@@utils/createAxiosInstance';
import { createPaymentMethod, retreivePaymentMethod } from '@@paymentMethods/paymentMethods';
import { CreatePaymentMethodParams, RetrievePaymentMethodParams } from '@@paymentMethods/types';
import {
  AttachPaymentIntentParams,
  CreatePaymentIntentParams,
  RetrievePaymentIntentParams,
} from '@@paymentIntents/types';
import {
  createPaymentIntent,
  retrievePaymentIntent,
  attachPaymentIntent,
} from '@@paymentIntents/paymentIntents';
import { CreateSourceParams, RetrieveSourceParams } from '@@/sources/types';
import { createSource, retrieveSource } from '@@/sources/sources';

export class Paymongo<Key extends SecretOrPublicKey> {
  private readonly _axiosInstance: AxiosInstance;

  constructor(key: Key) {
    const axiosInstance = createAxiosInstance({
      headers: {
        Authorization: `Basic ${btoa(key)}`,
      },
    });

    this._axiosInstance = axiosInstance;
  }

  paymentMethods = {
    create: <Metadata = undefined>(data: CreatePaymentMethodParams<Metadata>) =>
      createPaymentMethod(data, this._axiosInstance),

    retrieve: (data: RetrievePaymentMethodParams) =>
      retreivePaymentMethod(data, this._axiosInstance),
  };

  paymentIntent = {
    create: <Metadata = undefined>(data: CreatePaymentIntentParams<Metadata>) =>
      createPaymentIntent(data, this._axiosInstance),

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
