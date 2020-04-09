import React from 'react';
import Circle from './Circle';
import * as States from './index';

const StateCircleSvg = ({
  state,
  ratio,
  actionBackgroundFill,
  fillColor,
  hasAction = false,
}: {
  state: keyof typeof States;
  ratio?: number;
  actionBackgroundFill?: string;
  fillColor?: string;
  hasAction?: boolean;
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
