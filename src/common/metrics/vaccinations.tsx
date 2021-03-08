import React, { Fragment } from 'react';
import { Sources } from 'api/schema/RegionSummaryWithTimeseries';
import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfo, LevelInfoMap } from 'common/level';
import { formatPercent, formatInteger } from 'common/utils';
import { Projections } from 'common/models/Projections';
import { MetricDefinition } from './interfaces';
import { Metric } from 'common/metricEnum';
import {
  InfoTooltip,
  DisclaimerTooltip,
  renderTooltipContent,
} from 'components/InfoTooltip';
import { metricToTooltipMap } from 'cms-content/tooltips';
import { Region, State } from 'common/regions';
import { getDataSourceTooltipContent } from 'common/utils/provenance';
import { trackOpenTooltip } from 'components/InfoTooltip';

const METRIC_NAME = 'Vaccinated';

export const VaccinationsMetric: MetricDefinition = {
  renderStatus,
  renderDisclaimer,
  renderThermometer,
  renderInfoTooltip,
  metricId: 'metrics.vaccinationsInitiatedRatio',
  metricName: METRIC_NAME,
  extendedMetricName: 'Percent Vaccinated',
  metricNameForCompare: 'Vaccinated (1+ dose)',
};

const SHORT_DESCRIPTION_LOW = 'Population given at least one dose';
// const SHORT_DESCRIPTION_UNKNOWN = 'Insufficient data to assess';

const UNKNOWN = 'Unknown';

// HACK: There isn't a clean way to avoid having grading / zones right now.
const dummyLevelInfo: LevelInfo = {
  level: Level.LOW,
  upperLimit: 1,
  name: '',
  color: '',
  detail: () => '',
};

export const VACCINATIONS_LEVEL_INFO_MAP: LevelInfoMap = {
  [Level.LOW]: {
    level: Level.LOW,
    upperLimit: 1,
    name: '',
    color: COLOR_MAP.ORANGE.BASE,
    detail: () => SHORT_DESCRIPTION_LOW,
  },
  [Level.MEDIUM]: dummyLevelInfo,
  [Level.HIGH]: dummyLevelInfo,
  [Level.CRITICAL]: dummyLevelInfo,
  [Level.SUPER_CRITICAL]: dummyLevelInfo,
  [Level.UNKNOWN]: {
    level: Level.UNKNOWN,
    upperLimit: 1,
    name: UNKNOWN,
    color: COLOR_MAP.GRAY.BASE,
    detail: () => '',
  },
};

function renderStatus(projections: Projections): React.ReactElement {
  const info = projections.primary.vaccinationsInfo;
  if (!info) {
    return <Fragment>No vaccination data is available.</Fragment>;
  }
  const { locationName } = projections;

  const peopleInitiated = formatInteger(info.peopleInitiated);
  const percentInitiated = formatPercent(info.ratioInitiated, 1);
  const peopleVaccinated = formatInteger(info.peopleVaccinated);
  const percentVaccinated = formatPercent(info.ratioVaccinated, 1);

  let distributedText = <Fragment />;
  if (info.dosesDistributed && info.ratioDosesAdministered) {
    distributedText = (
      <Fragment>
        {locationName} has administered{' '}
        {formatPercent(info.ratioDosesAdministered)} of their current supply of{' '}
        {formatInteger(info.dosesDistributed)} vaccine doses.
      </Fragment>
    );
  }

  return (
    <Fragment>
      In {locationName}, {peopleInitiated} people ({percentInitiated}) have
      received at least one dose and {peopleVaccinated} ({percentVaccinated})
      are fully vaccinated. {distributedText} According to the CDC, fewer than
      0.001% of those who have received at least one dose have experienced a
      severe adverse reaction, none of them deadly.
    </Fragment>
  );
}

function renderDisclaimer(
  region: Region,
  provenance?: Sources,
): React.ReactElement {
  const { body } = metricToTooltipMap[Metric.VACCINATIONS].metricCalculation;

  /**
   * We don't have a fallback source for non-state vaccinations.
   * If the page is not a state page or if there is no vaccinations provenance in the API,
   * we don't render the first half of the disclaimer ("where our data comes from").
   */
  return (
    <Fragment>
      {'Learn more about '}
      {region instanceof State ||
      (provenance && provenance[0].name && provenance[0].url) ? (
        <>
          <DisclaimerTooltip
            title={getDataSourceTooltipContent(
              Metric.VACCINATIONS,
              region,
              provenance,
            )}
            mainCopy={'where our data comes from'}
            trackOpenTooltip={() =>
              trackOpenTooltip(`Learn more: ${Metric.VACCINATIONS}`)
            }
          />
          {' and '}
        </>
      ) : (
        ''
      )}
      <DisclaimerTooltip
        title={renderTooltipContent(body)}
        mainCopy={'how we calculate our metrics'}
        trackOpenTooltip={() =>
          trackOpenTooltip(`How we calculate: ${Metric.VACCINATIONS}`)
        }
      />
      .
    </Fragment>
  );
}

function renderThermometer(): React.ReactElement {
  // NOTE: We don't grade on vaccinations yet, so no thermometer.
  return <div />;
}

function renderInfoTooltip(): React.ReactElement {
  const { body } = metricToTooltipMap[Metric.VACCINATIONS].metricDefinition;

  return (
    <InfoTooltip
      title={renderTooltipContent(body)}
      aria-label={`Show definition of ${VaccinationsMetric.metricName} metric`}
      trackOpenTooltip={() =>
        trackOpenTooltip(`How we calculate: ${Metric.VACCINATIONS}`)
      }
    />
  );
}
