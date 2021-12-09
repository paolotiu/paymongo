import { CreatePaymentMethodParams, PaymentMethodResource } from '@@paymentMethods/types';
import MockAdapter from 'axios-mock-adapter/types';
import faker from 'faker';

export const createMockMethods = (mock: MockAdapter) => {
  let resource: PaymentMethodResource;
  mock.onPost(`/payment_methods`).reply((config) => {
    const {
      data: { attributes },
    } = JSON.parse(config.data) as CreatePaymentMethodParams;

    resource = {
      id: faker.datatype.uuid(),
      type: 'payment_method',
      attributes: {
        livemode: false,
        details: {
          exp_month: attributes.details?.exp_month || 0,
          exp_year: attributes.details?.exp_year || 0,
          last4: attributes.details?.card_number.slice(-4) || "",
        },
        metadata: attributes.metadata,
        type: 'card',
        billing: attributes.billing,
      },
    };

    return [200, { data: resource }];
  });

  mock.onGet(/payment_methods\/.+/).reply(() => {
    if (resource) {
      return [200, { data: resource }];
    }
    return [404];
  });
};
