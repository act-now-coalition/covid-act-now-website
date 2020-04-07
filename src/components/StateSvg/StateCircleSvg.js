import React from 'react';
import Circle from './Circle';

const StateCircleSvg = ({
  state,
  ratio,
  actionBackgroundFill,
  fillColor,
  hasAction = false,
}) => {
  return (
    <Circle
      ratio={ratio}
      actionBackgroundFill={actionBackgroundFill}
      hasAction={hasAction}
      state={state}
      fillColor={fillColor}
    />
  );
};

export default StateCircleSvg;
