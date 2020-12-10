import { STATES } from 'common/locations';
import { shuffle, random, take, chain } from 'lodash';
import { getAllStates, SummaryForCompare } from 'common/utils/compare';
import { Metric } from 'common/metric';

/**
 * Returns between 1 and 3 random state fips codes.
 */
export function getRandomStateFipsList() {
  const numStates = random(1, 3);
  const stateList = take(shuffle(STATES), numStates);
  return stateList.map(state => state.state_fips_code);
}

function sortByCaseIncidenceDesc(stateInfo: SummaryForCompare) {
  return -1 * (stateInfo.metricsInfo.metrics[Metric.CASE_DENSITY]?.value || 0);
}

export function getLocationFipsCodesForExplore(numStates: number) {
  return chain(getAllStates())
    .sortBy(sortByCaseIncidenceDesc)
    .take(numStates)
    .map(stateInfo => stateInfo.region.fipsCode)
    .value();
}
