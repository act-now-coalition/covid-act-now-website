import { Level } from 'common/level';
import type { LocationSummary } from 'common/location_summaries';
import type { MetricValues } from 'common/models/Projections';
import { ALL_METRICS } from 'common/metric';

/**
 * Depending on provided `level`, returns the appropriate text (`lowText`,
 * `mediumText`, etc.)
 */
export function levelText(
  level: Level,
  lowText: string,
  mediumText: string,
  mediumHighText: string,
  highText: string,
  superCriticalText?: string,
) {
  switch (level) {
    case Level.LOW:
      return lowText;
    case Level.MEDIUM:
      return mediumText;
    case Level.HIGH:
      return mediumHighText;
    case Level.CRITICAL:
      return highText;
    case Level.SUPER_CRITICAL:
      return superCriticalText || highText;
  }
}

export const summaryToStats = (summary: LocationSummary): MetricValues => {
  const stats = {} as MetricValues;
  for (const metric of ALL_METRICS) {
    stats[metric] = summary.metrics[metric]?.value ?? null;
  }
  return stats;
};
