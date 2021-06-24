import React from 'react';
import { Projections } from 'common/models/Projections';
import { Projection, Column } from 'common/models/Projection';
import {
  ChartRt,
  ChartPositiveTestRate,
  ChartICUCapacityUsed,
  ChartVaccinations,
  ChartCaseDensity,
} from 'components/Charts';
import { Metric } from 'common/metricEnum';
import { SeriesType, Series } from 'components/Explore/interfaces';
import { VACCINATIONS_COLOR_MAP } from 'common/colors';
import { EmptyPanel } from 'components/Charts/Charts.style';
import { getMetricStatusText } from 'common/metric';
import { ScreenshotReady } from 'components/Screenshot';
import { useChartHeightForBreakpoint } from 'common/hooks';

// TODO(michael): Rename to `Chart` once we get rid of existing (highcharts) Chart component.
// TODO(michael): Update ChartsHolder to use this component instead of the individual chart components.

const MetricChart = React.memo(
  ({
    metric,
    height,
    projections,
  }: {
    metric: Metric;
    projections: Projections;
    height?: number;
  }) => {
    const chartHeight = useChartHeightForBreakpoint();
    if (!projections.hasMetric(metric)) {
      return (
        <EmptyPanel $height={chartHeight}>
          <p>{getMetricStatusText(metric, projections)}</p>
          <ScreenshotReady />
        </EmptyPanel>
      );
    }
    const projection = projections.primary;
    return (
      <>
        {metric === Metric.CASE_GROWTH_RATE && (
          <ChartRt
            height={chartHeight}
            columnData={projection.getDataset('rtRange')}
          />
        )}
        {metric === Metric.CASE_DENSITY && (
          <ChartCaseDensity
            height={chartHeight}
            columnData={projection.getDataset('caseDensityRange')}
          />
        )}
        {metric === Metric.POSITIVE_TESTS && (
          <ChartPositiveTestRate
            height={chartHeight}
            columnData={projection.getDataset('testPositiveRate')}
          />
        )}
        {metric === Metric.HOSPITAL_USAGE && (
          <ChartICUCapacityUsed
            height={chartHeight}
            columnData={projection.getDataset('icuUtilization')}
          />
        )}
        {metric === Metric.VACCINATIONS && (
          <ChartVaccinations
            height={chartHeight}
            seriesList={getVaccinationSeries(projection)}
          />
        )}
      </>
    );
  },
);

export default MetricChart;

function getVaccinationSeries(projection: Projection): Series[] {
  return [
    {
      type: SeriesType.LINE,
      data: filterNull(projection.getDataset('vaccinations')),
      label: 'vaccinationsInitiated',
      shortLabel: '1+ dose',
      tooltipLabel: '1+ dose',
      params: {
        stroke: VACCINATIONS_COLOR_MAP.INITIATED,
        fill: VACCINATIONS_COLOR_MAP.INITIATED,
      },
    },
    {
      type: SeriesType.LINE,
      data: filterNull(projection.getDataset('vaccinationsCompleted')),
      label: 'Vaccinations Completed',
      shortLabel: 'Fully vaccinated',
      tooltipLabel: 'Fully vaccinated',
      params: {
        stroke: VACCINATIONS_COLOR_MAP.COMPLETED,
        fill: VACCINATIONS_COLOR_MAP.COMPLETED,
      },
    },
  ].filter(series => series.data.length > 0);
}

function filterNull(points: Column[]) {
  return points.filter(p => p.y !== null);
}
