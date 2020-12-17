import React from 'react';
import { CircleWrapper, StateWrapper } from 'components/StateSvg/Circle.style';
import RoomIcon from '@material-ui/icons/Room';

const MetroItemIcon: React.FC<{ ratio: number; fillColor: string }> = ({
  ratio,
  fillColor,
}) => {
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
        <RoomIcon />
      </StateWrapper>
    </CircleWrapper>
  );
};

export default MetroItemIcon;
