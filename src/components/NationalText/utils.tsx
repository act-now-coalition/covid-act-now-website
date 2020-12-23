import React, { Fragment } from 'react';
import AggregationsJSON from 'assets/data/aggregations.json';
import { last, sum, isNumber } from 'lodash';
import moment from 'moment';
import {
  formatPercent,
  formatDecimal,
  getPercentChange,
  formatEstimate,
} from 'common/utils';

const getTwoWeekPercentChange = (series: any[]): number | null => {
  const lastTwoWeeks = series.slice(-14);
  const firstVal = lastTwoWeeks[0];
  const lastVal = last(lastTwoWeeks);
  if (!firstVal || !lastVal) {
    return null;
  }
  return getPercentChange(firstVal, lastVal);
};

const getTotalCasesCopy = (summedRawCases: number): string => {
  const ONE_MILLION = 1000000;
  const divided = summedRawCases / ONE_MILLION;
  return `${formatDecimal(divided, 1)} million`;
};

export const getNationalText: React.FC = () => {
  const usaAggregation = AggregationsJSON['00001'];
  const {
    rawDailyCases,
    rawDailyDeaths,
    smoothedDailyCases,
    smoothedDailyDeaths,
    dates,
  } = usaAggregation;

  const totalCases: number = sum(rawDailyCases);

  const totalDeaths: number = sum(rawDailyDeaths);

  const percentChangeSmoothedCases = getTwoWeekPercentChange(
    smoothedDailyCases,
  );
  const percentChangeSmoothedDeaths = getTwoWeekPercentChange(
    smoothedDailyDeaths,
  );

  const renderPercentChangeSentence =
    isNumber(percentChangeSmoothedCases) &&
    isNumber(percentChangeSmoothedDeaths);

  const lastDate = last(dates);
  const lastDateFormatted: string = moment(lastDate).format('MMMM Do, YYYY');

  const getChangeDescriptorCopy = (percentChange: number): string => {
    const changeByCopy = `by about ${formatPercent(Math.abs(percentChange))}`;
    if (percentChange > 0.01) {
      return `increased ${changeByCopy}`;
    } else if (percentChange < 0) {
      return `decreased ${changeByCopy}`;
    } else return 'remained about the same';
  };

  return (
    <Fragment>
      As of {lastDateFormatted}, there have been roughly{' '}
      {getTotalCasesCopy(totalCases)} cases and{' '}
      {formatEstimate(totalDeaths, 3).toLocaleString()} deaths from COVID in the
      United States.{' '}
      {renderPercentChangeSentence
        ? `Over the last 14 days, daily new
    cases have ${getChangeDescriptorCopy(
      percentChangeSmoothedCases!,
    )} and daily new
    deaths have ${getChangeDescriptorCopy(percentChangeSmoothedDeaths!)}.`
        : ''}
    </Fragment>
  );
};
