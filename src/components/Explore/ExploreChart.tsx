import React from 'react';
import { Series } from './interfaces';
import SingleLocationChart from './SingleLocationChart';
import MultipleLocationsChart from './MultipleLocationsChart';

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
