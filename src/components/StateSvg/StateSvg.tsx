import React from 'react';
import * as States from './index';

const StateSvg = (props: { state: keyof typeof States }) => {
  const State = States[props.state];

  return <>{State && <State />}</>;
};

export default StateSvg;
