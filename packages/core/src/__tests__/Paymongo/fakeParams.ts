import {
  AttachPaymentIntentParams,
  CreatePaymentIntentParams,
  RetrievePaymentIntentParams,
} from '@@paymentIntents/types';
import { CreateSourceParams, RetrieveSourceParams } from '@@sources/types';
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

export const fakeCreateSourceParams: CreateSourceParams = {
  data: {
    attributes: {
      amount: 12312,
      currency: 'PHP',
      redirect: {
        failed: 'http://localhost:3000',
        success: 'http://localhost:3000',
      },
      type: 'gcash',
    },
  },
};

export const fakeRetrieveSourceParams: RetrieveSourceParams = {
  id: 'asdjkasjdkasjd',
};
