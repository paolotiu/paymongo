import { SecretKey } from 'common/types';
import { Paymongo } from 'Paymongo/Paymongo';
import { expectAssignable } from 'tsd';

expectAssignable<Paymongo<SecretKey>>(new Paymongo('sk_alsdkalsdk'));
