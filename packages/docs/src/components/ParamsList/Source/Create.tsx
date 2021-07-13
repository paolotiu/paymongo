import React from 'react';
import AmountDesc from '../common/AmountDesc';
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
          {
            name: 'type',
            type: 'string',
            description: <PossibleValues values={['gcash', 'grab_pay']} />,
            required: true,
          },
          { name: 'amount', type: 'number', description: <AmountDesc />, required: true },
          {
            name: 'currency',
            type: 'string',
            description: <PossibleValues values={['PHP']} />,
            required: true,
          },
          {
            name: 'redirect',
            type: 'object',
            required: true,
            children: [
              { name: 'success', type: 'string', required: true },
              { name: 'failed', type: 'string', required: true },
            ],
          },
          { name: 'billing', type: 'Billing', typeHref: 'extra-types#billing' },
        ],
      },
    ],
  },
];

const Create = () => <Params data={data} />;

export default Create;
