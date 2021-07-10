import {
  AttachPaymentIntentParams,
  CreatePaymentIntentParams,
  RetrievePaymentIntentParams,
} from '@@/paymentIntents/types';
import faker from 'faker';

export const fakePaymentMethodParams = {
  data: {
    attributes: {
      type: 'card',
      details: {
        card_number: faker.finance.creditCardNumber(),
        cvc: faker.finance.creditCardCVV(),
        exp_month: 9,
        exp_year: 2090,
      },
      metadata: { hey: 'there' },
    },
  },
} as const;

export const fakeCreatePaymentIntentParams: CreatePaymentIntentParams = {
  data: {
    attributes: {
      amount: 1000,
      currency: 'PHP',
      payment_method_allowed: ['card'],
    },
  },
};

export const fakeRetrievePaymentIntentParams: RetrievePaymentIntentParams<true> = {
  client_key: 'sadjkasd',
  id: 'sdkasdjkasd',
};

export const fakeAttachPaymentIntentParams: AttachPaymentIntentParams<true> = {
  data: {
    attributes: {
      client_key: 'sadjkasd',
      payment_method: 'sadjkasdA',
    },
  },
  id: 'sadjkasd',
};
