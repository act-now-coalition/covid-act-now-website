import React from 'react';
import { Projections } from 'common/models/Projections';
import {
  ChartRt,
  ChartPositiveTestRate,
  ChartICUHeadroom,
  ChartContactTracing,
  ChartFutureHospitalization,
  ChartCaseIncidence,
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
  const projection = projections.primary;
  if (projection === null || !projections.hasMetric(metric)) {
    return null;
  }
  return (
    <>
      {metric === Metric.CASE_GROWTH_RATE && (
        <ChartRt
          height={height}
          columnData={projection.getDataset('rtRange')}
        />
      )}
      {metric === Metric.CASE_DENSITY && (
        <ChartCaseIncidence
          height={height}
          columnData={projection.getDataset('caseDensity')}
        />
      )}
      {metric === Metric.POSITIVE_TESTS && (
        <ChartPositiveTestRate
          height={height}
          columnData={projection.getDataset('testPositiveRate')}
        />
      )}
      {metric === Metric.HOSPITAL_USAGE && (
        <ChartICUHeadroom
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
      {metric === Metric.FUTURE_PROJECTIONS && (
        <ChartFutureHospitalization height={height} projections={projections} />
      )}
    </>
  );
}
