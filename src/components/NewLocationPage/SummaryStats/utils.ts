import { LocationSummary } from 'common/location_summaries';
import { ALL_METRICS } from 'common/metric';
import { MetricValues } from 'common/models/Projections';

export const summaryToStats = (summary: LocationSummary): MetricValues => {
  const stats = {} as MetricValues;
  for (const metric of ALL_METRICS) {
    stats[metric] = summary.metrics[metric]?.value ?? null;
  }
  return stats;
};
