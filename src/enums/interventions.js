const NO_ACTION = 'No Action';
const SOCIAL_DISTANCING = 'Delay/Distancing';
const SHELTER_IN_PLACE = '"Shelter in place"';
const LOCKDOWN = 'Lockdown';

export const INTERVENTIONS = {
  NO_ACTION,
  SOCIAL_DISTANCING,
  SHELTER_IN_PLACE,
  LOCKDOWN,
};

export const INTERVENTION_EFFICACY_ORDER_ASC = [
  NO_ACTION,
  SOCIAL_DISTANCING,
  SHELTER_IN_PLACE,
  LOCKDOWN,
];

export const INTERVENTION_DESCRIPTIONS = {
  [NO_ACTION]: 'Current historical trends continue.',
  [SOCIAL_DISTANCING]:
    'Voluntary “shelter-in-place” for high-risk groups, ban on events over 50 people, public advocacy around “social distancing” and enhanced hygiene, possible school closures, restricted travel, and passive monitoring. Roll-out of population-wide testing and quarantine, so that quarantines can be relaxed for those who are not infected.',
  [SHELTER_IN_PLACE]:
    'Voluntary/VolunTold “shelter-in-place” community-wide home quarantine (especially firm for high-risk groups), shutdown of non-essential businesses, close schools, ban on events over 10 people, passive monitoring, public advocacy around social distancing and enhanced hygiene. Possibly closed borders or restricted travel. Public aid relief bill. Roll-out of free population-wide testing and quarantine, so that quarantines can be relaxed for those who are not infected.',
};

export const INTERVENTION_COLOR_MAP = {
  [NO_ACTION]: 'rgb(255, 51, 72)',
  [SOCIAL_DISTANCING]: 'rgb(255, 144, 0)',
  [SHELTER_IN_PLACE]: 'rgb(49, 187, 232)',
  [LOCKDOWN]: 'rgb(49, 232, 188)', // ?
};

// TODO: This should be temporary to hardcode these
export const STATE_TO_INTERVENTION = {
  AK: SOCIAL_DISTANCING,
  AL: NO_ACTION,
  AZ: SOCIAL_DISTANCING,
  AR: SOCIAL_DISTANCING,
  CA: SHELTER_IN_PLACE,
  CO: SOCIAL_DISTANCING,
  CT: SOCIAL_DISTANCING,
  DE: SOCIAL_DISTANCING,
  FL: NO_ACTION,
  GA: NO_ACTION,
  HI: SOCIAL_DISTANCING,
  ID: NO_ACTION,
  IL: SHELTER_IN_PLACE,
  IN: SOCIAL_DISTANCING,
  IA: SOCIAL_DISTANCING,
  KS: NO_ACTION,
  KY: SOCIAL_DISTANCING,
  LA: SOCIAL_DISTANCING,
  ME: SOCIAL_DISTANCING,
  MD: SOCIAL_DISTANCING,
  MA: SOCIAL_DISTANCING,
  MI: SOCIAL_DISTANCING,
  MN: SOCIAL_DISTANCING,
  MS: NO_ACTION,
  MO: NO_ACTION,
  MT: SOCIAL_DISTANCING,
  NE: NO_ACTION,
  NV: SOCIAL_DISTANCING,
  NH: SOCIAL_DISTANCING,
  NJ: SHELTER_IN_PLACE,
  NM: SOCIAL_DISTANCING,
  NY: SHELTER_IN_PLACE,
  NC: SOCIAL_DISTANCING,
  ND: SOCIAL_DISTANCING,
  OH: SOCIAL_DISTANCING,
  OK: NO_ACTION,
  OR: SOCIAL_DISTANCING,
  PA: SOCIAL_DISTANCING,
  RI: SOCIAL_DISTANCING,
  SC: NO_ACTION,
  SD: NO_ACTION,
  TN: NO_ACTION,
  TX: SOCIAL_DISTANCING,
  UT: SOCIAL_DISTANCING,
  VT: SOCIAL_DISTANCING,
  VA: NO_ACTION,
  WA: SOCIAL_DISTANCING,
  WV: SOCIAL_DISTANCING,
  WI: SOCIAL_DISTANCING,
  WY: SOCIAL_DISTANCING,
};
