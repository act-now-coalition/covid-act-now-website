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
  RED: 'rgb(255, 51, 72)',
  ORANGE: 'rgb(255, 144, 0)',
  GREEN: 'rgb(30, 224, 175)',
  DARK_GREEN: 'rgb(18, 146, 116)',
  PURPLE: 'rgb(223, 31, 210)',
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
