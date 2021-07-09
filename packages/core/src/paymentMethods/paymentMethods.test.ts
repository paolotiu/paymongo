import MockAdapter from 'axios-mock-adapter';
import faker from 'faker';
import { axiosInstance } from '../utils/axiosInstance';
import { createPaymentMethod } from './paymentMethods';
import { CreatePaymentMethodParams, PaymentMethodResource } from './types';

const mock = new MockAdapter(axiosInstance);

mock.onPost(`/payment_methods`).reply((config) => {
  const {
    data: { attributes },
  } = JSON.parse(config.data) as CreatePaymentMethodParams;
  return [
    200,
    {
      data: {
        id: faker.datatype.uuid(),
        type: 'payment_method',
        attributes: {
          livemode: false,
          details: {
            exp_month: attributes.details.exp_month,
            exp_year: attributes.details.exp_year,
            last4: attributes.details.card_number.slice(-4),
          },
          metadata: attributes.metadata,
          type: 'card',
          billing: attributes.billng,
        },
      },
    } as PaymentMethodResource,
  ];
});

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
