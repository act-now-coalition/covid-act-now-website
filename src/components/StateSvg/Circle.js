import React from 'react';
import * as States from './index';

import { COLOR_MAP } from 'enums/interventions';
import { CircleWrapper, StateWrapper, ActionWrapper } from './Circle.style';

const CircleStateAction = ({
  state,
  ratio = 1,
  actionBackgroundFill = '#FFFFFF',
  fillColor,
  hasAction = false,
}) => {
  const State = States[state];

  const getAction = () => {
    switch (fillColor) {
      case COLOR_MAP.GREEN:
        return (
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
            fill={fillColor}
          />
        );
      case COLOR_MAP.RED:
      case COLOR_MAP.ORANGE:
        return (
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
            fill={fillColor}
          />
        );
      default:
    }
  };

  const DEFAULT_SIZE = 64;
  const DEFAULT_CIRCLE_RADIUS = 32;
  const DEFAULT_SMALL_CIRCLE_RADIUS = 12;
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
          <g>
            {hasAction && (
              <>
                <circle
                  cx="12"
                  cy="12"
                  r={ratio * DEFAULT_SMALL_CIRCLE_RADIUS}
                  fill={actionBackgroundFill}
                />
                {getAction()}
              </>
            )}
          </g>
        </svg>
      </ActionWrapper>
    </CircleWrapper>
  );
};

export default CircleStateAction;
