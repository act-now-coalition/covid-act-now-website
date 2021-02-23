import React from 'react';
import Circle from './Circle';

const StateCircleSvg = ({
  state,
  ratio,
  fillColor,
}: {
  state: string | null;
  ratio: number;
  fillColor: string;
}) => {
  return state ? (
    <Circle ratio={ratio} state={state} fillColor={fillColor} />
  ) : null;
};

export default StateCircleSvg;
