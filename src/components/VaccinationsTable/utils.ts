import regions, { State } from 'common/regions';
import sortBy from 'lodash/sortBy';
import take from 'lodash/take';
import takeRight from 'lodash/takeRight';
import { LocationSummariesByFIPS } from 'common/location_summaries';

export interface StateWithVaccinationMetrics {
  stateName: string;
  vaccinationsInitiated: number | null;
  vaccinationsCompleted: number | null;
}

export interface StateWithVaccinationMetricsAndRank {
  rank: number;
}

function getStatesSortedByVaccinationsCompleted() {
  const states = regions.states;
  const statesWithVaccinationMetrics = states.map((state: State, i: number) => {
    const summaryForFips = LocationSummariesByFIPS[state.fipsCode];
    return {
      locationName: state.name,
      vaccinationsInitiated: summaryForFips.metrics[6]?.value ?? null,
      vaccinationsCompleted: summaryForFips.vc ?? null,
    };
  });
  const sorted = sortBy(
    statesWithVaccinationMetrics,
    (state: StateWithVaccinationMetrics) => state.vaccinationsInitiated,
  ).reverse(); // reversing because sortBy sorts in ascending order, placing lowest-ranked first
  const sortedWithRank = sorted.map((stateInfo, i: number) => ({
    stateInfo,
    rank: i + 1,
  }));
  return sortedWithRank;
}

export function getHighestRankingStates(amount: number) {
  const sortedStates = getStatesSortedByVaccinationsCompleted();
  return take(sortedStates, amount);
}

export function getLowestRankingStates(amount: number) {
  const sortedStates = getStatesSortedByVaccinationsCompleted();
  return takeRight(sortedStates, amount);
}
