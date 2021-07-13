import React from 'react';
import AmountDesc from '../common/AmountDesc';
import InCents from '../common/InCents';
import PossibleValues from '../common/PossibleValues';
import Params, { ParamsListItemData } from '../Params';

const data: ParamsListItemData[] = [
  { name: 'id', type: 'string', required: true },
  {
    name: 'type',
    type: 'string',
    required: true,
    description: <PossibleValues values={['payment']} />,
  },
  {
    name: 'attributes',
    type: 'object',
    required: true,
    children: [
      {
        name: 'access_url',
        type: 'string',
      },
      {
        name: 'amount',
        type: 'number',
        required: true,
        description: <AmountDesc />,
      },
      {
        name: 'balance_transaction_id',
        type: 'string',
        required: true,
      },
      {
        name: 'billing',
        type: 'Billing',
        typeHref: 'extra-types#billing',
      },
      {
        name: 'currency',
        type: 'string',
        required: true,
        description: <PossibleValues values={['PHP']} />,
      },
      {
        name: 'description',
        type: 'string',
      },
      {
        name: 'disputed',
        type: 'boolean',
        required: true,
      },
      {
        name: 'failed_code',
        type: 'ErrorSubCode',
        typeHref: 'extra-types#error-sub-code',
      },
      {
        name: 'failed_message',
        type: 'string',
      },
      {
        name: 'livemode',
        type: 'boolean',
        required: true,
      },
      {
        name: 'net_amount',
        type: 'number',
        description: <InCents />,
        required: true,
      },
      {
        name: 'origin',
        type: 'string',
        required: true,
      },
      {
        name: 'payment_intent_id',
        type: 'string',
      },
      {
        name: 'payout',
        type: 'number',
        description: <InCents />,
      },
      {
        name: 'source',
        type: 'PaymentSource',
        required: true,
        typeHref: 'extra-types#payment-source',
      },
      {
        name: 'statement_descriptor',
        type: 'string',
        required: true,
      },
      {
        name: 'status',
        type: 'string',
        description: <PossibleValues values={['pending', 'paid', 'failed']} />,
      },
      {
        name: 'tax_amount',
        type: 'number',
        description: <InCents />,
      },
      {
        name: 'refund',
        type: 'any[]',
        required: true,
      },
      {
        name: 'taxes',
        type: 'any[]',
        required: true,
      },

      {
        name: 'available_at',
        type: 'number',
        required: true,
      },

      {
        name: 'created_at',
        type: 'number',
        required: true,
      },
      {
        name: 'paid_at',
        type: 'number',
        required: true,
      },

      {
        name: 'updated_at',
        type: 'number',
        required: true,
      },
    ],
  },
];

const Resource = () => <Params data={data} />;

export default Resource;
