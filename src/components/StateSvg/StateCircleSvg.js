import React from 'react';
import Circle from './Circle';

const StateCircleSvg = ({
  state,
  ratio,
  actionBackgroundFill,
  intervention,
  hasAction = false,
}) => {
  return (
    <Circle
      ratio={ratio}
      actionBackgroundFill={actionBackgroundFill}
      hasAction={hasAction}
      state={state}
      intervention={intervention}
    />
  );
};

export default StateCircleSvg;
