import React from 'react';

const InTheFormOf = ({ value }: { value: string }) => {
  return (
    <p>
      In the form of <pre>{value}</pre>
    </p>
  );
};

export default InTheFormOf;
