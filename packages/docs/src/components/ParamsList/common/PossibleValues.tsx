import React from 'react';

interface Props {
  values: string[];
}

const PossibleValues = ({ values }: Props) => {
  return (
    <>
      <span>Possible value(s):</span>
      {values.map((v, i) => {
        if (i === 0) return <pre key={v}>{v}</pre>;
        return (
          <React.Fragment key={v}>
            <span>|</span>
            <pre>{v}</pre>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default PossibleValues;
