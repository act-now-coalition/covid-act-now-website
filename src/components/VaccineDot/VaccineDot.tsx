import { vaccineColor } from 'common/colors';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export enum DotStyle {
  SOLID,
  HATCHED,
}

export interface VaccineDotProps {
  vaccinationsInitiated: number;
  size?: number;
  dotStyle?: DotStyle;
}
const VaccineDot: React.FC<VaccineDotProps> = ({
  vaccinationsInitiated,
  dotStyle = DotStyle.SOLID,
  size = 10,
  ...otherProps
}) => {
  const color = vaccineColor(vaccinationsInitiated);
  const hatchPatternId = uuidv4();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 10 10"
      {...otherProps}
    >
      <defs>
        <pattern
          id={hatchPatternId}
          width="2.5"
          height="1"
          patternTransform="rotate(45 0 0)"
          patternUnits="userSpaceOnUse"
        >
          <line x1="1" y1="0" x2="1" y2="1" stroke={color} strokeWidth={1.25} />
        </pattern>
      </defs>

      <circle
        fill={dotStyle === DotStyle.SOLID ? color : `url(#${hatchPatternId})`}
        cx="5"
        cy="5"
        r="5"
      />
    </svg>
  );
};

export default VaccineDot;
