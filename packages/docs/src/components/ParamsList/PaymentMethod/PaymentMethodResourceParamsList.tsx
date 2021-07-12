import React from 'react';
import InTheFormOf from '../common/InTheFormOf';
import PossibleValues from '../common/PossibleValues';
import Params, { ParamsListItemData } from '../Params';

const data: ParamsListItemData[] = [
  { name: 'id', type: 'string', required: true },
  {
    name: 'type',
    type: 'string',
    required: true,

    description: <PossibleValues values={['payment_method']} />,
  },
  {
    name: 'attributes',
    type: 'object',
    required: true,
    children: [
      {
        name: 'livemode',
        type: 'boolean',
        required: true,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: <PossibleValues values={['card']} />,
      },

      {
        name: 'details',
        type: 'object',
        required: true,
        children: [
          { name: 'last4', type: 'string', required: true },
          {
            name: 'exp_month',
            type: 'number',
            required: true,
            description: <InTheFormOf value="MM" />,
          },

          {
            name: 'exp_year',
            type: 'number',
            required: true,
            description: <InTheFormOf value="YYYY" />,
          },
        ],
      },
      { name: 'billing', type: 'Billing' },
      { name: 'metadata', type: 'Metadata' },
    ],
  },
];

const Resource = () => <Params data={data} />;

export default Resource;
