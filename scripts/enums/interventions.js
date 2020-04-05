const InterventionJSON = require('./../../src/assets/data/interventions.json');

const LIMITED_ACTION = 'Limited action';
const SOCIAL_DISTANCING = 'Social distancing';
const SHELTER_IN_PLACE = 'Stay at home';
const LOCKDOWN = 'Lockdown';

const INTERVENTIONS = {
  LIMITED_ACTION,
  SOCIAL_DISTANCING,
  SHELTER_IN_PLACE,
  LOCKDOWN,
};

const COLOR_MAP = {
  ORANGE: {
    BASE: '#F88722',
    LIGHT: '#FFC020',
    DARK: '#933500',
  },
  RED: {
    BASE: '#F03147',
    LIGHT: '#FC818F',
    DARK: '#82000E',
  },
  GREEN: {
    BASE: '#4BE6BF',
    LIGHT: '#D0FFF4',
    DARK: '#0A3D31',
  },
};

const STATE_TO_INTERVENTION = stateInterventions();

function stateInterventions() {
  const INTERVENTION_JSON_MAPPING = {
    limited_action: LIMITED_ACTION,
    social_distancing: SOCIAL_DISTANCING,
    shelter_in_place: SHELTER_IN_PLACE,
  };

  const interventions = {};
  for (const state in InterventionJSON) {
    interventions[state] = INTERVENTION_JSON_MAPPING[InterventionJSON[state]];
  }
  return interventions;
}

module.exports = {
  INTERVENTIONS,
  COLOR_MAP,
  STATE_TO_INTERVENTION,
};
