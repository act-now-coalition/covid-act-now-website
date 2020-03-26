import React from 'react';
import * as States from './index';

import { 
  INTERVENTIONS,
  INTERVENTION_COLOR_MAP,
} from 'enums/interventions';

import {
  CircleWrapper,
  StateWrapper,
} from './Circle.style';

const CircleStateAction = ({ 
  state,
  ratio = 1,
  actionBackgroundFill = '#FFFFFF',
  intervention,
  hasAction = false,
}) => {
  const fillColor = INTERVENTION_COLOR_MAP[intervention];
  const State = States[state];

  const getAction = () => {
    switch (intervention) {
      case INTERVENTIONS.SHELTER_IN_PLACE:
        return <path d="M54 44C48.48 44 44 48.48 44 54C44 59.52 48.48 64 54 64C59.52 64 64 59.52 64 54C64 48.48 59.52 44 54 44ZM52 59L47 54L48.41 52.59L52 56.17L59.59 48.58L61 50L52 59Z" fill={fillColor} />;
      case INTERVENTIONS.LIMITED_ACTION:
      case INTERVENTIONS.SOCIAL_DISTANCING:
      case INTERVENTIONS.LOCKDOWN:
        return <path d="M54 44C48.48 44 44 48.48 44 54C44 59.52 48.48 64 54 64C59.52 64 64 59.52 64 54C64 48.48 59.52 44 54 44ZM55 59H53V57H55V59ZM55 55H53V49H55V55Z" fill={fillColor} />
      default:
    }
  };

  const DEFAULT_SIZE = 64;
  const DEFAULT_CIRCLE_RADIUS = 32;
  const DEFAULT_SMALL_CIRCLE_RADIUS = 12;

  const size = ratio * DEFAULT_SIZE;

  return (
    <CircleWrapper size={size}>
      <div>
         <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            <circle cx="32" cy="32" r={ratio * DEFAULT_CIRCLE_RADIUS} fill={fillColor}/>
              { hasAction &&
                  <>
                    <circle cx="54" cy="54" r={ratio * DEFAULT_SMALL_CIRCLE_RADIUS} fill={actionBackgroundFill}/>
                    {getAction()}
                  </>
              }
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
