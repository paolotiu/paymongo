import { CreatePaymentIntentParams, PaymentIntentResource } from '@@paymentIntents/types';
import MockAdapter from 'axios-mock-adapter/types';
import faker from 'faker';

export const createMockMethods = (mock: MockAdapter) => {
  const resources: Record<string, PaymentIntentResource> = {};
  mock.onPost('/payment_intents').reply((config) => {
    const {
      data: { attributes },
    } = JSON.parse(config.data) as CreatePaymentIntentParams;

    const id = faker.datatype.uuid();

    resources[id] = {
      id,
      type: 'payment_intent',
      attributes: {
        amount: attributes.amount,
        client_key: faker.datatype.uuid(),
        currency: 'PHP',
        livemode: false,
        metadata: attributes.metadata,
        payment_method_allowed: attributes.payment_method_allowed,
        payment_method_options: { card: { request_three_d_secure: 'any' } },
        payments: [],
        statement_descriptor: 'Test',
        status: 'awaiting_next_action',
        next_action: {
          type: 'redirect',
          redirect: {
            url: faker.internet.url(),
            return_url: faker.internet.url(),
          },
        },
      },
    };

    return [200, { data: resources[id] }];
  });

  mock.onGet(/payment_intents\/.+/).reply((config) => {
    const id = config.url?.split('/').pop();
    if (!id) {
      return [404];
    }
    return [200, { data: resources[id] }];
  });

  mock.onPost(/payment_intents\/.+\/attach$/).reply((config) => {
    const id = config.url?.split('/')[2];
    if (!id) {
      return [404];
    }
    return [200, { data: resources[id] }];
  });
};
