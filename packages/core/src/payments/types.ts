import { SourceType } from '@@sources/types';
import { Billing, Currency, ErrorSubCode } from '../common/types';

export type PaymentStatus = 'pending' | 'paid' | 'fail';

export type PaymentSource =
  | {
      id: string;
      type: 'card';
      brand: string;
      country: string;
      last4: string;
    }
  | { id: string; type: SourceType };

export interface PaymentResource {
  id: string;
  type: 'payment';
  attributes: {
    access_url?: string;
    amount: number;
    balance_transaction_id: string;
    billing?: Billing;
    currency: Currency;
    description?: string;
    disputed: boolean;
    external_reference_number?: string;

    // On Fail
    failed_code?: ErrorSubCode;
    failed_message?: string;

    fee: number;
    foreign_fee: number;

    livemode: boolean;
    net_amount: number;
    origin: string;
    payment_intent_id?: string;
    payout?: number;

    source: PaymentSource;

    statement_descriptor: string;
    status: PaymentStatus;

    tax_amount?: number;

    // TODO: Inquire about the structure of these types
    refunds: any[];
    taxes: any[];

    available_at: number;
    created_at: number;
    paid_at: number;
    updated_at: number;
  };
}

export interface CreatePaymentParams {
  data: {
    attributes: {
      amount: number;
      description?: string;
      currency: Currency;
      statment_descriptor?: string;
      source: {
        id: string;
        type: 'source';
      };
    };
  };
}

export interface ListAllPaymentsParams {
  before?: string;
  after?: string;
  limit?: string;
}

export interface RetrievePaymentParams {
  id: string;
}
