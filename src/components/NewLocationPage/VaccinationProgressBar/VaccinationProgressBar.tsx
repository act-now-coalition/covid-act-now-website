import React from 'react';
import { ParentSize } from '@vx/responsive';
import { v4 as uuidv4 } from 'uuid';
import { ProgressBarContainer } from './VaccinationProgressBar.style';
import { COLOR_MAP } from 'common/colors';
import { formatPercent } from 'common/utils';
import { ProgressBarProps } from './VaccinationProgressBlock';

function getOffsetPercentage(decimal: number) {
  return formatPercent(decimal, 1);
}

const ProgressBar: React.FC<{
  vaccinationsInitiated: number;
  vaccinationsCompleted: number;
  locationName: string;
  width: number;
}> = ({
  vaccinationsInitiated,
  vaccinationsCompleted,
  locationName,
  width,
}) => {
  const height = 16;

  const gradientId = uuidv4();
  const titleId = uuidv4();

  const initiatedFill = COLOR_MAP.NEW_BLUE.BASE;
  const completedFill = COLOR_MAP.NEW_BLUE.MEDIUM;
  const backgroundFill = COLOR_MAP.GREY_1;

  return (
    <svg width={width} height={height} role="img" aria-labelledby={titleId}>
      <title id={titleId}>
        Progress bar showing that in {locationName},{' '}
        {formatPercent(vaccinationsInitiated)} of the population has received at
        least 1 dose of a COVID vaccine, and{' '}
        {formatPercent(vaccinationsCompleted)} of the population has been fully
        vaccinated.
      </title>
      <defs>
        <linearGradient id={gradientId}>
          <stop
            offset={getOffsetPercentage(vaccinationsInitiated)}
            stopColor={initiatedFill}
          />
          <stop
            offset={getOffsetPercentage(vaccinationsInitiated)}
            stopColor={completedFill}
          />
          <stop
            offset={getOffsetPercentage(vaccinationsCompleted)}
            stopColor={completedFill}
          />
          <stop
            offset={getOffsetPercentage(vaccinationsCompleted)}
            stopColor={backgroundFill}
          />
          <stop offset="100%" stopColor={backgroundFill} />
        </linearGradient>
      </defs>
      <rect
        fill={`url(#${gradientId})`}
        width={width}
        height={height}
        rx={4}
        ry={4}
      />
    </svg>
  );
};

const VaccinationProgressBarAutosize: React.FC<ProgressBarProps> = ({
  vaccinationsInitiated,
  vaccinationsCompleted,
  locationName,
}) => {
  return (
    <ProgressBarContainer>
      <ParentSize>
        {({ width }) => (
          <ProgressBar
            vaccinationsInitiated={vaccinationsInitiated}
            vaccinationsCompleted={vaccinationsCompleted}
            locationName={locationName}
            width={width}
          />
        )}
      </ParentSize>
    </ProgressBarContainer>
  );
};

export default VaccinationProgressBarAutosize;
