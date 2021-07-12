import React from 'react';
import Params, { ParamsListItemData } from '../Params';

const data: ParamsListItemData[] = [
  { name: 'id', type: 'string', required: true, description: 'ID of the payment intent' },
  {
    name: 'data',
    type: 'object',
    required: true,
    children: [
      {
        name: 'attributes',
        type: 'object',
        required: true,
        children: [
          {
            name: 'payment_method',
            type: 'string',
            description: 'ID of the payment method',
            required: true,
          },
          { name: 'client_key', type: 'string', description: 'Required when using the public key' },
          { name: 'return_url', type: 'string' },
        ],
      },
    ],
  },
];

const Attach = () => <Params data={data} />;

export default Attach;
