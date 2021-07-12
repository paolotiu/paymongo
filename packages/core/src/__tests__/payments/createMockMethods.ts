import { CreatePaymentParams, PaymentResource } from '@@payments/types';
import MockAdapter from 'axios-mock-adapter/types';
import faker from 'faker';

export const createMockMethods = (mock: MockAdapter) => {
  const resources: Record<string, PaymentResource> = {};
  mock.onPost('/payments').reply((config) => {
    const {
      data: { attributes },
    } = JSON.parse(config.data) as CreatePaymentParams;

    const id = faker.datatype.uuid();
    const now = new Date().getTime();
    resources[id] = {
      id,
      type: 'payment',
      attributes: {
        amount: attributes.amount,

        balance_transaction_id: faker.datatype.uuid(),

        currency: 'PHP',
        disputed: false,
        fee: 200,

        status: 'paid',
        net_amount: attributes.amount - 200,
        origin: 'api',
        foreign_fee: 0,
        livemode: false,
        refunds: [],

        taxes: [],
        source: {
          id: attributes.source.id,
          type: 'gcash',
        },
        statement_descriptor: 'ME',

        paid_at: now,
        available_at: now,
        created_at: now,
        updated_at: now,
      },
    };
    return [200, { data: resources[id] }];
  });

  mock.onGet(/payments\/.+/).reply((config) => {
    const id = config.url?.split('/').pop();

    if (!id || !resources[id]) {
      return [404];
    }

    return [200, { data: resources[id] }];
  });

  mock.onGet('payments').reply(() => [200, { has_more: false, data: Object.values(resources) }]);
};
