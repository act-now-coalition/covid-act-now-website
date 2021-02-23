import React from 'react';
import States from './index';

const StateSvg = ({ state }: { state: string }) => {
  const State = States[state];

  return <>{State && <State />}</>;
};

export default StateSvg;
