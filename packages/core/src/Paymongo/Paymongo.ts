import btoa from 'btoa-lite';
import { SecretOrPublicKey } from '../common/types';
import { axiosInstance } from '../utils/axiosInstance';

export class Paymongo {
  private readonly key: string;

  constructor(key: SecretOrPublicKey) {
    this.key = key;
    axiosInstance.defaults.headers.common['Authorization'] = `Basic ${btoa(key)}`;
  }
}
