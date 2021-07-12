import React from 'react';
import ParamsItem from '../ParamsItem';
import ParamsList from '../ParamsList';

const Create = () => {
  return (
    <ParamsList>
      <ParamsItem name="data" type="object" required>
        <ParamsItem name="attributes" type="object" required>
          <ParamsItem name="type" type="'card'" required />
          <ParamsItem name="details" type="object" required>
            <ParamsItem name="card_number" type="string" required />
            <ParamsItem name="cvc" type="string" required />
            <ParamsItem
              name="exp_month"
              type="number"
              description={
                <p>
                  In the form of <pre>MM</pre>
                </p>
              }
            />
            <ParamsItem
              name="exp_year"
              type="number"
              description={
                <p>
                  In the form of <pre>YYYY</pre>
                </p>
              }
            />
          </ParamsItem>

          <ParamsItem name="billing" type="Billing" typeHref="#create-params" />
          <ParamsItem name="metadata" type="Metadata" typeHref="#create-params" />
        </ParamsItem>
      </ParamsItem>
    </ParamsList>
  );
};

export default Create;
