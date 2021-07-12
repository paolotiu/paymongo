/**
 * @jest-environment jsdom
 */

import { Paymongo } from '@@Paymongo/Paymongo';

describe('Paymongo browser env', () => {
  it('Errors when using the secret key in the browser', () => {
    expect(() => new Paymongo('sk_kasdlkasd')).toThrowError();
  });

  it('Gets xhr adapter', () => {
    process.env.NODE_ENV = 'dev';
    const paymongo = new Paymongo('pk_sdkasadj');

    const config = (paymongo as any)._getConfig();

    // eslint-disable-next-line global-require
    expect(config).toEqual({ adapter: require('axios/lib/adapters/xhr') });
  });
});
