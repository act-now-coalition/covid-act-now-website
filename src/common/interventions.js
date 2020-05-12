import InterventionJSON from '../assets/data/interventions.json';

export const LIMITED_ACTION = 'Limited action';
export const SOCIAL_DISTANCING = 'Social distancing';
export const SHELTER_IN_PLACE = 'Stay at home';
export const PROJECTED = 'Projected based on current trends';
export const SHELTER_IN_PLACE_WORST_CASE = 'Stay at home worst case';

export const INTERVENTIONS = {
  LIMITED_ACTION,
  SOCIAL_DISTANCING,
  SHELTER_IN_PLACE,
  PROJECTED,
  SHELTER_IN_PLACE_WORST_CASE,
};

export const INTERVENTION_EFFICACY_ORDER_ASC = [
  LIMITED_ACTION,
  SOCIAL_DISTANCING,
  PROJECTED,
  SHELTER_IN_PLACE,
];

export const INTERVENTION_DESCRIPTIONS = {
  [LIMITED_ACTION]:
    'Government encouragement to “socially distance” and improve hygiene. Little or no .',
  [SOCIAL_DISTANCING]:
    'Voluntary “stay at home” guidance, especially for high-risk populations. Schools, bars, and restaurants closed.',
  [SHELTER_IN_PLACE]:
    ' Legal order that shuts down non-essential businesses, bans group events, and requires the public “stay at home” for all but the most basic needs.',
};

export const STATE_TO_INTERVENTION = stateInterventions();

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
