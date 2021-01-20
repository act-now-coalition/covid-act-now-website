import React from 'react';
import { Projections } from 'common/models/Projections';
import { Projection } from 'common/models/Projection';
import {
  ChartRt,
  ChartPositiveTestRate,
  ChartICUCapacityUsed,
  ChartVaccinations,
  ChartCaseDensity,
} from 'components/Charts';
import { Metric } from 'common/metric';
import { SeriesType, Series } from 'components/Explore/interfaces';
import { COLOR_MAP } from 'common/colors';

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
      data: projection.getDataset('vaccinationsInitiated'),
      label: 'vaccinationsInitiated',
      shortLabel: 'Initiated',
      tooltipLabel: 'Vaccinations initiated:',
      params: {
        stroke: COLOR_MAP.GREEN.BASE,
        fill: '#fff',
      },
    },
    {
      type: SeriesType.LINE,
      data: projection.getDataset('vaccinations'),
      label: 'Vaccinations Completed',
      shortLabel: 'Completed',
      tooltipLabel: 'Vaccinations completed:',
      params: {
        stroke: COLOR_MAP.GREEN.DARK,
        fill: '#fff',
      },
    },
  ];
}
