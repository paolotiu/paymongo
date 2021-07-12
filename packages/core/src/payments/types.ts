import { Billing, Currency, PossibleErrorSubCodes } from '../common/types';

export type PaymentStatus = 'pending' | 'paid' | 'fail';

export interface PaymentSource {
  id: string;
  type: 'card';
  brand: string;
  country: string;
  last4: string;
}

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
    failed_code?: PossibleErrorSubCodes;
    failed_message?: string;

    fee: number;
    foreign_fee: number;

    livemode: boolean;
    net_amount: number;
    origin: string;
    payment_intent_id: string;
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
