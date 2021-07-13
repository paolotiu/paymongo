import { IsPublicKey, SecretOrPublicKey } from '@@common/types';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { createAxiosInstance } from '@@utils/createAxiosInstance';
import { createPaymentMethod, retreivePaymentMethod } from '@@paymentMethods/paymentMethods';
import { CreatePaymentMethodParams, RetrievePaymentMethodParams } from '@@paymentMethods/types';
import {
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
import {
  CreatePaymentParams,
  ListAllPaymentsParams,
  RetrievePaymentParams,
} from '@@payments/types';
import { createPayment, listAllPayments, retrievePayment } from '@@payments/payments';

export class Paymongo<Key extends SecretOrPublicKey> {
  private _axiosInstance: AxiosInstance;

  private _isSecret: boolean;

  constructor(key: Key) {
    const axiosInstance = createAxiosInstance({
      headers: {
        Authorization: `Basic ${isomorphicBtoA(key)}`,
      },
    });

    this._isSecret = key.includes('sk');

    if (typeof window !== 'undefined' && this._isSecret) {
      throw new Error('Do not use the secret key in the browser');
    }

    this._axiosInstance = axiosInstance;
  }

  // Workaround for axios not detecting evironment
  // https://github.com/axios/axios/issues/1180#issuecomment-373268257
  private _getConfig() {
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
      createPaymentMethod(data, this._axiosInstance, this._getConfig()),

    retrieve: (data: RetrievePaymentMethodParams) =>
      retreivePaymentMethod(data, this._axiosInstance, this._getConfig()),
  };

  paymentIntent = {
    create: <Metadata = undefined>(data: CreatePaymentIntentParams<Metadata>) =>
      createPaymentIntent(data, this._axiosInstance, this._getConfig()),

    retrieve: <Metadata = undefined>(data: RetrievePaymentIntentParams<IsPublicKey<Key>>) =>
      retrievePaymentIntent<Metadata, IsPublicKey<Key>>(
        data,
        this._axiosInstance,
        this._getConfig()
      ),

    attach: <Metadata = undefined>(data: AttachPaymentIntentParams<IsPublicKey<Key>>) =>
      attachPaymentIntent<Metadata, IsPublicKey<Key>>(data, this._axiosInstance, this._getConfig()),
  };

  source = {
    create: (data: CreateSourceParams) =>
      createSource(data, this._axiosInstance, this._getConfig()),

    retrieve: (data: RetrieveSourceParams) =>
      retrieveSource(data, this._axiosInstance, this._getConfig()),
  };

  payment = {
    create: (data: CreatePaymentParams) => {
      return createPayment(data, this._axiosInstance, this._getConfig());
    },

    retrieve: (data: RetrievePaymentParams) =>
      retrievePayment(data, this._axiosInstance, this._getConfig()),

    list: (data: ListAllPaymentsParams) =>
      listAllPayments(data, this._axiosInstance, this._getConfig()),
  };
}
