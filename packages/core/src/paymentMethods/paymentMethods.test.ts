import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '../utils/axiosInstance';
import { createMockMethods } from './createMockMethods';
import { createPaymentMethod } from './paymentMethods';

const mock = new MockAdapter(axiosInstance);
createMockMethods(mock);

describe('Payment Method Test', () => {
  test('Gets called', async () => {
    const res = await createPaymentMethod({
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
    });

    expect(mock.history.post.length).toBe(1);
    expect(res.type).toBe('payment_method');
  });
});
