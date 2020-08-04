import React, { Fragment } from 'react';
import { Projection } from 'common/models/Projection';
import { Indicator } from './utils';
import { Level } from 'common/level';
import { getLevel, Metric } from 'common/metric';
import { formatDecimal, formatInteger, formatPercent } from 'common/utils';
import { METRIC_NAME } from 'common/metrics/case_density';
import ExternalLink from '../ExternalLink';

const caseIncidence: Indicator = {
  renderStatus(projection: Projection) {
    const {
      locationName,
      currentCaseDensity,
      currentDailyDeaths,
      totalPopulation,
    } = projection;
    if (
      currentCaseDensity === null ||
      currentDailyDeaths === null ||
      totalPopulation === null
    ) {
      return (
        <Fragment>
          {`Not enough case data is available to generate ${METRIC_NAME.toLowerCase()}.`}
        </Fragment>
      );
    }
    const dailyCases = formatDecimal(currentCaseDensity, 1);
    const level = getLevel(Metric.CASE_DENSITY, currentCaseDensity);

    const levelFactor = {
      [Level.LOW]: 1,
      [Level.MEDIUM]: 10,
      [Level.HIGH]: 20,
      [Level.CRITICAL]: 100,
      [Level.UNKNOWN]: 0,
    };

    const casesPerYear = currentCaseDensity * 356 * levelFactor[level];
    const casesPerYearText = formatInteger(casesPerYear);
    const estimatedCasesPerYear = casesPerYear * 5;
    const estimatedCasesPerYearText = formatInteger(estimatedCasesPerYear);
    const percentOfPopulation = Math.min(
      1,
      estimatedCasesPerYear / totalPopulation,
    );
    const percentOfPopulationText = formatPercent(percentOfPopulation, 1);

    return (
      <Fragment>
        {`Over the last week, ${locationName} has averaged ${dailyCases} new
        confirmed cases per day for every 100,000 residents. Over the next 
        year this translates to ${casesPerYearText} cases and an`}{' '}
        <ExternalLink href="https://www.globalhealthnow.org/2020-06/us-cases-10x-higher-reported">
          estimated
        </ExternalLink>{' '}
        {`${estimatedCasesPerYearText} infections (${percentOfPopulationText} of the population).`}
      </Fragment>
    );
  },
};

export default caseIncidence;
