import React, { useState, useEffect } from 'react';
import some from 'lodash/some';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { ParentSize } from '@vx/responsive';
import { ExploreMetric, Series } from 'components/Explore/interfaces';
import {
  getMetricName,
  Period,
  getMetricDataMeasure,
  getDateRange,
  getYFormat,
  getYAxisDecimalPlaces,
  getXTickTimeUnitForPeriod,
  getMaxYFromDefinition,
  getAllSeriesForMetric,
} from 'components/Explore/utils';
import { NewChartContainer } from 'components/Charts/Charts.style';
import SingleLocationChart from 'components/Explore/SingleLocationChart';
import { Projections } from 'common/models/Projections';
import { EmptyPanel } from 'components/Charts/Charts.style';
import { ScreenshotReady } from 'components/Screenshot';
import { useChartHeightForBreakpoint } from 'common/hooks';

export function getNoDataCopy(metricName: string, locationNames: string) {
  return (
    <p>
      We don't have {metricName} data for {locationNames}.
    </p>
  );
}

const SingleLocationChartContainer: React.FunctionComponent<{
  projections: Projections;
  metric: ExploreMetric;
}> = React.memo(({ projections, metric }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const currentMetricName = getMetricName(metric);

  const dataMeasure = getMetricDataMeasure(metric);
  const yAxisDecimalPlaces = getYAxisDecimalPlaces(metric);
  const yTickFormat = getYFormat(dataMeasure, yAxisDecimalPlaces);
  const yTooltipFormat = getYFormat(dataMeasure, 1);

  const [chartSeries, setChartSeries] = useState<Series[]>([]);

  const dateRange = getDateRange(Period.ALL);

  const hasData = some(chartSeries, ({ data }) => data.length > 0);

  const maxYFromDefinition = getMaxYFromDefinition(metric);

  const chartHeight = useChartHeightForBreakpoint();

  useEffect(() => {
    if (projections) {
      const series = getAllSeriesForMetric(metric, projections.primary);
      setChartSeries(series);
    }
  }, [metric, projections]);

  return (
    <div>
      {hasData && (
        <NewChartContainer>
          {/**
           * The width is set to zero while the parent div is rendering, the
           * placeholder div below prevents the page from jumping.
           */}
          <ParentSize>
            {({ width }) =>
              width > 0 ? (
                <SingleLocationChart
                  seriesList={chartSeries}
                  isMobile={isMobile}
                  width={width}
                  height={chartHeight}
                  tooltipSubtext={`in ${projections.region.shortName}`}
                  marginRight={0}
                  dateRange={dateRange}
                  yTickFormat={yTickFormat}
                  yTooltipFormat={yTooltipFormat}
                  xTickTimeUnit={getXTickTimeUnitForPeriod(Period.ALL)}
                  maxYFromDefinition={maxYFromDefinition}
                />
              ) : (
                <div style={{ height: chartHeight }} />
              )
            }
          </ParentSize>
        </NewChartContainer>
      )}
      {!hasData && (
        <EmptyPanel $height={chartHeight}>
          {getNoDataCopy(currentMetricName, projections.region.shortName)}
          <ScreenshotReady />
        </EmptyPanel>
      )}
    </div>
  );
});

export default SingleLocationChartContainer;
