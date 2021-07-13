import { isomorphicBtoA } from '@@utils/isomorphicBtoA';
import { Paymongo } from '@@Paymongo/Paymongo';
import MockAdapter from 'axios-mock-adapter';
import faker from 'faker';
import {
  fakeAttachPaymentIntentParams,
  fakeCreatePaymentIntentParams,
  fakeCreateSourceParams,
  fakePaymentMethodParams,
  fakeRetrievePaymentIntentParams,
  fakeRetrieveSourceParams,
} from './fakeParams';

// CONSTANTS
const key = 'sk_live_6vyisVErtpKCpLK9hkmT3zgn';
const encodedKey = isomorphicBtoA(key);
const AuthHeader = `Basic ${encodedKey}`;

// Paymongo instance
const paymongo = new Paymongo(key);

// Mock axios setup
const mock = new MockAdapter((paymongo as any)._axiosInstance);

mock.onAny().reply(200, { data: 'nice' });

afterEach(() => {
  // Reset history after each test
  mock.resetHistory();
  // Reset node env
  process.env.NODE_ENV = 'test';
});

describe('Paymongo happy path', () => {
  it('Creates paymongo instance', () => {
    expect(paymongo instanceof Paymongo).toBe(true);
  });

  it('Configures axiosInstance defaults', () => {
    expect((paymongo as any)._axiosInstance.defaults.headers.common['Authorization']).toEqual(
      AuthHeader
    );
  });

  it('Gets http adapter in node environment', () => {
    process.env.NODE_ENV = 'dev';
    const res = (paymongo as any)._getConfig();
    // eslint-disable-next-line global-require
    expect(res).toEqual({ adapter: require('axios/lib/adapters/http') });
  });

  /** ******************************** */
  /// //////// METHODS SECTION ///////////
  /** ******************************** */

  it('Calls paymentMethods correctly', async () => {
    await paymongo.paymentMethod.create(fakePaymentMethodParams);

    await paymongo.paymentMethod.retrieve({
      id: faker.datatype.uuid(),
    });

    // Auth headers are sent
    expect(mock.history.post[0].headers['Authorization']).toEqual(AuthHeader);
    expect(mock.history.get[0].headers['Authorization']).toEqual(AuthHeader);

    // Requests are made
    expect(mock.history.post.length).toBe(1);
    expect(mock.history.get.length).toBe(1);
  });

  it('Calls paymentIntents correctly', async () => {
    await paymongo.paymentIntent.create(fakeCreatePaymentIntentParams);
    await paymongo.paymentIntent.retrieve(fakeRetrievePaymentIntentParams);
    await paymongo.paymentIntent.attach(fakeAttachPaymentIntentParams);

    // Requests are made
    expect(mock.history.post.length).toBe(2);
    expect(mock.history.get.length).toBe(1);
  });

  it('Calls sources correctly', async () => {
    await paymongo.source.create(fakeCreateSourceParams);
    await paymongo.source.retrieve(fakeRetrieveSourceParams);

    // Requests are made
    expect(mock.history.post.length).toBe(1);
    expect(mock.history.get.length).toBe(1);
  });
});

describe('Multiple instance handling', () => {
  it('Creates new axios instance for 2nd paymongo instance', () => {
    const key2 = 'sk_live_dasidjaskdjaskd';
    const encodedKey2 = isomorphicBtoA(key2);
    const paymongo2 = new Paymongo(key2);

    const mock2 = new MockAdapter((paymongo2 as any)._axiosInstance);
    mock2.onAny().reply(200, { data: 'cool' });

    paymongo2.paymentMethod.create(fakePaymentMethodParams);

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
