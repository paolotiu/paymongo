import {
  attachPaymentIntent,
  createPaymentIntent,
  retrievePaymentIntent,
} from '@@paymentIntents/paymentIntents';
import { PaymentIntentResource } from '@@paymentIntents/types';
import { createAxiosInstance } from '@@utils/createAxiosInstance';
import MockAdapter from 'axios-mock-adapter';
import { createMockMethods } from './createMockMethods';

const axiosInstance = createAxiosInstance();

const mock = new MockAdapter(axiosInstance);
createMockMethods(mock);

afterEach(() => {
  mock.resetHistory();
});

describe('Payment Intent Test', () => {
  let resource: PaymentIntentResource['data'];
  it('Calls createPaymentIntent', async () => {
    const res = await createPaymentIntent(
      {
        data: {
          attributes: {
            amount: 10000,
            currency: 'PHP',
            payment_method_allowed: ['card'],
            metadata: { hey: 'there' },
          },
        },
      },
      axiosInstance
    );

    resource = res;

    expect(mock.history.post.length).toBe(1);
    expect(res.type).toEqual('payment_intent');
    expect(res.attributes.metadata.hey).toEqual('there');
  });

  it('Calls retrievePaymentIntent', async () => {
    const res = await retrievePaymentIntent(
      { id: resource.id, client_key: resource.attributes.client_key },
      axiosInstance
    );

    expect(res).toEqual(resource);
    expect(mock.history.get.length).toBe(1);
  });

  it('Calls attachPaymentIntent', async () => {
    const res = await attachPaymentIntent(
      {
        id: resource.id,
        data: { attributes: { client_key: 'jsadasd', payment_method: 'sajdksajd' } },
      },
      axiosInstance
    );

    expect(res).toEqual(resource);
    expect(mock.history.post.length).toBe(1);
  });
});
