import React from 'react';
import ParamsItem from '../ParamsItem';
import ParamsList from '../ParamsList';

// interface ParamsListData {
//   name: string;
//   type: string;
//   required?: boolean;
//   typeHref?: boolean;
//   children?: ParamsListData[];
// }

const PaymentMethodResourceParamsList = () => {
  return (
    <ParamsList>
      <ParamsItem name="id" type="string" required />
      <ParamsItem name="type" type="'payment_method'" required />

      <ParamsItem name="attributes" type="object" required>
        <ParamsItem name="livemode" type="boolean" required />
        <ParamsItem name="type" type="'card'" required />
        <ParamsItem name="details" type="object" required>
          <ParamsItem name="last4" type="string" required />
          <ParamsItem
            name="exp_month"
            type="number"
            description={
              <p>
                In the form of <pre>MM</pre>
              </p>
            }
            required
          />
          <ParamsItem
            name="exp_year"
            type="number"
            description={
              <p>
                In the form of <pre>YYYY</pre>
              </p>
            }
            required
          />
        </ParamsItem>
      </ParamsItem>

      <ParamsItem name="billing" type="Billing" typeHref="#create-params" />
      <ParamsItem name="metadata" type="Metadata" typeHref="#create-params" />
    </ParamsList>
  );
};

export default PaymentMethodResourceParamsList;
