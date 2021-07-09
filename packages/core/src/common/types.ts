export type SecretKey = `sk_${string}`;
export type PublicKey = `pk_${string}`;
export type SecretOrPublicKey = SecretKey | PublicKey;

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
