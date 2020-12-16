import React from 'react';
import * as States from './index';
import { CircleWrapper, StateWrapper, ActionWrapper } from './Circle.style';

const CircleStateAction = ({ state, ratio = 1, fillColor }) => {
  const State = States[state];

  const DEFAULT_SIZE = 64;
  const DEFAULT_CIRCLE_RADIUS = 32;
  const ACTION_SIZE = 24;

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
      <ActionWrapper>
        <svg
          width={ACTION_SIZE}
          height={ACTION_SIZE}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g></g>
        </svg>
      </ActionWrapper>
    </CircleWrapper>
  );
};

export default CircleStateAction;
