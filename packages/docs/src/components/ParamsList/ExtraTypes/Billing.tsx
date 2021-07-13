import React from 'react';
import Params, { ParamsListItemData } from '../Params';

const data: ParamsListItemData[] = [
  {
    name: 'address',
    type: 'object',
    children: [
      {
        name: 'city',
        type: 'string',
      },

      {
        name: 'country',
        type: 'string',
      },

      {
        name: 'line1',
        type: 'string',
      },

      {
        name: 'line2',
        type: 'string',
      },

      {
        name: 'postal_code',
        type: 'string',
      },

      {
        name: 'state',
        type: 'string',
      },
    ],
  },
  { name: 'email', type: 'string' },
  { name: 'name', type: 'string' },
  { name: 'phone', type: 'string' },
];
const Billing = () => <Params data={data} />;

export default Billing;
