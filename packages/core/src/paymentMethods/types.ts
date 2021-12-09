import { AllowedPaymentMethods, Billing, MetadataType } from '@@common/types';

export interface PaymentMethodResource<Metadata = MetadataType> {
  id: string;
  type: 'payment_method';
  attributes: {
    livemode: boolean;
    type: AllowedPaymentMethods;
    billing?: Billing;
    details?: {
      last4: string;
      exp_month: number;
      exp_year: number;
    };
    metadata: Metadata;
  };
}

export interface CreatePaymentMethodParams<Metadata = MetadataType> {
  data: {
    attributes: {
      type: AllowedPaymentMethods;
      details?: {
        card_number: string;
        exp_month: number;
        exp_year: number;
        cvc: string;
      };
      billing?: Billing;
      metadata?: Metadata;
    };
  };
}

export interface RetrievePaymentMethodParams {
  id: string;
}
