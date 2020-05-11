import CalculatedInterventionJSON from '../assets/data/calculated_state_interventions.json';
import CalculatedCountyInterventionJSON from '../assets/data/calculated_county_interventions.json';

const LIMITED_ACTION = 'Limited action';
const PROJECTED = 'Projected based on current trends';

export const INTERVENTIONS = {
  LIMITED_ACTION,
  PROJECTED,
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

export const STATE_TO_CALCULATED_INTERVENTION_COLOR = CalculatedInterventionJSON;
export const FIPS_CODE_TO_CALCULATED_INTERVENTION_COLOR = CalculatedCountyInterventionJSON;
