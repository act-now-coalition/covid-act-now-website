import React from 'react';
import { Projections } from 'common/models/Projections';
import {
  ChartRt,
  ChartPositiveTestRate,
  ChartICUCapacityUsed,
  ChartContactTracing,
  ChartCaseDensity,
} from 'components/Charts';
import { Metric } from 'common/metric';

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
      {metric === Metric.CONTACT_TRACING && (
        <ChartContactTracing
          height={height}
          columnData={projection.getDataset('contractTracers')}
        />
      )}
    </>
  );
}
