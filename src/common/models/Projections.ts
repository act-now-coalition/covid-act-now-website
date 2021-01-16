import { Projection } from './Projection';
import { Metric, getLevel, ALL_METRICS } from 'common/metric';
import { Level } from 'common/level';
import { LEVEL_COLOR } from 'common/colors';
import { fail } from 'common/utils';
import { LocationSummary, MetricSummary } from 'common/location_summaries';
import { RegionSummaryWithTimeseries } from 'api/schema/RegionSummaryWithTimeseries';
import { County, Region } from 'common/regions';

/**
 * The complete set of data / metrics and related information for a given
 * location (state or county).
 *
 * TODO(michael): Rename / restructure this and the Projection class now that
 * we're not focused on projections and there's only 1.
 */
export class Projections {
  primary: Projection;
  isCounty: boolean;
  region: Region;

  constructor(
    summaryWithTimeseries: RegionSummaryWithTimeseries,
    region: Region,
  ) {
    this.region = region;
    this.isCounty = region instanceof County;
    this.primary = new Projection(summaryWithTimeseries, {
      isCounty: this.isCounty,
    });
  }

  populateCounty(county: any) {
    if (!county) {
      return;
    }
  }

  get fips(): string {
    return this.primary.fips;
  }

  get locationName(): string {
    return this.region.fullName;
  }

  get population(): number {
    return this.primary.totalPopulation;
  }

  get summary(): LocationSummary {
    const metrics = {} as { [metric in Metric]: MetricSummary };
    for (const metric of ALL_METRICS) {
      metrics[metric] = {
        value: this.getMetricValue(metric),
        level: this.getMetricLevel(metric),
      };
    }

    return {
      level: this.getAlarmLevel(),
      metrics,
    };
  }

  hasMetric(metric: Metric): boolean {
    return this.getMetricValue(metric) !== null;
  }

  getMetricValue(metric: Metric): number | null {
    switch (metric) {
      case Metric.CASE_GROWTH_RATE:
        return this.primary.rt;
      case Metric.HOSPITAL_USAGE:
        return this.primary.icuCapacityInfo
          ? this.primary.icuCapacityInfo.metricValue
          : null;
      case Metric.POSITIVE_TESTS:
        return this.primary.currentTestPositiveRate;
      case Metric.VACCINATIONS:
        return this.primary.vaccinationsInfo
          ? this.primary.vaccinationsInfo.percentVaccinated
          : null;
      case Metric.CASE_DENSITY:
        return this.primary.currentCaseDensity;
      default:
        fail('Cannot get value of metric: ' + metric);
    }
  }

  getMetricValues(): { [metric in Metric]: number | null } {
    const result = {} as { [metric in Metric]: number | null };
    for (const metric of ALL_METRICS) {
      result[metric] = this.getMetricValue(metric);
    }
    return result;
  }

  getMetricLevel(metric: Metric): Level {
    return getLevel(metric, this.getMetricValue(metric));
  }

  // TODO(michael): Rework this to return a { [metric in Metric]: Level } map
  // instead of using the custom "rt_level", etc. keys.
  getLevels(): {
    rt_level: Level;
    hospitalizations_level: Level;
    test_rate_level: Level;
    vaccinations_level: Level;
    case_density: Level;
  } {
    return {
      rt_level: this.getMetricLevel(Metric.CASE_GROWTH_RATE),
      hospitalizations_level: this.getMetricLevel(Metric.HOSPITAL_USAGE),
      test_rate_level: this.getMetricLevel(Metric.POSITIVE_TESTS),
      vaccinations_level: this.getMetricLevel(Metric.VACCINATIONS),
      case_density: this.getMetricLevel(Metric.CASE_DENSITY),
    };
  }

  getAlarmLevel(): Level {
    const { rt_level, test_rate_level, case_density } = this.getLevels();
    const metricLevels = [rt_level, test_rate_level, case_density];

    // If case_density is low or unknown, it overrides other metrics. Else we
    // use the highest metric level.
    if (case_density === Level.LOW || case_density === Level.UNKNOWN) {
      return case_density;
    }

    for (const level of [
      Level.SUPER_CRITICAL,
      Level.CRITICAL,
      Level.HIGH,
      Level.MEDIUM,
    ]) {
      if (metricLevels.includes(level)) {
        return level;
      }
    }

    fail(
      `Failed to determine risk level for ${this.locationName} (fips=${this.fips}).`,
    );
  }

  getAlarmLevelColor() {
    const level = this.getAlarmLevel();
    return LEVEL_COLOR[level];
  }
}
