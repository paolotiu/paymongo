import { IsPublicKey, SecretOrPublicKey } from '@@common/types';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
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
import { createSource, retrieveSource } from '@@sources/sources';
import { CreateSourceParams, RetrieveSourceParams } from '@@sources/types';
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

  // Workaround for axios not detecting evironment
  // https://github.com/axios/axios/issues/1180#issuecomment-373268257
  private getConfig() {
    if (process.env.NODE_ENV === 'test') return {};

    let adapter;
    if (typeof XMLHttpRequest !== 'undefined') {
      // For browsers use XHR adapter
      // eslint-disable-next-line global-require
      adapter = require('axios/lib/adapters/xhr');
    } else {
      // For node use HTTP adapter
      // eslint-disable-next-line global-require
      adapter = require('axios/lib/adapters/http');
    }

    return { adapter } as AxiosRequestConfig;
  }

  paymentMethod = {
    create: <Metadata = undefined>(data: CreatePaymentMethodParams<Metadata>) =>
      createPaymentMethod(data, this._axiosInstance, this.getConfig()),

    retrieve: (data: RetrievePaymentMethodParams) =>
      retreivePaymentMethod(data, this._axiosInstance, this.getConfig()),
  };

  paymentIntent = {
    create: <Metadata = undefined>(data: CreatePaymentIntentParams<Metadata>) =>
      createPaymentIntent(data, this._axiosInstance, this.getConfig()),

    retrieve: <Metadata = undefined>(data: RetrievePaymentIntentParams<IsPublicKey<Key>>) =>
      retrievePaymentIntent<Metadata, IsPublicKey<Key>>(
        data,
        this._axiosInstance,
        this.getConfig()
      ),

    attach: <Metadata = undefined>(data: AttachPaymentIntentParams<IsPublicKey<Key>>) =>
      attachPaymentIntent<Metadata, IsPublicKey<Key>>(data, this._axiosInstance, this.getConfig()),
  };

  sources = {
    create: (data: CreateSourceParams) => createSource(data, this._axiosInstance, this.getConfig()),
    retrieve: (data: RetrieveSourceParams) =>
      retrieveSource(data, this._axiosInstance, this.getConfig()),
  };
}
