import React from 'react';
import ParamsItem from '../ParamsItem';
import ParamsList from '../ParamsList';

const Retrieve = () => {
  return (
    <ParamsList>
      <ParamsItem name="id" type="string" required />
    </ParamsList>
  );
};

export default Retrieve;
