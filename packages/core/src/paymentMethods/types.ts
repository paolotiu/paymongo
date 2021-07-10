import { Billing, MetadataType } from '../common/types';

export interface PaymentMethodResource<Metadata = MetadataType> {
  data: {
    id: string;
    type: 'payment_method';
    attributes: {
      livemode: boolean;
      type: 'card';
      billing?: Billing;
      details: {
        last4: string;
        exp_month: number;
        exp_year: number;
      };
      metadata: Metadata;
    };
  };
}

export interface CreatePaymentMethodParams<Metadata = MetadataType> {
  data: {
    attributes: {
      type: 'card';
      details: {
        card_number: string;
        exp_month: number;
        exp_year: number;
        cvc: string;
      };
      billng?: Billing;

      metadata?: Metadata;
    };
  };
}

export interface RetrievePaymentMethodParams {
  id: string;
}
