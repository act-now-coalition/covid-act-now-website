const moment = require('moment');

const Model = require('./model');
const {
  INTERVENTIONS,
  STATE_TO_INTERVENTION,
  COLOR_MAP,
} = require('./../enums/interventions');
const { US_STATES } = require('./../enums');

class Projections {
  constructor(props, stateCode, county) {
    this.stateCode = stateCode.toUpperCase();
    this.stateName = US_STATES[this.stateCode];
    this.county = null;
    this.countyName = null;
    this.stateIntervention = STATE_TO_INTERVENTION[this.stateCode];
    this.baseline = null;
    this.distancing = null;
    this.distancingPoorEnforcement = null;
    this.contain = null;
    this.currentInterventionModel = null;

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

    this.currentInterventionModel =
      interventionModelMap[this.stateIntervention];
  }

  getInterventionColor() {
    switch (this.stateIntervention) {
      case INTERVENTIONS.LIMITED_ACTION:
        return this.getInterventionColorForLimitedAction();
      case INTERVENTIONS.SHELTER_IN_PLACE:
        return this.getInterventionColorForStayAtHome();
      case INTERVENTIONS.SOCIAL_DISTANCING:
        return this.getInterventionColorForSocialDistancing();
    }
  }

  getInterventionColorForStayAtHome() {
    let color = COLOR_MAP.GREEN;

    if (this.isSocialDistancingOverwhelmedDateWithinThresholdWeeks()) {
      color = COLOR_MAP.ORANGE;
    }

    if (this.isSocialDistancingOverwhelmedDateWithinOneWeek()) {
      color = COLOR_MAP.RED;
    }

    return color;
  }

  getInterventionColorForSocialDistancing() {
    let color = COLOR_MAP.ORANGE;

    if (
      this.isSocialDistancingOverwhelmedDateWithinThresholdWeeks() ||
      this.isLimitedActionOverwhelmedDateWithinThresholdWeeks()
    ) {
      color = COLOR_MAP.RED;
    }

    return color;
  }

  getInterventionColorForLimitedAction() {
    return COLOR_MAP.RED;
  }

  isLimitedActionOverwhelmedDateWithinThresholdWeeks() {
    return !this.isOverwhelmedDateAfterNumberOfWeeks(this.baseline, 3);
  }

  isSocialDistancingOverwhelmedDateWithinThresholdWeeks() {
    return !this.isOverwhelmedDateAfterNumberOfWeeks(
      this.distancingPoorEnforcement.now,
      6,
    );
  }

  isSocialDistancingOverwhelmedDateWithinOneWeek() {
    return !this.isOverwhelmedDateAfterNumberOfWeeks(
      this.distancingPoorEnforcement.now,
      1,
    );
  }

  isOverwhelmedDateAfterNumberOfWeeks(model, weeks) {
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

    this.distancingPoorEnforcement = {
      now: new Model(props[2], {
        intervention: INTERVENTIONS.SOCIAL_DISTANCING,
        durationDays: 90,
        r0: 1.7,
      }),
    };

    this.contain = {
      now: new Model(props[3], {
        intervention: INTERVENTIONS.LOCKDOWN,
        durationDays: 90,
        r0: 0.3,
      }),
    };
  }
}

module.exports = Projections;
