import { Annotations, Anomalies } from 'api/schema/RegionSummaryWithTimeseries';
import { Metric } from 'common/metricEnum';

export function getAnomaliesForMetric(
  annotations: Annotations,
  metric: Metric,
): Anomalies | undefined {
  switch (metric) {
    case Metric.CASE_DENSITY:
      return annotations?.caseDensity?.anomalies;
    case Metric.CASE_GROWTH_RATE:
      return annotations?.infectionRate?.anomalies;
    case Metric.POSITIVE_TESTS:
      return annotations?.testPositivityRatio?.anomalies;
    case Metric.HOSPITAL_USAGE:
      return annotations?.icuCapacityRatio?.anomalies;
    case Metric.VACCINATIONS:
      // TODO(michael): Ideally the backend would be more consistent about where it sticks sources.
      const provenance =
        annotations?.vaccinationsInitiated ||
        annotations?.vaccinationsInitiatedRatio ||
        annotations?.vaccinationsCompleted ||
        annotations?.vaccinationsCompletedRatio;
      return provenance?.anomalies;
  }
}
