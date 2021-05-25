import React, { Fragment } from 'react';
import SiteSummaryJSON from 'assets/data/site-summary.json';
import isNull from 'lodash/isNull';
import { formatPercent, formatDecimal, formatEstimate } from 'common/utils';
import {
  parseDateUnix,
  DateFormat,
  formatUTCDateTime,
} from 'common/utils/time-utils';

const getTotalCasesCopy = (summedRawCases: number): string => {
  const ONE_MILLION = 1000000;
  const divided = summedRawCases / ONE_MILLION;
  return `${formatDecimal(divided, 1)} million`;
};

export function getNationalText(): React.ReactElement {
  const usa = SiteSummaryJSON.usa;
  const {
    totalCases,
    totalDeaths,
    lastDate,
    twoWeekPercentChangeInCases,
    twoWeekPercentChangeInDeaths,
  } = usa;

  const lastDateFormatted: string = formatUTCDateTime(
    parseDateUnix(lastDate),
    DateFormat.MMMM_D_YYYY,
  );

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
      {!isNull(twoWeekPercentChangeInCases) &&
      !isNull(twoWeekPercentChangeInDeaths)
        ? `Over the last 14 days, daily new
    cases have ${getChangeDescriptorCopy(twoWeekPercentChangeInCases)} and daily
    deaths have ${getChangeDescriptorCopy(twoWeekPercentChangeInDeaths)}.`
        : ''}
    </Fragment>
  );
}
