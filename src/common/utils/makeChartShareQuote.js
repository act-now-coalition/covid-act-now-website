import { STATES } from 'common';
import { formatUtcDate, formatDecimal, formatPercent } from 'common/utils';

//TODO(chelsi): move this copy into individual metric files. remove need for hardcoded identifying numers
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

  if (chartIdentifier === 0) {
    return `${displayName}’s infection growth rate is ${formatDecimal(
      stats[0],
    )}, according to @CovidActNow. See the chart: `;
  } else if (chartIdentifier === 1) {
    return `${formatPercent(
      stats[1],
      1,
    )} of those tested for COVID in ${displayName} tested positive, according to @CovidActNow. See the chart: `;
  } else if (chartIdentifier === 2) {
    return `${displayName}'s available ICU capacity is ${formatPercent(
      stats[2],
    )} full with COVID patients, according to @CovidActNow. See the chart: `;
  } else if (chartIdentifier === 3) {
    return `${displayName} is tracing only ${formatPercent(
      stats[3],
      0,
    )} of COVID cases, according to @CovidActNow. See the chart: `;
  } else if (chartIdentifier === 4) {
    if (projections && projections.baseline.dateOverwhelmed) {
      return `If all restrictions were completely lifted today, ${displayName}'s hospitals would overload on ${formatUtcDate(
        projections.baseline.dateOverwhelmed,
      )}, according to @CovidActNow. See the chart: `;
    }
    return `Assuming current trends and interventions continue, ${displayName}'s hospitals are unlikely to become overloaded in the next 3 months, according to @CovidActNow. See the chart: `;
  } else if (chartIdentifier === 5) {
    return `${displayName} is seeing ${formatDecimal(
      stats[5],
      1,
    )} new cases per day per 100k people, according to @CovidActNow. See the chart: `;
  }
  return `I'm keeping track of ${displayName}'s COVID data and risk level with @CovidActNow. What does your community look like?`;
}
