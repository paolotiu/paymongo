import { Currency, MetadataType, PossibleErrorSubCodes } from '../common/types';
import { Payment } from '../payments/types';

export type PaymentIntentStatus =
  | 'awaiting_payment_method'
  | 'awaiting_next_action'
  | 'processing'
  | 'succeeded';

export interface LastPaymentError {
  payment: string;
  failed_code: PossibleErrorSubCodes;
  failed_message: string;
  payment_method: string;
}

export interface NextAction {
  type: 'redirect';
  redirect: {
    url: string;
    return_url: string;
  };
}

export interface PaymentMethodOptions {
  card: {
    request_three_d_secure: 'any' | 'automatic';
  };
}
export interface PaymentIntentResource<Metadata = MetadataType> {
  data: {
    id: string;
    type: 'payment_intent';
    attributes: {
      amount: number;
      currency: Currency;
      description?: string;

      statement_descriptor: string;
      status: PaymentIntentStatus;
      livemode: boolean;

      client_key: string;

      last_payment_error?: LastPaymentError;

      next_action?: NextAction;

      payment_method_allowed: ['card'];
      payments: Payment[];

      payment_method_options: PaymentMethodOptions;

      metadata: Metadata;
    };
  };
}

export interface CreatePaymentIntentParams<Metadata = MetadataType> {
  data: {
    attributes: {
      amount: number;
      payment_method_allowed: ['card'];
      payment_method_options?: PaymentMethodOptions;
      description?: string;
      statement_descriptor?: string;
      currency: Currency;
      metadata?: Metadata;
    };
  };
}

export interface BaseRetrievePaymentIntentParams {
  id: string;
  client_key?: string;
}

export interface RetrievePaymentIntentParamsWithSecret extends BaseRetrievePaymentIntentParams {
  client_key: string;
}

export type RetrievePaymentIntentParams<UsingSecret extends boolean> = UsingSecret extends true
  ? RetrievePaymentIntentParamsWithSecret
  : BaseRetrievePaymentIntentParams;

export interface BaseAttachPaymentIntentParams {
  id: string;
  data: {
    attributes: {
      payment_method: string;
      client_key?: string;
      return_url?: string;
    };
  };
}

export interface AttachPaymentIntentParamsWithSecret extends BaseAttachPaymentIntentParams {
  data: {
    attributes: {
      payment_method: string;
      client_key: string;
      return_url?: string;
    };
  };
}

export type AttachPaymentIntentParams<UsingSecret extends boolean> = UsingSecret extends true
  ? AttachPaymentIntentParamsWithSecret
  : BaseAttachPaymentIntentParams;
