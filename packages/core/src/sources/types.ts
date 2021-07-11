import { Billing, Currency } from '@@/common/types';

export type SourceStatus = 'pending' | 'chargable' | 'cancelled' | 'expired' | 'paid';
export type SourceType = 'gcash' | 'grab_pay';

export interface SourceRedirect {
  checkout_url: string;
  success: string;
  failed: string;
}
export interface SourceResource {
  data: {
    id: string;
    type: 'source';
    attributes: {
      amount: number;
      billing?: Billing;
      currency: Currency;
      livemode: boolean;
      redirect: SourceRedirect;
      status: SourceStatus;
      type: SourceType;
      created_at: number;
      updated_at: number;
    };
  };
}

export interface CreateSourceParams {
  data: {
    attributes: {
      type: SourceType;
      amount: number;
      currency: Currency;
      redirect: Omit<SourceRedirect, 'checkout_url'>;
      billing?: Billing;
    };
  };
}

export interface RetrieveSourceParams {
  id: string;
}
