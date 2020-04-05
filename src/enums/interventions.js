import InterventionJSON from '../assets/data/interventions.json';
import CalculatedInterventionJSON from '../assets/data/calculated_state_interventions.json';
import CalculatedCountyInterventionJSON from '../assets/data/calculated_county_interventions.json';

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
    'Government encouragement to “socially distance” and improve hygiene. Little or no .',
  [SOCIAL_DISTANCING]:
    'Voluntary “stay at home” guidance, especially for high-risk populations. Schools, bars, and restaurants closed.',
  [SHELTER_IN_PLACE]:
    ' Legal order that shuts down non-essential businesses, bans group events, and requires the public “stay at home” for all but the most basic needs.',
};

export const COLOR_MAP = {
  RED: 'rgb(255, 51, 72)',
  ORANGE: 'rgb(255, 144, 0)',
  GREEN: 'rgb(30, 224, 175)',
  DARK_GREEN: 'rgb(18, 146, 116)',
  PURPLE: 'rgb(223, 31, 210)',
  GREY: '#e3e3e3',
};

export const INTERVENTION_COLOR_MAP = {
  [LIMITED_ACTION]: COLOR_MAP.RED,
  [SOCIAL_DISTANCING]: COLOR_MAP.ORANGE,
  [SHELTER_IN_PLACE]: COLOR_MAP.GREEN,
  [SHELTER_IN_PLACE_WORST_CASE]: COLOR_MAP.DARK_GREEN,
  [LOCKDOWN]: COLOR_MAP.PURPLE,
};

export const STATE_TO_INTERVENTION = stateInterventions();
export const STATE_TO_CALCULATED_INTERVENTION_COLOR = CalculatedInterventionJSON;
export const FIPS_CODE_TO_CALCULATED_INTERVENTION_COLOR = CalculatedCountyInterventionJSON;

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
