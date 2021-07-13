import React from 'react';
import InCents from '../common/InCents';
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
            name: 'amount',
            type: 'number',
            required: true,
            description: <InCents />,
          },
          { name: 'description', type: 'string' },
          {
            name: 'currenct',
            type: 'string',
            required: true,
            description: <PossibleValues values={['PHP']} />,
          },
          {
            name: 'statement_descriptor',
            type: 'string',
          },
          {
            name: 'source',
            type: 'object',
            required: true,
            children: [
              {
                name: 'id',
                type: 'string',
                required: true,
              },

              {
                name: 'type',
                type: 'string',
                description: <PossibleValues values={['source']} />,
                required: true,
              },
            ],
          },
        ],
      },
    ],
  },
];

const Create = () => <Params data={data} />;

export default Create;
