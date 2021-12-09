import { PaymentResource } from '@@payments/types';
import { Currency, MetadataType, ErrorSubCode } from '../common/types';

export type PaymentIntentStatus =
  | 'awaiting_payment_method'
  | 'awaiting_next_action'
  | 'processing'
  | 'succeeded';

export type PaymentMethodsAllowed =
  | 'card'
  | 'paymaya';

export interface LastPaymentError {
  payment: string;
  failed_code: ErrorSubCode;
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

    payment_method_allowed: PaymentMethodsAllowed[];
    payments: PaymentResource[];

    payment_method_options?: PaymentMethodOptions;

    metadata: Metadata;
  };
}

export interface CreatePaymentIntentParams<Metadata = MetadataType> {
  data: {
    attributes: {
      amount: number;
      payment_method_allowed: PaymentMethodsAllowed[];
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

export interface RetrievePaymentIntentParamsUsingPublic extends BaseRetrievePaymentIntentParams {
  client_key: string;
}

export type RetrievePaymentIntentParams<UsingPublic extends boolean> = UsingPublic extends true
  ? RetrievePaymentIntentParamsUsingPublic
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

export interface AttachPaymentIntentParamsUsingPublic extends BaseAttachPaymentIntentParams {
  data: {
    attributes: {
      payment_method: string;
      client_key: string;
      return_url?: string;
    };
  };
}

export type AttachPaymentIntentParams<UsingPublic extends boolean> = UsingPublic extends true
  ? AttachPaymentIntentParamsUsingPublic
  : BaseAttachPaymentIntentParams;
