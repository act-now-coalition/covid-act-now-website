import React from 'react';
import { ParentSize } from '@vx/responsive';
import { v4 as uuidv4 } from 'uuid';
import { ProgressBarContainer, StyledSvg } from './VaccineProgressBar.style';
import { COLOR_MAP, VACCINATIONS_COLOR_MAP, vaccineColor } from 'common/colors';
import { formatPercent } from 'common/utils';

export interface ProgressBarProps {
  // TODO(michael): Remove once we migrate the location page to the new version.
  oldVersion?: boolean;
  locationName: string;
  vaccinationsInitiated: number;
  vaccinationsCompleted: number;
}

function getOffsetPercentage(decimal: number) {
  return formatPercent(decimal, 1);
}

const VaccineProgressBar: React.FC<ProgressBarProps & { width: number }> = ({
  oldVersion = false,
  vaccinationsInitiated,
  vaccinationsCompleted,
  locationName,
  width,
}) => {
  const height = 18;
  const color = oldVersion
    ? VACCINATIONS_COLOR_MAP.COMPLETED
    : vaccineColor(vaccinationsInitiated);

  const titleId = uuidv4();
  const hatchPatternId = uuidv4();

  return (
    <StyledSvg
      width={width}
      height={height}
      role="img"
      aria-labelledby={titleId}
    >
      <title id={titleId}>
        Progress bar showing that in {locationName},{' '}
        {formatPercent(vaccinationsInitiated)} of the population has received at
        least 1 dose of a COVID vaccine, and{' '}
        {formatPercent(vaccinationsCompleted)} of the population has been fully
        vaccinated.
      </title>

      <defs>
        <pattern
          id={hatchPatternId}
          width="3"
          height="1"
          patternTransform="rotate(45 0 0)"
          patternUnits="userSpaceOnUse"
        >
          <line x1="1" y1="0" x2="1" y2="1" stroke={color} strokeWidth={1.5} />
        </pattern>
      </defs>

      <g>
        {/* Vaccinations Completed section (solid) */}
        <rect
          fill={color}
          x={0}
          width={getOffsetPercentage(vaccinationsCompleted)}
          height={height}
        />
        {/* Vaccinations Initiated section (hatched pattern) */}
        <rect
          fill={
            oldVersion
              ? VACCINATIONS_COLOR_MAP.INITIATED
              : `url(#${hatchPatternId})`
          }
          x={getOffsetPercentage(vaccinationsCompleted)}
          width={getOffsetPercentage(
            vaccinationsInitiated - vaccinationsCompleted,
          )}
          height={height}
        />
        {oldVersion && (
          <rect
            fill={COLOR_MAP.GREY_2}
            x={getOffsetPercentage(vaccinationsInitiated)}
            width={getOffsetPercentage(1 - vaccinationsInitiated)}
            height={height}
          />
        )}
      </g>
    </StyledSvg>
  );
};

const VaccineProgressBarAutosize: React.FC<ProgressBarProps> = props => {
  return (
    <ProgressBarContainer>
      {/* Not sure if this display flex feels right-- */}
      <ParentSize style={{ display: 'flex' }}>
        {({ width }) => <VaccineProgressBar {...props} width={width} />}
      </ParentSize>
    </ProgressBarContainer>
  );
};

export { VaccineProgressBarAutosize as VaccineProgressBar };
