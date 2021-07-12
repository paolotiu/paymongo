import React from 'react';
import InTheFormOf from '../common/InTheFormOf';
import PossibleValues from '../common/PossibleValues';
import Params, { ParamsListItemData } from '../Params';

const data: ParamsListItemData[] = [
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
          { name: 'card', type: 'string', description: <PossibleValues values={['card']} /> },
          {
            name: 'details',
            type: 'object',
            required: true,
            children: [
              { name: 'card_number', type: 'string', required: true },
              {
                name: 'exp_month',
                type: 'month',
                required: true,
                description: <InTheFormOf value="MM" />,
              },

              {
                name: 'exp_year',
                type: 'month',
                required: true,
                description: <InTheFormOf value="YYYY" />,
              },
              {
                name: 'cvc',
                type: 'string',
                required: true,
              },
            ],
          },
          { name: 'billing', type: 'Billing' },
          { name: 'metadata', type: 'Metadata' },
        ],
      },
    ],
  },
];

const Create = () => <Params data={data} />;

export default Create;
