import { chain } from 'lodash';
import { getAllStates, SummaryForCompare } from 'common/utils/compare';
import { Metric } from 'common/metric';

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
