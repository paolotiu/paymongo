import React from 'react';
import AmountDesc from '../common/AmountDesc';
import PossibleValues from '../common/PossibleValues';
import Params, { ParamsListItemData } from '../Params';

const data: ParamsListItemData[] = [
  { name: 'id', type: 'string', required: true },
  {
    name: 'type',
    type: 'string',
    required: true,
    description: <PossibleValues values={['source']} />,
  },
  {
    name: 'attributes',
    type: 'object',
    required: true,
    children: [
      {
        name: 'amount',
        type: 'number',
        required: true,
        description: <AmountDesc />,
      },

      {
        name: 'currency',
        type: 'string',
        required: true,
        description: <PossibleValues values={['PHP']} />,
      },
      {
        name: 'livemode',
        type: 'boolean',
        required: true,
      },

      {
        name: 'redirect',
        type: 'object',
        required: true,
        children: [
          { name: 'checkout_url', type: 'string', required: true },
          { name: 'success', type: 'string', required: true },
          { name: 'failed', type: 'string', required: true },
        ],
      },

      {
        name: 'status',
        type: 'string',
        required: true,
        description: (
          <PossibleValues values={['pending', 'chargeable', 'cancelled', 'expired', 'paid']} />
        ),
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: <PossibleValues values={['gcash', 'grab_pay']} />,
      },
      {
        name: 'created_at',
        type: 'number',
        required: true,
      },

      {
        name: 'updated_at',
        type: 'number',
        required: true,
      },
      {
        name: 'billing',
        type: 'Billing',
        typeHref: 'extra-types#billing',
      },
    ],
  },
];

const Resource = () => <Params data={data} />;

export default Resource;
