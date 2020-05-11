import moment from 'moment';
import { Projection } from '../models/Projection';
import {
  INTERVENTIONS,
  STATE_TO_INTERVENTION,
  COLOR_MAP,
} from '../enums/interventions';
import { STATES } from '../enums';
import { RegionSummaryWithTimeseriesMap } from 'api';
import { Metric } from 'enums/metrics';
import { getLevel } from 'metrics/utils';
import { Level, LEVEL_COLOR } from 'enums/levels';
/**
 * The model for the complete set of projections and related information
 * (eg. current intervention) for a given location (state or county).
 */
export class Projections {
  stateCode: string;
  stateName: string;
  county: any;
  countyName: string | null;
  stateIntervention: any;
  baseline: any;
  distancing: any;
  distancingPoorEnforcement: any;
  projected: any;
  currentInterventionModel: any;
  supportsInferred: boolean;
  isCounty: boolean;
  interventionModelMap: any;

  constructor(
    summaryWithTimeseriesMap: RegionSummaryWithTimeseriesMap,
    stateCode: string,
    county: any,
  ) {
    this.stateCode = stateCode.toUpperCase();
    this.stateName = (STATES as any)[this.stateCode];
    this.county = null;
    this.countyName = null;
    this.stateIntervention = (STATE_TO_INTERVENTION as any)[this.stateCode];
    this.baseline = null;
    this.distancing = null;
    this.distancingPoorEnforcement = null;
    this.currentInterventionModel = null;
    this.supportsInferred = false;
    this.isCounty = county != null;

    this.populateCounty(county);
    this.populateInterventions(summaryWithTimeseriesMap);
    this.populateCurrentIntervention();
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

  populateCurrentIntervention() {
    this.currentInterventionModel = this.supportsInferred
      ? this.projected
      : this.interventionModelMap[this.stateIntervention];
  }

  get primary() {
    return this.supportsInferred
      ? this.projected
      : this.currentInterventionModel;
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

  getChartSeriesColorMap() {
    return {
      limitedActionSeries: this.getSeriesColorForLimitedAction(),
      socialDistancingSeries: this.getSeriesColorForSocialDistancing(),
      shelterInPlaceSeries: this.getSeriesColorForShelterInPlace(),
      projectedSeries: COLOR_MAP.BLUE,
    };
  }

  getSeriesColorForProjected() {
    return COLOR_MAP.BLUE;
  }

  getSeriesColorForPrimary() {
    // TODO(igor): we shouldn't be hardcoding either of the two values below, but this is
    // all about to simplify a lot and is not a regression, so not going to fix it
    return this.supportsInferred
      ? COLOR_MAP.BLUE
      : this.getSeriesColorForSocialDistancing();
  }

  getSeriesColorForLimitedAction() {
    let seriesColor = COLOR_MAP.RED.BASE;

    const interventionColor = this.getAlarmLevelColor();

    if (interventionColor === COLOR_MAP.RED.BASE) {
      seriesColor = COLOR_MAP.RED.DARK;
    }

    return seriesColor;
  }

  getSeriesColorForSocialDistancing() {
    let seriesColor = COLOR_MAP.ORANGE.BASE;

    switch (this.getAlarmLevelColor()) {
      case COLOR_MAP.RED.BASE:
        seriesColor = COLOR_MAP.RED.BASE;
        break;
      case COLOR_MAP.ORANGE.BASE:
        seriesColor = COLOR_MAP.ORANGE.BASE;
        break;
      case COLOR_MAP.GREEN.BASE:
        seriesColor = COLOR_MAP.GREEN.DARK;
        break;
      default:
    }

    return seriesColor;
  }

  getSeriesColorForShelterInPlace() {
    let seriesColor = COLOR_MAP.GREEN.BASE;

    const isShelterInPlaceOverwheled =
      this.stateIntervention === INTERVENTIONS.SHELTER_IN_PLACE &&
      this.currentInterventionModel.dateOverwhelmed;

    switch (this.getAlarmLevelColor()) {
      case COLOR_MAP.RED.BASE:
        seriesColor = isShelterInPlaceOverwheled
          ? COLOR_MAP.RED.LIGHT
          : COLOR_MAP.GREEN.BASE;
        break;
      case COLOR_MAP.ORANGE.BASE:
        seriesColor = isShelterInPlaceOverwheled
          ? COLOR_MAP.ORANGE.LIGHT
          : COLOR_MAP.GREEN.BASE;
        break;
      case COLOR_MAP.GREEN.BASE:
        seriesColor = isShelterInPlaceOverwheled
          ? COLOR_MAP.ORANGE.LIGHT
          : COLOR_MAP.GREEN.BASE;
        break;
      default:
    }

    return seriesColor;
  }

  // unused but likely to be used again
  isOverwhelmedDateAfterNumberOfWeeks(model: any, weeks: number) {
    if (!model.dateOverwhelmed) {
      return true;
    }

    const futureDate = moment().add(weeks, 'weeks');

    return moment(model.dateOverwhelmed).isSameOrAfter(futureDate);
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
          isInferred: intervention === INTERVENTIONS.PROJECTED,
          isCounty: this.isCounty,
        });
      }
      if (intervention === INTERVENTIONS.LIMITED_ACTION) {
        this.baseline = projection;
      } else if (intervention === INTERVENTIONS.SHELTER_IN_PLACE) {
        this.distancing = { now: projection };
      } else if (intervention === INTERVENTIONS.PROJECTED) {
        this.projected = projection;
        this.supportsInferred = !!this.projected;
      } else if (intervention === INTERVENTIONS.SOCIAL_DISTANCING) {
        this.distancingPoorEnforcement = { now: projection };
      }
    }
    this.interventionModelMap = {
      [INTERVENTIONS.LIMITED_ACTION]: this.baseline,
      [INTERVENTIONS.SOCIAL_DISTANCING]: this.distancingPoorEnforcement.now,
      [INTERVENTIONS.SHELTER_IN_PLACE]: this.distancing.now,
    };
  }
}
