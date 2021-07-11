import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { createSource, retrieveSource } from '@@/sources/sources';
import { SourceResource } from '@@/sources/types';
import { createMockMethods } from './createMockMethods';

const axiosInstance = axios.create();

const mock = new MockAdapter(axiosInstance);
createMockMethods(mock);

describe('Sources test', () => {
  let resource: SourceResource['data'];
  it('Creates a source', async () => {
    const res = await createSource(
      {
        data: {
          attributes: {
            amount: 13209,
            currency: 'PHP',
            redirect: {
              failed: 'http://localhost:3000',
              success: 'http://localhost:3000',
            },
            type: 'gcash',
          },
        },
      },
      axiosInstance
    );

    resource = res;
    expect(res.type).toEqual('source');
    expect(mock.history.post.length).toBe(1);
  });

  it('Retrieves a source', async () => {
    const res = await retrieveSource({ id: resource.id }, axiosInstance);

    expect(res).toEqual(resource);
    expect(mock.history.get.length).toBe(1);
  });
});
