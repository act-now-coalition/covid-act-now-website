import { Projection } from './Projection';
import { getLevel, ALL_METRICS, roundMetricValue } from 'common/metric';
import { Metric } from 'common/metricEnum';
import { Level } from 'common/level';
import { LEVEL_COLOR } from 'common/colors';
import { LocationSummary, MetricSummary } from 'common/location_summaries';
import { RegionSummaryWithTimeseries } from 'api/schema/RegionSummaryWithTimeseries';
import { County, Region } from 'common/regions';

export type MetricValues = {
  [metric in Metric]: number | null;
};

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
    this.primary = new Projection(
      summaryWithTimeseries,
      {
        isCounty: this.isCounty,
      },
      region,
    );
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

  /**
   * Generates the summary entry for this location to be stored in our summaries.json file.
   *
   * @param ccvi The CCVI score to store in the summary entry.
   */
  summary(ccvi: number): LocationSummary {
    const metrics = {} as { [metric in Metric]: MetricSummary };
    const summaryMetrics = [
      Metric.ADMISSIONS_PER_100K,
      Metric.RATIO_BEDS_WITH_COVID,
      Metric.WEEKLY_CASES_PER_100K,
      Metric.VACCINATIONS,
      Metric.CASE_GROWTH_RATE,
      Metric.POSITIVE_TESTS,
      Metric.CASE_DENSITY,
    ];
    for (const metric of summaryMetrics) {
      const value = this.getMetricValue(metric);
      const roundedValue = roundMetricValue(metric, value);

      metrics[metric] = {
        value: roundedValue,
        level: this.getMetricLevel(metric),
      };
    }

    const vaccinationsCompleted =
      this.primary.vaccinationsInfo?.ratioVaccinated ?? null;
    return {
      level: this.getAlarmLevel(),
      metrics,
      vc: vaccinationsCompleted,
    };
  }

  hasMetric(metric: Metric): boolean {
    // HACK: Show the chart for vaccinations if any of the data is present, not just
    // the bivalent data which is mapped to the "VACCINATIONS" metric.
    if (metric === Metric.VACCINATIONS) {
      return this.primary.vaccinationsInfo !== null;
    }
    return this.getMetricValue(metric) !== null;
  }

  getMetricValue(metric: Metric): number | null {
    return this.primary.getMetricValue(metric);
  }

  getMetricValues(): MetricValues {
    const result = {} as MetricValues;
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
    return this.primary.canCommunityLevel;
  }

  getAlarmLevelColor() {
    const level = this.getAlarmLevel();
    return LEVEL_COLOR[level];
  }
}
