import InterventionJSON from '../assets/data/interventions.json'

<<<<<<< HEAD
const LIMITED_ACTION = 'Limited Action';
=======
const NO_ACTION = 'Limited Action';
>>>>>>> upstream/master
const SOCIAL_DISTANCING = 'Social Distancing';
const SHELTER_IN_PLACE = 'Shelter in Place';
const LOCKDOWN = 'Lockdown';

export const INTERVENTIONS = {
  LIMITED_ACTION,
  SOCIAL_DISTANCING,
  SHELTER_IN_PLACE,
  LOCKDOWN,
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
    'Voluntary “shelter-in-place” for high-risk groups, schools and bars / restaurants closed.',
  [SHELTER_IN_PLACE]:
    'Legal order or strong recommendation for citizens to employ “shelter-in-place” home quarantine (especially firm for high-risk groups), shutdown of non-essential businesses, ban on all group events.',
};

export const INTERVENTION_COLOR_MAP = {
  [LIMITED_ACTION]: 'rgb(255, 51, 72)', // red
  [SOCIAL_DISTANCING]: 'rgb(255, 144, 0)', // orange
  [SHELTER_IN_PLACE]: 'rgb(30, 224, 175)', // green
  [LOCKDOWN]: 'rgb(223, 31, 210)', // purple
};

export const STATE_TO_INTERVENTION = stateInterventions();

function stateInterventions() {
  const INTERVENTION_JSON_MAPPING = {
    'limited_action': LIMITED_ACTION,
    'social_distancing': SOCIAL_DISTANCING,
    'shelter_in_place': SHELTER_IN_PLACE
  };

  const interventions = { };
  for(const state in InterventionJSON) {
    interventions[state] = INTERVENTION_JSON_MAPPING[InterventionJSON[state]];
  }
  return interventions;
}
