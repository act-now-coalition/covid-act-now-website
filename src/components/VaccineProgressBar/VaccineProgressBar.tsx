import React from 'react';
import { ParentSize } from '@vx/responsive';
import { v4 as uuidv4 } from 'uuid';
import { ProgressBarContainer, StyledSvg } from './VaccineProgressBar.style';
import { vaccineColor } from 'common/colors';
import { formatPercent } from 'common/utils';

export interface ProgressBarProps {
  locationName: string;
  vaccinationsRatio: number;
  width?: number;
}

function getOffsetPercentage(decimal: number) {
  return formatPercent(decimal, 1);
}

const VaccineProgressBar: React.FC<ProgressBarProps & { width: number }> = ({
  vaccinationsRatio,
  locationName,
  width,
}) => {
  const height = 18;
  const color = vaccineColor(vaccinationsRatio);
  const titleId = uuidv4();

  return (
    <StyledSvg
      width={width}
      height={height}
      role="img"
      aria-labelledby={titleId}
    >
      <title id={titleId}>
        Progress bar showing that in {locationName},{' '}
        {formatPercent(vaccinationsRatio)} of the population has received a dose
        of the bivalent Covid-19 vaccine.
      </title>

      <g>
        <rect
          fill={color}
          x={0}
          width={getOffsetPercentage(vaccinationsRatio)}
          height={height}
        />
      </g>
    </StyledSvg>
  );
};

const VaccineProgressBarAutosize: React.FC<ProgressBarProps> = props => {
  return (
    <ProgressBarContainer>
      {/* Adding display:flex makes sure the ParentSize container is tight to its contents */}
      <ParentSize style={{ display: 'flex' }}>
        {({ width }) => (
          <VaccineProgressBar
            {...props}
            // If no width prop is passed, the progress bar is responsive and uses ParentSize width
            width={props.width ? props.width : width}
          />
        )}
      </ParentSize>
    </ProgressBarContainer>
  );
};

export { VaccineProgressBarAutosize as VaccineProgressBar };
