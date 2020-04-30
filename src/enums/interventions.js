import InterventionJSON from '../assets/data/interventions.json';
import CalculatedInterventionJSON from '../assets/data/calculated_state_interventions.json';
import CalculatedCountyInterventionJSON from '../assets/data/calculated_county_interventions.json';

const LIMITED_ACTION = 'Limited action';
const SOCIAL_DISTANCING = 'Social distancing';
const SHELTER_IN_PLACE = 'Stay at home';
const PROJECTED = 'Projected based on current trends';
const SHELTER_IN_PLACE_WORST_CASE = 'Stay at home worst case';

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

export const COLOR_MAP = {
  ORANGE: {
    BASE: '#FFAD16',
    LIGHT: '#FFC020',
    DARK: '#933500',
  },
  RED: {
    BASE: '#F03147',
    LIGHT: '#FC818F',
    DARK: '#82000E',
  },
  GREEN: {
    // Chosen to match "official" green from logo, etc.
    BASE: 'rgb(0, 208, 125)',
    // TODO: Remove GREEN.DARK? Per Josh Ziman we want to consolidate all
    // instances of green into one, as long as text readability is maintained.
    DARK: '#0A3D31',
  },
  BLUE: '#3BBCE6',
  GRAY: {
    BASE: '#CCCCCC',
    LIGHT: '#E3E3E3',
    DARK: '#999999',
  },
};

export const INTERVENTION_COLOR_MAP = {
  [LIMITED_ACTION]: COLOR_MAP.RED.BASE,
  [SOCIAL_DISTANCING]: COLOR_MAP.ORANGE.BASE,
  [SHELTER_IN_PLACE]: COLOR_MAP.GREEN.BASE,
  [SHELTER_IN_PLACE_WORST_CASE]: COLOR_MAP.GREEN.DARK,
  [PROJECTED]: COLOR_MAP.BLUE,
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
