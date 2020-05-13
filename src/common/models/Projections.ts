import moment from 'moment';
import { Projection } from './Projection';
import { INTERVENTIONS } from '../interventions';
import { STATES } from '..';
import { RegionSummaryWithTimeseriesMap } from 'api';
import { Metric, getLevel } from 'common/metric';
import { Level } from 'common/level';
import { LEVEL_COLOR } from 'common/colors';

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
    county: any,
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

  get primary() {
    return this.projected;
  }

  getLevels(): {
    rt_level: Level;
    hospitalizations_level: Level;
    test_rate_level: Level;
  } {
    const projection = this.primary;
    if (!projection)
      return {
        rt_level: Level.UNKNOWN,
        hospitalizations_level: Level.UNKNOWN,
        test_rate_level: Level.UNKNOWN,
      };

    const rt_level = getLevel(Metric.CASE_GROWTH_RATE, projection.rt);
    const hospitalizations_level = getLevel(
      Metric.HOSPITAL_USAGE,
      projection.currentIcuUtilization,
    );
    const test_rate_level = getLevel(
      Metric.POSITIVE_TESTS,
      projection.currentTestPositiveRate,
    );

    return {
      rt_level,
      hospitalizations_level,
      test_rate_level,
    };
  }

  getAlarmLevel(): Level {
    const {
      rt_level,
      hospitalizations_level,
      test_rate_level,
    } = this.getLevels();

    const levelList = [rt_level, hospitalizations_level, test_rate_level];

    if (levelList.some(level => level === Level.HIGH)) {
      return Level.HIGH;
    } else if (levelList.some(level => level === Level.MEDIUM)) {
      return Level.MEDIUM;
    } else if (levelList.some(level => level === Level.UNKNOWN)) {
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
