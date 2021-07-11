import  Paymongo  from '../index';

it('Exports Paymongo class', () => {
  const paymongo = new Paymongo('sk_sdklaskdlsaasdjksad');

  expect(paymongo instanceof Paymongo).toBe(true);
});
