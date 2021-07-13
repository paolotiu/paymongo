import React from 'react';
import Params, { ParamsListItemData } from '../Params';

const data: ParamsListItemData[] = [
  {
    name: 'errors',
    type: 'ErrorShape[]',
    required: true,
    children: [
      {
        name: 'code',
        type: 'string',
        required: true,
      },
      { name: 'detail', type: 'string', required: true },
      {
        name: 'source',
        type: 'object',
        children: [
          { name: 'pointer', type: 'string' },
          { name: 'attribute', type: 'string' },
        ],
      },
      { name: 'sub_code', type: 'ErrorSubCode', typeHref: '#error-sub-code' },
    ],
  },
];
const PaymongoError = () => <Params data={data} />;

export default PaymongoError;
