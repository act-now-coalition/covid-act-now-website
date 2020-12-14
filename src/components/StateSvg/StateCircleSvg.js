import React from 'react';
import Circle from './Circle';

const StateCircleSvg = ({ state, ratio, fillColor, hasAction = false }) => {
  return (
    <Circle
      ratio={ratio}
      actionBackgroundFill="#FFFFFF"
      hasAction={hasAction}
      state={state}
      fillColor={fillColor}
    />
  );
};

export default StateCircleSvg;
