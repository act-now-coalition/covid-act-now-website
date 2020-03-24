const NO_ACTION = 'Limited Action';
const SOCIAL_DISTANCING = 'Social Distancing';
const SHELTER_IN_PLACE = 'Shelter in Place';
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
  [NO_ACTION]:
    'Public advocacy around “social distancing” and enhanced hygiene. Minimal mandated restrictions.',
  [SOCIAL_DISTANCING]:
    'Voluntary “shelter-in-place” for high-risk groups, schools and bars / restaurants closed.',
  [SHELTER_IN_PLACE]:
    'Legal order for citizens to employ “shelter-in-place” home quarantine (especially firm for high-risk groups), shutdown of non-essential businesses, ban on all group events.',
};

export const INTERVENTION_COLOR_MAP = {
  [NO_ACTION]: 'rgb(255, 51, 72)', // red
  [SOCIAL_DISTANCING]: 'rgb(255, 144, 0)', // orange
  [SHELTER_IN_PLACE]: 'rgb(30, 224, 175)', // green
  [LOCKDOWN]: 'rgb(223, 31, 210)', // purple
};

// TODO: This should be temporary to hardcode these
export const STATE_TO_INTERVENTION = {
  AK: SOCIAL_DISTANCING,
  AL: NO_ACTION,
  AZ: SOCIAL_DISTANCING,
  AR: SOCIAL_DISTANCING,
  CA: SHELTER_IN_PLACE,
  CO: SOCIAL_DISTANCING,
  CT: SHELTER_IN_PLACE,
  DE: SHELTER_IN_PLACE,
  FL: SOCIAL_DISTANCING,
  GA: NO_ACTION,
  HI: SOCIAL_DISTANCING,
  ID: NO_ACTION,
  IL: SHELTER_IN_PLACE,
  IN: SHELTER_IN_PLACE,
  IA: SOCIAL_DISTANCING,
  KS: NO_ACTION,
  KY: SOCIAL_DISTANCING,
  LA: SHELTER_IN_PLACE,
  ME: SOCIAL_DISTANCING,
  MD: SOCIAL_DISTANCING,
  MA: SOCIAL_DISTANCING,
  MI: SHELTER_IN_PLACE,
  MN: SOCIAL_DISTANCING,
  MS: NO_ACTION,
  MO: NO_ACTION,
  MT: SOCIAL_DISTANCING,
  NE: NO_ACTION,
  NV: SHELTER_IN_PLACE,
  NH: SOCIAL_DISTANCING,
  NJ: SHELTER_IN_PLACE,
  NM: SHELTER_IN_PLACE,
  NY: SHELTER_IN_PLACE,
  NC: SOCIAL_DISTANCING,
  ND: SOCIAL_DISTANCING,
  OH: SHELTER_IN_PLACE,
  OK: NO_ACTION,
  OR: SOCIAL_DISTANCING,
  PA: SHELTER_IN_PLACE,
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
  WI: SHELTER_IN_PLACE,
  WY: SOCIAL_DISTANCING,
};
