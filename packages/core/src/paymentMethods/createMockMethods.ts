import MockAdapter from 'axios-mock-adapter/types';
import faker from 'faker';
import { CreatePaymentMethodParams, PaymentMethodResource } from './types';

export const createMockMethods = (mock: MockAdapter) => {
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
};
