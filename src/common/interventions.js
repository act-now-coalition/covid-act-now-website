import InterventionsJSON from 'assets/data/interventions.json';
export const LIMITED_ACTION = 'Limited action';
export const PROJECTED = 'Projected based on current trends';

export const INTERVENTIONS = {
  LIMITED_ACTION,
  PROJECTED,
};

const InterventionNames = {
  orderStart: 'Statewide\nStay-at-home\nBegins',
  orderEnd: 'Statewide\nStay-at-home\nEnds',
  reopening: 'Some Reopening\nBegins',
};

export function stateInterventionDates(stateCode) {
  return InterventionsJSON[stateCode].map(dateEntry => ({
    date: dateEntry.date,
    intervention: InterventionNames[dateEntry.type],
  }));
}
