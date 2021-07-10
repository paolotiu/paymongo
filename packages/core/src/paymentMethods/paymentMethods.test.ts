import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { createMockMethods } from './createMockMethods';
import { createPaymentMethod, retreivePaymentMethod } from './paymentMethods';

const axiosInstance = axios.create();

const mock = new MockAdapter(axiosInstance);
createMockMethods(mock);

describe('Payment Method Test', () => {
  let id: string;
  test('Create Payment method gets called', async () => {
    const res = await createPaymentMethod(
      {
        data: {
          attributes: {
            type: 'card',
            details: {
              card_number: '4343434343434345',
              cvc: '123',
              exp_month: 4,
              exp_year: 2032,
            },
            metadata: {
              hey: 'there',
            },
          },
        },
      },
      axiosInstance
    );
    id = res.id;

    expect(mock.history.post.length).toBe(1);
    expect(res.type).toBe('payment_method');
    expect(res.attributes.metadata.hey).toEqual('there');
  });

  test('Retrieves payment method', async () => {
    const res = await retreivePaymentMethod({ id }, axiosInstance);

    expect(mock.history.get.length).toBe(1);
    expect(res.id).toEqual(id);
    expect(res.attributes.metadata?.hey).toEqual('there');
  });
});
