import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { createPayment, listAllPayments, retrievePayment } from '@@payments/payments';
import { PaymentResource } from '@@payments/types';
import { createMockMethods } from './createMockMethods';

const axiosInstance = axios.create();

const mock = new MockAdapter(axiosInstance);
createMockMethods(mock);

describe('Payments test', () => {
  let resource: PaymentResource;
  it('Creates payment resource', async () => {
    const res = await createPayment(
      {
        data: {
          attributes: {
            amount: 1000,
            currency: 'PHP',
            source: {
              id: 'sdaklaskd',
              type: 'source',
            },
          },
        },
      },
      axiosInstance
    );
    resource = res;

    expect(res.type).toEqual('payment');
    expect(mock.history.post.length).toBe(1);
  });

  it('Retrieves payment resource', async () => {
    const res = await retrievePayment({ id: resource.id }, axiosInstance);

    expect(res).toEqual(resource);
  });

  it('Lists all payment resources', async () => {
    const res = await listAllPayments({}, axiosInstance);

    expect(res).toContainEqual(resource);
  });
});
