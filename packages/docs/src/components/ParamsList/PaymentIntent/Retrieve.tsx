import React from 'react';
import Params, { ParamsListItemData } from '../Params';

const data: ParamsListItemData[] = [
  { name: 'id', type: 'string', required: true },
  { name: 'client_key', type: 'string', description: 'Required when using the public key' },
];

const Retrieve = () => <Params data={data} />;

export default Retrieve;
