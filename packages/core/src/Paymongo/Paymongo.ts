import { AxiosInstance } from 'axios';
import btoa from 'btoa-lite';
import { SecretOrPublicKey } from '../common/types';
import { createPaymentMethod, retreivePaymentMethod } from '../paymentMethods/paymentMethods';
import { CreatePaymentMethodParams, RetrievePaymentMethodParams } from '../paymentMethods/types';
import { createAxiosInstance } from '../utils/createAxiosInstance';

export class Paymongo {
  private readonly key: string;

  readonly axiosInstance: AxiosInstance;

  constructor(key: SecretOrPublicKey) {
    this.key = key;

    const axiosInstance = createAxiosInstance({
      headers: {
        Authorization: `Basic ${btoa(key)}`,
      },
    });

    this.axiosInstance = axiosInstance;
  }

  paymentMethods = {
    create: (data: CreatePaymentMethodParams) => createPaymentMethod(data, this.axiosInstance),
    retrieve: (data: RetrievePaymentMethodParams) =>
      retreivePaymentMethod(data, this.axiosInstance),
  };
}
