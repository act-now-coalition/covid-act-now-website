import { fail, formatDecimal, formatPercent } from 'common/utils';

//TODO(chelsi): move this copy into individual metric files. remove need for hardcoded identifying numers
export default function makeChartShareQuote(
  displayName: string,
  stats: any = {},
  chartIdentifier: number,
) {
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
    return `${displayName} has used ${formatPercent(
      stats[2],
    )} of their ICU capacity, according to @CovidActNow. See the chart: `;
  } else if (chartIdentifier === 3) {
    return `${displayName} is tracing only ${formatPercent(
      stats[3],
      0,
    )} of COVID cases, according to @CovidActNow. See the chart: `;
  } else if (chartIdentifier === 4) {
    fail('Future projections chart was deprecated.');
  } else if (chartIdentifier === 5) {
    return `${displayName} is seeing ${formatDecimal(
      stats[5],
      1,
    )} daily new cases per 100k population, according to @CovidActNow. See the chart: `;
  }
  return `I'm keeping track of ${displayName}'s COVID data and risk level with @CovidActNow. What does your community look like?`;
}
