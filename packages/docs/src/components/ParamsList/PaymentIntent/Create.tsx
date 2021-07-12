import React from 'react';
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
        children: [
          {
            name: 'amount',
            type: 'number',
            description: 'In cents (P100 = 10000)',
            required: true,
          },
          {
            name: 'payment_method_allowed',
            type: 'string[]',
            description: <PossibleValues values={['card']} />,
            required: true,
          },
          {
            name: 'curreny',
            type: 'string',
            required: true,
            description: <PossibleValues values={['PHP']} />,
          },
          {
            name: 'payment_method_options',
            type: 'object',
            isHidden: true,
            children: [
              {
                name: 'card',
                type: 'object',
                children: [
                  {
                    name: 'request_three_d_secure',
                    type: 'string',
                    description: <PossibleValues values={['any', 'automatic']} />,
                  },
                ],
              },
            ],
          },
          { name: 'description', type: 'string' },
          { name: 'metadata', type: 'Metadata' },
        ],
      },
    ],
  },
];
const Create = () => <Params data={data} />;

export default Create;
