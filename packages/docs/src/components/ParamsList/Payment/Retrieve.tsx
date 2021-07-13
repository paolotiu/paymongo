import React from 'react';
import Params, { ParamsListItemData } from '../Params';

const data: ParamsListItemData[] = [
  {
    name: 'id',
    type: 'string',
    required: true,
  },
];

const Retrieve = () => <Params data={data} />;

export default Retrieve;
