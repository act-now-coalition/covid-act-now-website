import AggregationsJSON from 'assets/data/aggregations.json';
import { last } from 'lodash';
import moment from 'moment';
import { formatPercent, formatDecimal } from 'common/utils';

// Fix all uses of !

const getPercentChange = (series: any[]): number => {
  const lastTwoWeeks = series.slice(-14);
  const difference = last(lastTwoWeeks)! - lastTwoWeeks[0]!;
  const percentChange = difference / lastTwoWeeks[0]!;
  return percentChange;
};

const getDescriptiorCopy = (percentChange: number): string => {
  if (percentChange > 0) {
    return 'increased ';
  } else return 'decreased ';
};

const getTotalCasesCopy = (summedRawCases: number): string => {
  const divided = summedRawCases / 1000000;
  return `${formatDecimal(divided, 1)} million`;
};

export function getNationalText(): string {
  const usaAggregation = AggregationsJSON['00001'];
  const {
    rawDailyCases,
    rawDailyDeaths,
    smoothedDailyCases,
    smoothedDailyDeaths,
    dates,
  } = usaAggregation;

  const totalCases = rawDailyCases.reduce(
    (acc: number, curr: number) => acc + curr,
    0,
  );

  // Fix any
  const totalDeaths = rawDailyDeaths.reduce(
    (acc: number, curr: any) => acc + curr,
    0,
  );

  const percentChangeSmoothedCases = getPercentChange(smoothedDailyCases);
  const percentChangeSmoothedDeaths = getPercentChange(smoothedDailyDeaths);

  const lastDate = last(dates);
  const lastDateFormatted = moment(lastDate).format('MMMM Do, YYYY');

  return `As of ${lastDateFormatted}, there have been roughly${' '}
  ${getTotalCasesCopy(
    totalCases,
  )} cases and ${totalDeaths.toLocaleString()}${' '}
  deaths from COVID in the United States. Over the last 14 days, daily new
  cases have ${getDescriptiorCopy(percentChangeSmoothedCases)} by${' '}
  ${formatPercent(Math.abs(percentChangeSmoothedCases))} and daily new
  deaths have ${getDescriptiorCopy(percentChangeSmoothedDeaths)}
  by ${formatPercent(Math.abs(percentChangeSmoothedDeaths))}.`;
}
