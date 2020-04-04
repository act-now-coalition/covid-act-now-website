import { INTERVENTIONS } from 'enums';

export function interventionToModelMap(interventions) {
  if (
    !interventions ||
    !interventions.baseline ||
    !interventions.distancingPoorEnforcement ||
    !interventions.distancing
  ) {
    throw new Error('Unexpected shape of intervention data');
  }

  return {
    [INTERVENTIONS.LIMITED_ACTION]: interventions.baseline,
    [INTERVENTIONS.SOCIAL_DISTANCING]:
      interventions.distancingPoorEnforcement.now,
    [INTERVENTIONS.SHELTER_IN_PLACE]: interventions.distancing.now,
  };
}

export function getWorstCaseIntervention(intervention) {
  return intervention === INTERVENTIONS.SHELTER_IN_PLACE
    ? INTERVENTIONS.SOCIAL_DISTANCING
    : intervention;
}
