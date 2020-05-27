import { STATES } from 'common';
import { formatDecimal, formatPercent } from 'components/Charts/utils';
import { Metric } from 'common/metric';
import { formatDate } from 'common/utils';

export default function makeChartShareQuote(
  stateId,
  county,
  stats = {},
  chartIdentifier,
  projections,
) {
  const stateName = STATES[stateId];
  const countyName = county && county.county;
  const displayName = countyName ? `${countyName}, ${stateName}` : stateName;

  if (chartIdentifier === '0') {
    return `${displayName}’s infection growth rate is ${formatDecimal(
      stats[0],
    )}, according to @CovidActNow. See the chart: `;
  } else if (chartIdentifier === '1') {
    return `${formatPercent(
      stats[1],
      1,
    )} of people tested for COVID in ${displayName} tested positive, according to @CovidActNow. See the chart: `;
  } else if (chartIdentifier === '2') {
    return `${displayName}'s ICUs are ${formatPercent(
      stats[2],
    )} full with COVID patients, according to @CovidActNow. See the chart: `;
  } else if (chartIdentifier === '3') {
    return `${displayName} is tracking only ${formatPercent(
      stats[3],
      0,
    )} of COVID cases, according to @CovidActNow. See the chart: `;
  } else if (chartIdentifier === '4') {
    if (projections && projections.baseline.dateOverwhelmed) {
      return `If all restrictions were completely lifted today, ${displayName}'s hospitals would overload on ${formatDate(
        projections.baseline.dateOverwhelmed,
      )}. See the chart: `;
    }
    return `Assuming current trends and interventions continue, ${displayName}'s hospitals are unlikely to become overloaded in the next 3 months. See the chart: `;
  }
  return `${displayName}'s COVID risk from @CovidActNow, check it out: `;
}
