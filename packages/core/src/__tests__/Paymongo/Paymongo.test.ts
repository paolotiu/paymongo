import { Paymongo } from '@@Paymongo/Paymongo';
import MockAdapter from 'axios-mock-adapter';
import btoa from 'btoa-lite';
import faker from 'faker';

// CONSTANTS
const key = 'sk_live_6vyisVErtpKCpLK9hkmT3zgn';
const encodedKey = btoa(key);
const AuthHeader = `Basic ${encodedKey}`;

// Paymongo instance
const paymongo = new Paymongo(key);

// Mock axios setup
const mock = new MockAdapter((paymongo as any)._axiosInstance);

mock.onAny().reply(200, { data: 'nice' });

afterEach(() => {
  // Reset history after each test
  mock.resetHistory();
});

const fakePaymentMethodParams = {
  data: {
    attributes: {
      type: 'card',
      details: {
        card_number: faker.finance.creditCardNumber(),
        cvc: faker.finance.creditCardCVV(),
        exp_month: 9,
        exp_year: 2090,
      },
      metadata: { hey: 'there' },
    },
  },
} as const;

describe('Paymongo happy path', () => {
  it('Creates paymongo instance', () => {
    expect(paymongo instanceof Paymongo).toBe(true);
  });

  it('Configures axiosInstance defaults', () => {
    expect((paymongo as any)._axiosInstance.defaults.headers.common['Authorization']).toEqual(
      AuthHeader
    );
  });

  /** ******************************** */
  /// //////// METHODS SECTION ///////////
  /** ******************************** */

  it('Calls paymentMethods correctly', async () => {
    await paymongo.paymentMethods.create(fakePaymentMethodParams);

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

describe('Multiple instance handling', () => {
  it('Creates new axios instance for 2nd paymongo instance', () => {
    const key2 = 'sk_live_dasidjaskdjaskd';
    const encodedKey2 = btoa(key2);
    const paymongo2 = new Paymongo(key2);

    const mock2 = new MockAdapter((paymongo2 as any)._axiosInstance);
    mock2.onAny().reply(200, { data: 'cool' });

    paymongo2.paymentMethods.create(fakePaymentMethodParams);

    // Defaults are correct
    expect((paymongo as any)._axiosInstance.defaults.headers.common['Authorization']).toEqual(
      AuthHeader
    );
    expect((paymongo2 as any)._axiosInstance.defaults.headers.common['Authorization']).toEqual(
      `Basic ${encodedKey2}`
    );

    // Only requested on 2nd paymongo instance

    expect(mock.history.post.length).toBe(0);
    expect(mock2.history.post.length).toBe(0);
  });
});
