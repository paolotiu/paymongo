import React from 'react';
import Params, { ParamsListItemData } from '../Params';

const data: ParamsListItemData[] = [
  {
    name: 'before',
    type: 'string',
    description:
      'a resource ID that defines your place in the list. For example, if you make a request and receive 20 resources, starting with some_resource_id, your subsequent call can include before=some_resource_id in order to fetch the previous page of the list.',
  },

  {
    name: 'after',
    type: 'string',
    description:
      'a resource ID that defines your place in the list. For example, if you make a list request and receive 20 resources, ending with some_resource_id, your subsequent call can include after=some_resource_id in order to fetch the next page of the list.',
  },

  {
    name: 'limit',
    type: 'string',
    description: 'Limit of resources to return. Default: 20',
  },
];
const List = () => <Params data={data} />;

export default List;
