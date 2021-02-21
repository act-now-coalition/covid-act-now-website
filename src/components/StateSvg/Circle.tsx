import React from 'react';
import States from './index';
import { CircleWrapper, StateWrapper } from './Circle.style';

const CircleStateAction = ({
  state,
  ratio = 1,
  fillColor,
}: {
  state: string;
  ratio: number;
  fillColor: string;
}) => {
  const State = States[state];

  const DEFAULT_SIZE = 64;
  const DEFAULT_CIRCLE_RADIUS = 32;

  const size = ratio * DEFAULT_SIZE;

  return (
    <CircleWrapper size={size}>
      <div>
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <circle
              cx="32"
              cy="32"
              r={ratio * DEFAULT_CIRCLE_RADIUS}
              fill={fillColor}
            />
          </g>
        </svg>
      </div>
      <StateWrapper size={size} ratio={ratio}>
        <State />
      </StateWrapper>
    </CircleWrapper>
  );
};

export default CircleStateAction;
