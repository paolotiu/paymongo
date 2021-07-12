import React from 'react';

interface Props {
  values: string[];
}

const PossibleValues = ({ values }: Props) => {
  return (
    <>
      <span>Possible value(s):</span>
      {values.map((v, i) => {
        if (i === 0) return <pre>{v}</pre>;
        return (
          <>
            <span>|</span>
            <pre>{v}</pre>
          </>
        );
      })}
    </>
  );
};

export default PossibleValues;
