import React from 'react';
import { Series } from './interfaces';
import SingleLocationChart from './SingleLocationChart';
import MultipleLocationsChart from './MultipleLocationsChart';
import { TimeUnit } from '@actnowcoalition/time-utils';

const ExploreChart: React.FC<{
  hasMultipleLocations: boolean;
  width: number;
  height: number;
  seriesList: Series[];
  isMobile: boolean;
  tooltipSubtext?: string;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  barOpacity?: number;
  barOpacityHover?: number;
  isMobileXs?: boolean;
  dateRange: Date[];
  yTickFormat: (val: number) => string;
  yTooltipFormat: (val: number) => string;
  xTickTimeUnit: TimeUnit;
  maxYFromDefinition: number | null;
}> = ({
  hasMultipleLocations,
  barOpacity,
  barOpacityHover,
  tooltipSubtext,
  ...otherProps
}) => {
  return hasMultipleLocations ? (
    <MultipleLocationsChart {...otherProps} />
  ) : (
    <SingleLocationChart
      barOpacity={barOpacity}
      barOpacityHover={barOpacityHover}
      tooltipSubtext={tooltipSubtext}
      {...otherProps}
    />
  );
};

export default ExploreChart;
