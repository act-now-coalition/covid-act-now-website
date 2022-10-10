import React, { Fragment } from 'react';
import SiteSummaryJSON from 'assets/data/site-summary.json';
import isNull from 'lodash/isNull';
import { formatPercent, formatDecimal, formatEstimate } from 'common/utils';
import {
  parseDateUnix,
  DateFormat,
  formatUTCDateTime,
} from '@actnowcoalition/time-utils';

const getTotalCasesCopy = (summedRawCases: number): string => {
  const ONE_MILLION = 1000000;
  const divided = summedRawCases / ONE_MILLION;
  return `${formatDecimal(divided, 1)} million`;
};

interface SiteSummary {
  totalCases: number;
  totalDeaths: number;
  lastDate: number;
  twoWeekPercentChangeInCases: number | null;
  twoWeekPercentChangeInDeaths: number | null;
  twoWeekPercentChangeInHospitalizations: number | null;
}

export function getNationalText(): React.ReactElement {
  const usa = SiteSummaryJSON.usa as SiteSummary;
  const {
    totalCases,
    totalDeaths,
    lastDate,
    twoWeekPercentChangeInDeaths,
    twoWeekPercentChangeInHospitalizations,
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
      {getTotalCasesCopy(totalCases)} reported cases, and{' '}
      {formatEstimate(totalDeaths, 3).toLocaleString()} COVID deaths in the
      United States.{' '}
      {!isNull(twoWeekPercentChangeInHospitalizations) &&
      !isNull(twoWeekPercentChangeInDeaths)
        ? `Over the last 14 days, hospitalizations have ${getChangeDescriptorCopy(
            twoWeekPercentChangeInHospitalizations,
          )} and weekly deaths have ${getChangeDescriptorCopy(
            twoWeekPercentChangeInDeaths,
          )}.`
        : ''}
    </Fragment>
  );
}
