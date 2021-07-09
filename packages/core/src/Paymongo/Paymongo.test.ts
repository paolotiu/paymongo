import btoa from 'btoa-lite';
import { axiosInstance } from '../utils/axiosInstance';
import { Paymongo } from './Paymongo';

describe('Paymongo happy path', () => {
  // Test secret key
  const key = 'sk_live_6vyisVErtpKCpLK9hkmT3zgn';

  // Paymongo instance
  const paymongo = new Paymongo(key);

  it('Creates paymongo instance', () => {
    expect(paymongo instanceof Paymongo).toBe(true);
  });

  it('Configures axiosInstance defaults', () => {
    const encodedKey = btoa(key);
    expect(axiosInstance.defaults.headers.common['Authorization']).toEqual(
      `Basic ${encodedKey}`
    );
  });
});
