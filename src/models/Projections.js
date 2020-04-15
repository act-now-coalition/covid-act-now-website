import React from 'react';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { Model } from 'models/Model';
import {
  INTERVENTIONS,
  STATE_TO_INTERVENTION,
  COLOR_MAP,
} from 'enums/interventions';
import { STATES } from 'enums';
import { HeaderSubCopy } from '../components/StateHeader/StateHeader.style';
import { useEmbed } from 'utils/hooks';

export class Projections {
  constructor(props, stateCode, county) {
    this.stateCode = stateCode.toUpperCase();
    this.stateName = STATES[this.stateCode];
    this.county = null;
    this.countyName = null;
    this.stateIntervention = STATE_TO_INTERVENTION[this.stateCode];
    this.baseline = null;
    this.distancing = null;
    this.distancingPoorEnforcement = null;
    this.currentInterventionModel = null;
    this.hasProjections = county == null;

    this.populateInterventions(props);
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
    const interventionModelMap = {
      [INTERVENTIONS.LIMITED_ACTION]: this.baseline,
      [INTERVENTIONS.SOCIAL_DISTANCING]: this.distancingPoorEnforcement.now,
      [INTERVENTIONS.SHELTER_IN_PLACE]: this.distancing.now,
    };

    this.currentInterventionModel = this.hasProjections
      ? this.projected
      : interventionModelMap[this.stateIntervention];

    this.worstCaseInterventionModel =
      this.stateIntervention === INTERVENTIONS.SHELTER_IN_PLACE
        ? interventionModelMap[INTERVENTIONS.SOCIAL_DISTANCING]
        : interventionModelMap[this.stateIntervention];
  }

  getInterventionTitle() {
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

    if (this.getThresholdInterventionLevel() === COLOR_MAP.ORANGE.BASE) {
      title = <span>Keep staying at home in {displayName}</span>;
    }

    if (this.getThresholdInterventionLevel() === COLOR_MAP.RED.BASE) {
      title = <span>More aggressive action needed in {displayName}</span>;
    }

    return title;
  }

  getInterventionPrediction() {
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
      'Things look good, keep it up! Assuming stay-at-home interventions remain in place, hospitals are not projected to become overloaded. Check back — projections update every 24 hours with the most recent data.';

    if (this.getThresholdInterventionLevel() === COLOR_MAP.ORANGE.BASE) {
      predictionText =
        'Things look okay. Assuming stay-at-home interventions remain in place, projections show low-to-moderate probability of hospital overload in the next two months. Check back — projections update every 24 hours with the most recent data.';
    }

    if (this.getThresholdInterventionLevel() === COLOR_MAP.RED.BASE) {
      predictionText =
        'Be careful. Even with stay-at-home interventions in place, our projections show risk of hospital overload in your area. More action is needed to help flatten the curve. Check back — projections update every 24 hours with the most recent data.';
    }

    return <HeaderSubCopy>{predictionText}</HeaderSubCopy>;
  }

  getThresholdInterventionLevel() {
    switch (this.stateIntervention) {
      case INTERVENTIONS.LIMITED_ACTION:
        return this.getThresholdInterventionLevelForLimitedAction();
      case INTERVENTIONS.SOCIAL_DISTANCING:
        return this.getThresholdInterventionLevelForSocialDistancing();
      case INTERVENTIONS.SHELTER_IN_PLACE:
        return this.getThresholdInterventionLevelForStayAtHome();
      default:
    }
  }

  getThresholdInterventionLevelForStayAtHome() {
    let color = COLOR_MAP.GREEN.BASE;

    if (
      this.hasProjections
        ? this.isProjectedOverwhelmedDateWithinThresholdWeeks()
        : this.isSocialDistancingOverwhelmedDateWithinThresholdWeeks()
    ) {
      color = COLOR_MAP.ORANGE.BASE;
    }

    if (
      this.hasProjections
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

    const thresholdInterventionLevel = this.getThresholdInterventionLevel();

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
      projectedSeries: COLOR_MAP.PURPLE,
    };
  }

  getSeriesColorForProjected() {
    return COLOR_MAP.PURPLE;
  }

  getSeriesColorForLimitedAction() {
    let seriesColor = COLOR_MAP.RED.BASE;

    const interventionColor = this.getThresholdInterventionLevel();

    if (interventionColor === COLOR_MAP.RED.BASE) {
      seriesColor = COLOR_MAP.RED.DARK;
    }

    return seriesColor;
  }

  getSeriesColorForSocialDistancing() {
    let seriesColor = COLOR_MAP.ORANGE.BASE;

    switch (this.getThresholdInterventionLevel()) {
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

    switch (this.getThresholdInterventionLevel()) {
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

  getThresholdInterventionLevelForSocialDistancing() {
    let color = COLOR_MAP.GREEN.BASE;

    if (this.isSocialDistancingOverwhelmedDateWithinThresholdWeeks()) {
      color = COLOR_MAP.ORANGE.BASE;
    }

    if (this.isSocialDistancingOverwhelmedDateWithinOneWeek()) {
      color = COLOR_MAP.RED.BASE;
    }

    return color;
  }

  getThresholdInterventionLevelForLimitedAction() {
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

  populateInterventions(props) {
    this.baseline = new Model(props[0], {
      intervention: INTERVENTIONS.LIMITED_ACTION,
      r0: 2.4,
    });

    this.distancing = {
      now: new Model(props[1], {
        intervention: INTERVENTIONS.SHELTER_IN_PLACE,
        durationDays: 90,
        r0: 1.2,
      }),
    };

    this.projected = new Model(props[2], {
      intervention: INTERVENTIONS.PROJECTED,
      r0: 'inferred',
    });

    this.distancingPoorEnforcement = {
      now: new Model(props[3], {
        intervention: INTERVENTIONS.SOCIAL_DISTANCING,
        durationDays: 90,
        r0: 1.7,
      }),
    };
  }
}
