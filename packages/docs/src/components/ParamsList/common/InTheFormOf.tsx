import React from 'react';

const InTheFormOf = ({ value }: { value: string }) => {
  return (
    <div>
      In the form of <pre>{value}</pre>
    </div>
  );
};

export default InTheFormOf;
