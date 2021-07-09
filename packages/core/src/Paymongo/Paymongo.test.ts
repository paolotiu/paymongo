import MockAdapter from 'axios-mock-adapter';
import btoa from 'btoa-lite';
import faker from 'faker';
import { axiosInstance } from '../utils/axiosInstance';
import { Paymongo } from './Paymongo';

// Mock axios setup
const mock = new MockAdapter(axiosInstance);
mock.onAny().reply(200, { data: 'nice' });

// CONSTANTS
const key = 'sk_live_6vyisVErtpKCpLK9hkmT3zgn';
const encodedKey = btoa(key);
const AuthHeader = `Basic ${encodedKey}`;

afterEach(() => {
  // Reset history after each test
  mock.resetHistory();
});

describe('Paymongo happy path', () => {
  // Paymongo instance
  const paymongo = new Paymongo(key);

  it('Creates paymongo instance', () => {
    expect(paymongo instanceof Paymongo).toBe(true);
  });

  it('Configures axiosInstance defaults', () => {
    expect(axiosInstance.defaults.headers.common['Authorization']).toEqual(AuthHeader);
  });

  it('Calls paymentMethods correctly', async () => {
    await paymongo.paymentMethods.create({
      data: {
        attributes: {
          type: 'card',
          details: {
            card_number: faker.finance.creditCardNumber(),
            cvc: faker.finance.creditCardCVV(),
            exp_month: 9,
            exp_year: 2090,
          },
        },
      },
    });

    await paymongo.paymentMethods.retrieve({
      id: faker.datatype.uuid(),
    });

    // Auth headers are sent
    expect(mock.history.post[0].headers['Authorization']).toEqual(AuthHeader);
    expect(mock.history.get[0].headers['Authorization']).toEqual(AuthHeader);

    // Requests are made
    expect(mock.history.post.length).toBe(1);
    expect(mock.history.get.length).toBe(1);
  });
});
