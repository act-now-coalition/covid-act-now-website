import React from 'react';
import Circle from './Circle';

const StateCircleSvg = ({ state, ratio, fillColor }) => {
  return <Circle ratio={ratio} state={state} fillColor={fillColor} />;
};

export default StateCircleSvg;
