import InterventionJSON from '../assets/data/interventions.json';

const LIMITED_ACTION = 'Limited action';
const SOCIAL_DISTANCING = 'Social distancing';
const SHELTER_IN_PLACE = 'Stay at home';
const LOCKDOWN = 'Lockdown';
const SHELTER_IN_PLACE_WORST_CASE = 'Stay at home worst case';

export const INTERVENTIONS = {
  LIMITED_ACTION,
  SOCIAL_DISTANCING,
  SHELTER_IN_PLACE,
  LOCKDOWN,
  SHELTER_IN_PLACE_WORST_CASE,
};

export const INTERVENTION_EFFICACY_ORDER_ASC = [
  LIMITED_ACTION,
  SOCIAL_DISTANCING,
  SHELTER_IN_PLACE,
  LOCKDOWN,
];

export const INTERVENTION_DESCRIPTIONS = {
  [LIMITED_ACTION]:
    'Public advocacy around “social distancing” and enhanced hygiene. Minimal mandated restrictions.',
  [SOCIAL_DISTANCING]:
    'Voluntary “stay at home” directive for high-risk groups, schools and bars / restaurants closed.',
  [SHELTER_IN_PLACE]:
    'Legal order for citizens to employ “stay at home” quarantine except for essential activities, shutdown of non-essential businesses, ban on all group events.',
};

export const INTERVENTION_COLOR_MAP = {
  [LIMITED_ACTION]: 'rgb(255, 51, 72)', // red
  [SOCIAL_DISTANCING]: 'rgb(255, 144, 0)', // orange
  [SHELTER_IN_PLACE]: 'rgb(30, 224, 175)', // green
  [SHELTER_IN_PLACE_WORST_CASE]: 'rgb(18, 146, 116)', // green
  [LOCKDOWN]: 'rgb(223, 31, 210)', // purple
};

export const STATE_TO_INTERVENTION = stateInterventions();

export const INTERVENTION_JSON_MAPPING = {
  limited_action: LIMITED_ACTION,
  social_distancing: SOCIAL_DISTANCING,
  shelter_in_place: SHELTER_IN_PLACE,
};

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
