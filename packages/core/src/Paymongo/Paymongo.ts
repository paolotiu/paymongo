import { AxiosInstance } from 'axios';
import btoa from 'btoa-lite';
import { SecretOrPublicKey } from '../common/types';
import { createPaymentMethod, retreivePaymentMethod } from '../paymentMethods/paymentMethods';
import { CreatePaymentMethodParams, RetrievePaymentMethodParams } from '../paymentMethods/types';
import { createAxiosInstance } from '../utils/createAxiosInstance';

  private readonly _key: string;

  private readonly _axiosInstance: AxiosInstance;

  constructor(key: Key) {
    this._key = key;

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
}
