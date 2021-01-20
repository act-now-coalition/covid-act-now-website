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
import { Metric } from 'common/metric';
import { SeriesType, Series } from 'components/Explore/interfaces';

// TODO(michael): Rename to `Chart` once we get rid of existing (highcharts) Chart component.
// TODO(michael): Update ChartsHolder to use this component instead of the individual chart components.
export default function MetricChart({
  metric,
  height,
  projections,
}: {
  metric: Metric;
  projections: Projections;
  height?: number;
}) {
  if (!projections.hasMetric(metric)) {
    return null;
  }
  const projection = projections.primary;
  return (
    <>
      {metric === Metric.CASE_GROWTH_RATE && (
        <ChartRt
          height={height}
          columnData={projection.getDataset('rtRange')}
        />
      )}
      {metric === Metric.CASE_DENSITY && (
        <ChartCaseDensity
          height={height}
          columnData={projection.getDataset('caseDensityRange')}
        />
      )}
      {metric === Metric.POSITIVE_TESTS && (
        <ChartPositiveTestRate
          height={height}
          columnData={projection.getDataset('testPositiveRate')}
        />
      )}
      {metric === Metric.HOSPITAL_USAGE && (
        <ChartICUCapacityUsed
          height={height}
          columnData={projection.getDataset('icuUtilization')}
        />
      )}
      {metric === Metric.VACCINATIONS && (
        <ChartVaccinations
          height={height}
          seriesList={getVaccinationSeries(projection)}
        />
      )}
    </>
  );
}

function getVaccinationSeries(projection: Projection): Series[] {
  return [
    {
      type: SeriesType.LINE,
      data: filterNull(projection.getDataset('vaccinations')),
      label: 'vaccinationsInitiated',
      shortLabel: 'Initiated',
      tooltipLabel: '1st shot',
      params: {
        stroke: '#bdbdbd',
        fill: '#bdbdbd',
      },
    },
    {
      type: SeriesType.LINE,
      data: filterNull(projection.getDataset('vaccinationsCompleted')),
      label: 'Vaccinations Completed',
      shortLabel: 'Completed',
      tooltipLabel: '2nd shot',
      params: {
        stroke: '#000',
        fill: '#000',
      },
    },
  ];
}

function filterNull(points: Column[]) {
  return points.filter(p => p.y !== null);
}
