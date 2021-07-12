import { CreateSourceParams, SourceResource } from '@@sources/types';
import MockAdapter from 'axios-mock-adapter/types';
import faker from 'faker';

export const createMockMethods = (mock: MockAdapter) => {
  const resources: Record<string, SourceResource> = {};

  mock.onPost('/sources').reply((config) => {
    const {
      data: {
        attributes: { amount, currency, redirect, type, billing },
      },
    } = JSON.parse(config.data) as CreateSourceParams;
    const id = faker.datatype.uuid();

    resources[id] = {
      id,
      type: 'source',
      attributes: {
        amount,
        currency,
        livemode: false,
        redirect: { checkout_url: faker.internet.url(), ...redirect },
        status: 'pending',
        type,
        billing,
        created_at: new Date().getTime(),
        updated_at: new Date().getTime(),
      },
    };

    return [200, { data: resources[id] }];
  });

  mock.onGet(/sources\/.+/).reply((config) => {
    const id = config.url?.split('/').pop();
    if (!id) {
      return [404];
    }
    const resource = resources[id];

    if (!resource) {
      return [404];
    }

    return [200, { data: resource }];
  });
};
