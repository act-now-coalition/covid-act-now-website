import { Projection } from './Projection';
import { INTERVENTIONS } from '../interventions';
import { STATES } from '..';
import { RegionSummaryWithTimeseriesMap } from 'api';
import { Metric, getLevel, ALL_VALUE_METRICS } from 'common/metric';
import { Level } from 'common/level';
import { LEVEL_COLOR } from 'common/colors';
import { fail } from 'common/utils';
import { LocationSummary, MetricSummary } from 'common/location_summaries';

/**
 * The model for the complete set of projections and related information
 * (eg. current intervention) for a given location (state or county).
 */
export class Projections {
  stateCode: string;
  stateName: string;
  county: any;
  countyName: string | null;
  baseline: any;
  projected: any;
  isCounty: boolean;

  constructor(
    summaryWithTimeseriesMap: RegionSummaryWithTimeseriesMap,
    stateCode: string,
    county?: any,
  ) {
    this.stateCode = stateCode.toUpperCase();
    this.stateName = (STATES as any)[this.stateCode];
    this.county = null;
    this.countyName = null;
    this.baseline = null;
    this.isCounty = county != null;

    this.populateCounty(county);
    this.populateInterventions(summaryWithTimeseriesMap);
  }

  populateCounty(county: any) {
    if (!county) {
      return;
    }

    this.county = county;
    this.countyName = county.county;

    const NEW_YORK_COUNTIES_BLACKLIST = [
      'Kings County',
      'Queens County',
      'Bronx County',
      'Richmond County',
    ];

    if (
      this.stateCode === 'NY' &&
      NEW_YORK_COUNTIES_BLACKLIST.includes(this.countyName!)
    ) {
      this.countyName = 'New York';
    }
  }

  get fips(): string {
    return this.primary.fips;
  }

  get locationName(): string {
    if (this.isCounty) {
      return `${this.countyName}, ${this.stateCode}`;
    } else {
      return this.stateName;
    }
  }

  get population(): number {
    return this.primary.totalPopulation;
  }

  get primary() {
    return this.projected;
  }

  get summary(): LocationSummary {
    const metrics = {} as { [metric in Metric]: MetricSummary };
    for (const metric of ALL_VALUE_METRICS) {
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

  getMetricValue(metric: Metric): number | null {
    if (!this.primary) {
      return null;
    }
    switch (metric) {
      case Metric.CASE_GROWTH_RATE:
        return this.primary.rt;
      case Metric.HOSPITAL_USAGE:
        return this.primary.currentIcuUtilization;
      case Metric.POSITIVE_TESTS:
        return this.primary.currentTestPositiveRate;
      case Metric.CONTACT_TRACING:
        return this.primary.currentContactTracerMetric;
      default:
        fail('Cannot get value of metric: ' + metric);
    }
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
    contact_tracing_level: Level;
  } {
    return {
      rt_level: this.getMetricLevel(Metric.CASE_GROWTH_RATE),
      hospitalizations_level: this.getMetricLevel(Metric.HOSPITAL_USAGE),
      test_rate_level: this.getMetricLevel(Metric.POSITIVE_TESTS),
      contact_tracing_level: this.getMetricLevel(Metric.CONTACT_TRACING),
    };
  }

  getAlarmLevel(): Level {
    const {
      rt_level,
      hospitalizations_level,
      test_rate_level,
      contact_tracing_level,
    } = this.getLevels();

    const levelList = [rt_level, hospitalizations_level, test_rate_level];

    // contact tracing levels are reversed (i.e low is bad, high is good)
    const reverseList = [contact_tracing_level];

    if (
      levelList.some(level => level === Level.CRITICAL) ||
      reverseList.some(level => level === Level.LOW)
    ) {
      return Level.CRITICAL;
    } else if (
      levelList.some(level => level === Level.HIGH) ||
      reverseList.some(level => level === Level.MEDIUM)
    ) {
      return Level.HIGH;
    } else if (
      levelList.some(level => level === Level.MEDIUM) ||
      reverseList.some(level => level === Level.HIGH)
    ) {
      return Level.MEDIUM;
    } else if (
      levelList.some(level => level === Level.UNKNOWN) ||
      reverseList.some(level => level === Level.UNKNOWN)
    ) {
      return Level.UNKNOWN;
    } else {
      return Level.LOW;
    }
  }

  getAlarmLevelColor() {
    const level = this.getAlarmLevel();
    return LEVEL_COLOR[level];
  }

  populateInterventions(
    summaryWithTimeseriesMap: RegionSummaryWithTimeseriesMap,
  ) {
    for (const intervention in summaryWithTimeseriesMap) {
      const summaryWithTimeseries = summaryWithTimeseriesMap[intervention];
      let projection = null;
      if (summaryWithTimeseries !== null) {
        projection = new Projection(summaryWithTimeseries, {
          intervention: intervention,
          isCounty: this.isCounty,
        });
      }
      if (intervention === INTERVENTIONS.LIMITED_ACTION) {
        this.baseline = projection;
      } else if (intervention === INTERVENTIONS.PROJECTED) {
        this.projected = projection;
      }
    }
  }
}
