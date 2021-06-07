import React, { Fragment } from 'react';
import { Sources } from 'api/schema/RegionSummaryWithTimeseries';
import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';
import { Projections } from 'common/models/Projections';
import { formatDecimal, formatInteger } from 'common/utils';
import Thermometer from 'components/Thermometer';
import { MetricDefinition } from './interfaces';
import { Metric } from 'common/metricEnum';
import {
  InfoTooltip,
  TextTooltip,
  renderTooltipContent,
} from 'components/InfoTooltip';
import { metricToTooltipMap } from 'cms-content/tooltips';
import { Region } from 'common/regions';
import { getDataSourceTooltipContent } from 'common/utils/provenance';
import { trackOpenTooltip } from 'components/InfoTooltip';
import { DialogMain, MetricInfoDialogInner } from 'components/Dialogs';

export const CaseIncidenceMetric: MetricDefinition = {
  renderStatus,
  renderDisclaimer,
  renderThermometer,
  renderInfoTooltip,
  metricName: 'Daily new cases',
  extendedMetricName: 'Daily new cases per 100k population',
  metricNameForCompare: `Daily new cases per 100k`,
};

export const CASE_DENSITY_LEVEL_INFO_MAP: LevelInfoMap = {
  [Level.LOW]: {
    level: Level.LOW,
    upperLimit: 1,
    name: 'Low',
    color: COLOR_MAP.GREEN.BASE,
    detail: () => 'COVID is being effectively contained',
  },
  [Level.MEDIUM]: {
    level: Level.MEDIUM,
    upperLimit: 10,
    name: 'Medium',
    color: COLOR_MAP.ORANGE.BASE,
    detail: () => 'COVID not contained, but at low levels',
  },
  [Level.HIGH]: {
    level: Level.HIGH,
    upperLimit: 25,
    name: 'High',
    color: COLOR_MAP.ORANGE_DARK.BASE,
    detail: () => 'Very large number of new cases',
  },
  [Level.CRITICAL]: {
    level: Level.CRITICAL,
    upperLimit: 75,
    name: 'Critical',
    color: COLOR_MAP.RED.BASE,
    detail: () => 'Dangerous number of new cases',
  },
  [Level.SUPER_CRITICAL]: {
    level: Level.SUPER_CRITICAL,
    upperLimit: Infinity,
    name: 'Extreme',
    color: COLOR_MAP.RED.DARK,
    detail: () => 'Very dangerous number of new cases',
  },
  [Level.UNKNOWN]: {
    level: Level.UNKNOWN,
    upperLimit: 0,
    name: 'Unknown',
    color: COLOR_MAP.GRAY.BASE,
    detail: () => 'Insufficient data to assess',
  },
};

function renderStatus(projections: Projections): React.ReactElement {
  const { totalPopulation, currentDailyAverageCases } = projections.primary;
  const currentCaseDensity = projections.getMetricValue(Metric.CASE_DENSITY);
  const locationName = projections.locationName;
  if (
    currentCaseDensity === null ||
    totalPopulation === null ||
    currentDailyAverageCases === null
  ) {
    return (
      <Fragment>
        Unable to generate{' '}
        {CaseIncidenceMetric.extendedMetricName.toLowerCase()}. This could be
        due to insufficient data.
      </Fragment>
    );
  }

  const newCasesPerDay = currentDailyAverageCases;
  // Try not to round cases/day to zero (since it will probably be >0 per 100k).
  const newCasesPerDayText =
    newCasesPerDay >= 0.1 && newCasesPerDay < 1
      ? formatDecimal(newCasesPerDay, 1)
      : formatInteger(newCasesPerDay);

  return (
    <Fragment>
      Over the last week, {locationName} has averaged {newCasesPerDayText} new
      confirmed cases per day (<b>{formatDecimal(currentCaseDensity, 1)}</b> for
      every 100,000 residents).
    </Fragment>
  );
}

function renderInfoModal(
  region: Region,
  provenance?: Sources,
): React.ReactElement {
  const { body } = metricToTooltipMap[Metric.CASE_DENSITY].metricCalculation;

  return (
    <Fragment>
      {'Learn more about '}
      <TextTooltip
        title={getDataSourceTooltipContent(
          Metric.CASE_DENSITY,
          region,
          provenance,
        )}
        mainCopy={'where our data comes from'}
        trackOpenTooltip={() =>
          trackOpenTooltip(`Learn more: ${Metric.CASE_DENSITY}`)
        }
      />
      {' and '}
      <TextTooltip
        title={renderTooltipContent(body)}
        mainCopy={'how we calculate our metrics'}
        trackOpenTooltip={() =>
          trackOpenTooltip(`How we calculate: ${Metric.CASE_DENSITY}`)
        }
      />
      .
    </Fragment>
  );
}

function renderThermometer(): React.ReactElement {
  const levelInfo = CASE_DENSITY_LEVEL_INFO_MAP;
  const levelExtreme = levelInfo[Level.SUPER_CRITICAL];
  const levelCritical = levelInfo[Level.CRITICAL];
  const levelHigh = levelInfo[Level.HIGH];
  const levelMedium = levelInfo[Level.MEDIUM];
  const levelLow = levelInfo[Level.LOW];

  const items = [
    {
      title: `Over ${levelCritical.upperLimit}`,
      description: 'Severe outbreak',
      color: levelExtreme.color,
      roundTop: true,
      roundBottom: false,
    },
    {
      title: `${levelHigh.upperLimit} - ${levelCritical.upperLimit}`,
      color: levelCritical.color,
      roundTop: false,
      roundBottom: false,
    },
    {
      title: `${levelMedium.upperLimit} - ${levelHigh.upperLimit}`,
      color: levelHigh.color,
      roundTop: false,
      roundBottom: false,
    },
    {
      title: `${levelLow.upperLimit} - ${levelMedium.upperLimit}`,
      color: levelMedium.color,
      roundTop: false,
      roundBottom: false,
    },
    {
      title: `Under ${levelLow.upperLimit}`,
      description: 'On track for containment',
      color: levelLow.color,
      roundTop: false,
      roundBottom: true,
    },
  ];
  return <Thermometer items={items} />;
}

function renderInfoTooltip(): React.ReactElement {
  const { body } = metricToTooltipMap[Metric.CASE_DENSITY].metricDefinition;

  return (
    <InfoTooltip
      title={renderTooltipContent(body)}
      aria-label={`Show definition of ${CaseIncidenceMetric.metricName} metric`}
      trackOpenTooltip={() =>
        trackOpenTooltip(`Metric definition: ${Metric.CASE_DENSITY}`)
      }
    />
  );
}

function renderDisclaimer(
  region: Region,
  provenance?: Sources,
): React.ReactElement {
  const howItsCalculated =
    metricToTooltipMap[Metric.CASE_DENSITY].metricCalculation.body;
  const dataSource = getDataSourceTooltipContent(
    Metric.CASE_DENSITY,
    region,
    provenance,
  );
  const metricDefinition =
    metricToTooltipMap[Metric.CASE_DENSITY].metricDefinition.body;

  return (
    <>
      <DialogMain
        open={true}
        closeDialog={() => {}}
        header="Daily new cases"
        links={[
          {
            cta: 'Learn more',
            url: '/covid-risk-levels-metrics#daily-new-cases',
          },
        ]}
        // howItsCalculated={howItsCalculated}
        // dataSource={dataSource}
        // metricDefinition={metricDefinition}
      >
        <MetricInfoDialogInner
          modalContent={{ metricDefinition, howItsCalculated, dataSource }}
          // metricDefinition={metricDefinition}
          // howItsCalculated={howItsCalculated}
          // dataSource={dataSource}
        />
      </DialogMain>
    </>
  );
}

function getMetricModalContent(
  region: Region,
  provenance?: Sources,
): React.ReactElement {
  const howItsCalculated =
    metricToTooltipMap[Metric.CASE_DENSITY].metricCalculation.body;
  const dataSource = getDataSourceTooltipContent(
    Metric.CASE_DENSITY,
    region,
    provenance,
  );
  const metricDefinition =
    metricToTooltipMap[Metric.CASE_DENSITY].metricDefinition.body;

  const modalContent = {
    howItsCalculated,
    dataSource,
    metricDefinition,
  };

  console.log('modalContent', modalContent);

  return (
    <>
      <DialogMain
        open={true}
        closeDialog={() => {}}
        header="Daily new cases"
        links={[
          {
            cta: 'Learn more',
            url: '/covid-risk-levels-metrics#daily-new-cases',
          },
        ]}
      >
        <MetricInfoDialogInner modalContent={modalContent} />
      </DialogMain>
    </>
  );
}
