import React from 'react';
import PossibleValues from '../common/PossibleValues';
import Params, { ParamsListItemData } from '../Params';

const data: ParamsListItemData[] = [
  {
    name: 'id',
    type: 'string',
    required: true,
  },
  {
    name: 'type',
    type: 'string',
    required: true,
    description: <PossibleValues values={['payment_intent']} />,
  },
  {
    name: 'attributes',
    type: 'object',
    required: true,
    children: [
      { name: 'amount', type: 'number', required: true },
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
      { name: 'statment_descriptor', type: 'string', required: true },
      {
        name: 'status',
        type: 'string',
        required: true,
        description: (
          <PossibleValues
            values={['awaiting_payment_method', 'awaiting_next_action', 'processing', 'succeeded']}
          />
        ),
      },
      { name: 'livemode', type: 'boolean', required: true },
      { name: 'client_key', type: 'string', required: true },
      {
        name: 'last_payment_error',
        type: 'object',
        isHidden: true,
        children: [
          { name: 'payment', type: 'string' },
          { name: 'failed_code', type: 'PossibleErrorCodes' },
          { name: 'failed_message', type: 'string' },
          { name: 'failed_method', type: 'string' },
        ],
      },
      { name: 'next_action', type: 'NextAction' },
      {
        name: 'payment_method_allowed',
        type: 'string[]',
        required: true,
        description: <PossibleValues values={['card']} />,
      },
      {
        name: 'payments',
        type: 'PaymentResource[]',
        required: true,
      },
      {
        name: 'payment_method_options',
        type: 'object',
        required: true,
        children: [
          {
            name: 'card',
            type: 'object',
            required: true,
            children: [
              {
                name: 'request_three_d_secure',
                type: 'string',
                required: true,
                description: <PossibleValues values={['any', 'automatic']} />,
              },
            ],
          },
        ],
      },
      {
        name: 'metadata',
        type: 'MetaData',
      },
    ],
  },
];

const Resource = () => <Params data={data} />;

export default Resource;
