import { AxiosError } from 'axios';

export type SecretKey = `sk_${string}`;
export type PublicKey = `pk_${string}`;
export type SecretOrPublicKey = SecretKey | PublicKey;
export type IsSecretKey<Key extends SecretOrPublicKey> = Key extends SecretKey ? true : false;
export type IsPublicKey<Key extends SecretOrPublicKey> = Key extends PublicKey ? true : false;

export type MetadataType = Record<string, any> | undefined;

export type Currency = 'PHP';
export type ErrorSubCode =
  | 'card_expired'
  | 'cvc_invalid'
  | 'generic_decline'
  | 'fraudulent'
  | 'insufficient_funds'
  | 'processor_blocked'
  | 'lost_card'
  | 'stolen_card'
  | 'processor_unavailable'
  | 'blocked';

export interface ErrorShape {
  code: string;
  detail: string;
  source?: {
    pointer: string;
    attribute: string;
  };
  sub_code?: ErrorSubCode;
}

export interface PaymongoError {
  errors: ErrorShape[];
}

export type PaymongoRequestError = AxiosError<PaymongoError>;

export interface Billing {
  address?: {
    city?: string;
    country?: string;
    line1?: string;
    line2?: string;
    postal_code?: string;
    state?: string;
  };
  email?: string;
  name?: string;
  phone?: string;
}
