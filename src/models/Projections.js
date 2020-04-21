import moment from 'moment';
import { Projection } from '../models/Projection';
import {
  INTERVENTIONS,
  STATE_TO_INTERVENTION,
  COLOR_MAP,
} from '../enums/interventions';
import { STATES } from '../enums';

/**
 * The model for the complete set of projections and related information
 * (eg. current intervention) for a given location (state or county).
 */
export class Projections {
  constructor(projectionInfos, stateCode, county) {
    this.stateCode = stateCode.toUpperCase();
    this.stateName = STATES[this.stateCode];
    this.county = null;
    this.countyName = null;
    this.stateIntervention = STATE_TO_INTERVENTION[this.stateCode];
    this.baseline = null;
    this.distancing = null;
    this.distancingPoorEnforcement = null;
    this.currentInterventionModel = null;
    this.supportsInferred = county == null;

    this.populateInterventions(projectionInfos);
    this.populateCurrentIntervention();
    this.populateCounty(county);
  }

  populateCounty(county) {
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
      NEW_YORK_COUNTIES_BLACKLIST.includes(this.countyName)
    ) {
      this.countyName = 'New York';
    }
  }

  populateCurrentIntervention() {
    this.currentInterventionModel = this.supportsInferred
      ? this.projected
      : this.interventionModelMap[this.stateIntervention];

    this.worstCaseInterventionModel =
      this.stateIntervention === INTERVENTIONS.SHELTER_IN_PLACE
        ? this.interventionModelMap[INTERVENTIONS.SOCIAL_DISTANCING]
        : this.interventionModelMap[this.stateIntervention];
  }

  get primary() {
    return this.supportsInferred
      ? this.projected
      : this.worstCaseInterventionModel;
  }

  getAlarmLevelColor() {
    switch (this.stateIntervention) {
      case INTERVENTIONS.LIMITED_ACTION:
        return this.getAlarmLevelColorForLimitedAction();
      case INTERVENTIONS.SOCIAL_DISTANCING:
        return this.getAlarmLevelColorForSocialDistancing();
      case INTERVENTIONS.SHELTER_IN_PLACE:
        return this.getAlarmLevelColorForStayAtHome();
      default:
    }
  }

  getAlarmLevelColorForStayAtHome() {
    let color = COLOR_MAP.GREEN.BASE;

    if (
      this.supportsInferred
        ? this.isProjectedOverwhelmedDateWithinThresholdWeeks()
        : this.isSocialDistancingOverwhelmedDateWithinThresholdWeeks()
    ) {
      color = COLOR_MAP.ORANGE.BASE;
    }

    if (
      this.supportsInferred
        ? this.isProjectedOverwhelmedDateWithinOneweek()
        : this.isSocialDistancingOverwhelmedDateWithinOneWeek()
    ) {
      color = COLOR_MAP.RED.BASE;
    }

    return color;
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

  getAlarmLevelColorForSocialDistancing() {
    let color = COLOR_MAP.GREEN.BASE;

    if (this.isSocialDistancingOverwhelmedDateWithinThresholdWeeks()) {
      color = COLOR_MAP.ORANGE.BASE;
    }

    if (this.isSocialDistancingOverwhelmedDateWithinOneWeek()) {
      color = COLOR_MAP.RED.BASE;
    }

    return color;
  }

  getAlarmLevelColorForLimitedAction() {
    return COLOR_MAP.RED.BASE;
  }

  isSocialDistancingOverwhelmedDateWithinThresholdWeeks() {
    return !this.isOverwhelmedDateAfterNumberOfWeeks(
      this.distancingPoorEnforcement.now,
      6,
    );
  }

  isProjectedOverwhelmedDateWithinThresholdWeeks() {
    return !this.isOverwhelmedDateAfterNumberOfWeeks(this.projected, 6);
  }

  isProjectedOverwhelmedDateWithinOneweek() {
    return !this.isOverwhelmedDateAfterNumberOfWeeks(this.projected, 3);
  }

  isSocialDistancingOverwhelmedDateWithinOneWeek() {
    return !this.isOverwhelmedDateAfterNumberOfWeeks(
      this.distancingPoorEnforcement.now,
      3,
    );
  }

  isOverwhelmedDateAfterNumberOfWeeks(model, weeks) {
    if (!model.dateOverwhelmed) {
      return true;
    }

    const futureDate = moment().add(weeks, 'weeks');

    return moment(model.dateOverwhelmed).isSameOrAfter(futureDate);
  }

  populateInterventions(projectionInfos) {
    projectionInfos.forEach(pi => {
      let projection = null;
      if (pi.data) {
        projection = new Projection(pi.data, {
          intervention: pi.intervention,
          isInferred: pi.intervention === INTERVENTIONS.PROJECTED,
        });
      }

      if (pi.intervention === INTERVENTIONS.LIMITED_ACTION) {
        this.baseline = projection;
      } else if (pi.intervention === INTERVENTIONS.SHELTER_IN_PLACE) {
        this.distancing = { now: projection };
      } else if (pi.intervention === INTERVENTIONS.PROJECTED) {
        this.projected = projection;
      } else if (pi.intervention === INTERVENTIONS.SOCIAL_DISTANCING) {
        this.distancingPoorEnforcement = { now: projection };
      }
    });

    this.interventionModelMap = {
      [INTERVENTIONS.LIMITED_ACTION]: this.baseline,
      [INTERVENTIONS.SOCIAL_DISTANCING]: this.distancingPoorEnforcement.now,
      [INTERVENTIONS.SHELTER_IN_PLACE]: this.distancing.now,
    };
  }
}
