import React from 'react';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { Projection } from 'models/Projection';
import {
  INTERVENTIONS,
  STATE_TO_INTERVENTION,
  COLOR_MAP,
} from 'enums/interventions';
import { STATES } from 'enums';
import { HeaderSubCopy } from '../components/LocationPageHeader/LocationPageHeader.style';
import { useEmbed } from 'utils/hooks';

export class Projections {
  constructor(interventionInfos, stateCode, county) {
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


    this.populateInterventions(interventionInfos);
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

  getHeading() {
    const { isEmbed } = useEmbed();

    const displayName = this.countyName ? (
      <>
        {this.countyName},{' '}
        <a
          href={`${isEmbed ? '/embed' : ''}/us/${this.stateCode.toLowerCase()}`}
        >
          {this.stateName}
        </a>
      </>
    ) : (
      <span>{this.stateName}</span>
    );

    const defaultActNowTitle = <span>You must act now in {displayName}</span>;

    switch (this.stateIntervention) {
      case INTERVENTIONS.LIMITED_ACTION:
      case INTERVENTIONS.SOCIAL_DISTANCING:
        return defaultActNowTitle;
      case INTERVENTIONS.SHELTER_IN_PLACE:
        return this.getInterventionTitleForShelterInPlace(displayName);
      default:
    }
  }

  getInterventionTitleForShelterInPlace(displayName) {
    let title = <span>Keep staying at home in {displayName}</span>;

    if (this.getAlarmLevelColor() === COLOR_MAP.ORANGE.BASE) {
      title = <span>Keep staying at home in {displayName}</span>;
    }

    if (this.getAlarmLevelColor() === COLOR_MAP.RED.BASE) {
      title = <span>More aggressive action needed in {displayName}</span>;
    }

    return title;
  }

  getSummary() {
    switch (this.stateIntervention) {
      case INTERVENTIONS.LIMITED_ACTION:
      case INTERVENTIONS.SOCIAL_DISTANCING:
        return this.getInterventionPredictionForLimitedActionAndSocialDistancing();
      case INTERVENTIONS.SHELTER_IN_PLACE:
        return this.getInterventionPredictionForShelterInPlace();
      default:
    }
  }

  getInterventionPredictionForLimitedActionAndSocialDistancing() {
    const earlyDate = moment(
      this.currentInterventionModel.dateOverwhelmed,
    ).subtract(14, 'days');

    const lateDate = moment(
      this.currentInterventionModel.dateOverwhelmed,
    ).subtract(9, 'days');

    let predictionText = (
      <span>
        Avoiding hospital overload depends on aggressive government
        interventions and the public taking COVID seriously. Projections will
        update as more data becomes available.
      </span>
    );

    if (this.currentInterventionModel.dateOverwhelmed) {
      predictionText = (
        <span>
          To prevent hospital overload, our projections indicate a Stay at Home
          order must be implemented between{' '}
          <strong>{earlyDate.format('MMMM Do')}</strong> and{' '}
          <strong>{lateDate.format('MMMM Do')}</strong> at the latest. The
          sooner you act, the more lives you save.
        </span>
      );

      if (earlyDate.isBefore(moment())) {
        predictionText = (
          <span>
            To prevent hospital overload, our projections indicate a Stay at
            Home order must be implemented immediately. The sooner you act, the
            more lives you save.
          </span>
        );
      }
    }

    return <HeaderSubCopy>{predictionText}</HeaderSubCopy>;
  }

  getInterventionPredictionForShelterInPlace() {
    let predictionText =
      'Things look good, keep it up! Assuming stay-at-home interventions remain in place, hospitals are not projected to become overloaded. Check back — projections update every 3 days with the most recent data.';

    if (this.getAlarmLevelColor() === COLOR_MAP.ORANGE.BASE) {
      predictionText =
        'Things look okay. Assuming stay-at-home interventions remain in place, projections show low-to-moderate probability of hospital overload in the next two months. Check back — projections update every 3 days with the most recent data.';
    }

    if (this.getAlarmLevelColor() === COLOR_MAP.RED.BASE) {
      predictionText =
        'Be careful. Even with stay-at-home interventions in place, our projections show risk of hospital overload in your area. More action is needed to help flatten the curve. Check back — projections update every 3 days with the most recent data.';
    }

    return <HeaderSubCopy>{predictionText}</HeaderSubCopy>;
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

  getChartHospitalsOverloadedText() {
    let text = '';
    const isDateOverWhelmedBeforeToday =
      this.worstCaseInterventionModel.dateOverwhelmed &&
      moment(this.worstCaseInterventionModel.dateOverwhelmed).isBefore(
        moment().startOf('day'),
      );

    if (isDateOverWhelmedBeforeToday) {
      return text;
    }

    const thresholdInterventionLevel = this.getAlarmLevelColor();

    switch (thresholdInterventionLevel) {
      case COLOR_MAP.RED.BASE:
        text = 'in 3 weeks or less';
        break;
      case COLOR_MAP.ORANGE.BASE:
        text = 'in 3 to 6 weeks';
        break;
      case COLOR_MAP.GREEN.BASE:
        text = this.distancingPoorEnforcement.now.dateOverwhelmed
          ? 'in 6 weeks or more'
          : '';
        break;
      default:
    }

    const appendedPolicy =
      this.stateIntervention === INTERVENTIONS.SHELTER_IN_PLACE
        ? `<br/> with ${this.stateIntervention} (lax)`
        : `<br/> with ${this.stateIntervention}`;

    if (!isEmpty(text)) {
      text += appendedPolicy;
    }

    return text;
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
    return this.supportsInferred ? COLOR_MAP.BLUE : this.getSeriesColorForSocialDistancing();
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

  populateInterventions(interventionInfos) {
    interventionInfos.forEach(pi => {
      let projection = null;
      if (pi.data) {
        projection = new Projection(pi.data, {
          intervention: pi.intervention,
          durationDays: 90,
          isInferred: pi.intervention == INTERVENTIONS.PROJECTED
        });
      }

      if (pi.intervention === INTERVENTIONS.LIMITED_ACTION) {
        this.baseline = projection;
      } else if (pi.intervention === INTERVENTIONS.SHELTER_IN_PLACE) {
        this.distancing = {now: projection};
      } else if (pi.intervention === INTERVENTIONS.PROJECTED) {
        this.projected = projection;
      } else if (pi.intervention === INTERVENTIONS.SOCIAL_DISTANCING) {
        this.distancingPoorEnforcement = {now: projection};
      }
    });

    this.interventionModelMap = {
      [INTERVENTIONS.LIMITED_ACTION]: this.baseline,
      [INTERVENTIONS.SOCIAL_DISTANCING]: this.distancingPoorEnforcement.now,
      [INTERVENTIONS.SHELTER_IN_PLACE]: this.distancing.now,
    };

  }

}
