import React, { Fragment } from 'react';
import SiteSummaryJSON from 'assets/data/site-summary.json';
import isNull from 'lodash/isNull';
import { formatPercent } from 'common/utils';

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
  const { twoWeekPercentChangeInHospitalizations } = usa;

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
      {!isNull(twoWeekPercentChangeInHospitalizations)
        ? `Over the last 14 days, hospitalizations have ${getChangeDescriptorCopy(
            twoWeekPercentChangeInHospitalizations,
          )}.`
        : ''}
    </Fragment>
  );
}
