import { PaymongoError, PaymongoRequestError } from '@@common/types';
import { attachPaymentIntent } from '@@paymentIntents/paymentIntents';
import { createAxiosInstance } from '@@utils/createAxiosInstance';
import MockAdapter from 'axios-mock-adapter';

const axiosInstance = createAxiosInstance();

const mock = new MockAdapter(axiosInstance);
mock
  .onAny()
  .reply(() => [
    401,
    { errors: [{ code: 'api_key_invalid', detail: 'API key not gucci' }] } as PaymongoError,
  ]);

const ErrorOnlyCodeAndDetail: PaymongoError = {
  errors: [{ code: 'dkasd', detail: 'sadklasd' }],
};

test('handle error', async () => {
  attachPaymentIntent(
    {
      data: { attributes: { client_key: 'jaskdjawa', payment_method: 'ksadlsadA' } },
      id: 'asdjas',
    },
    axiosInstance
  ).catch((e: PaymongoRequestError) => {
    expect(e.response?.data).toMatchShapeOf(ErrorOnlyCodeAndDetail);
  });
});
