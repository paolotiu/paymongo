import btoa from 'btoa-lite';
import { PublicKey, SecretKey } from '../types';
import { axiosInstance } from '../utils/axiosInstance';

export class Paymongo {
  private readonly key: string;

  constructor(key: PublicKey | SecretKey) {
    this.key = key;
    axiosInstance.defaults.headers.common['Authorization'] = `Basic ${btoa(
      key
    )}`;
  }
}
