import React, { Fragment } from 'react';
import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';
import { getLevel, Metric } from 'common/metric';
import { levelText } from 'common/utils/chart';
import { formatDecimal } from 'common/utils';
import { Projections } from 'common/models/Projections';
import { MetricDefinition } from './interfaces';
import Thermometer from 'components/Thermometer';
import {
  InfoTooltip,
  DisclaimerTooltip,
  renderTooltipContent,
} from 'components/InfoTooltip';
import { metricToTooltipMap } from 'cms-content/tooltips';

const METRIC_NAME = 'Infection rate';

export const CaseGrowthMetric: MetricDefinition = {
  renderStatus,
  renderDisclaimer,
  renderThermometer,
  renderInfoTooltip,
  metricName: METRIC_NAME,
  extendedMetricName: METRIC_NAME,
  metricNameForCompare: METRIC_NAME,
};

const SHORT_DESCRIPTION_LOW = 'Active cases are decreasing';
const SHORT_DESCRIPTION_MEDIUM = 'COVID is still spreading, but slowly';
const SHORT_DESCRIPTION_MEDIUM_HIGH = 'Active cases are rapidly increasing';
const SHORT_DESCRIPTION_HIGH = 'Active cases are exponentially increasing';
const SHORT_DESCRIPTION_UNKNOWN = 'Insufficient data to assess';

const LIMIT_LOW = 0.9;
const LIMIT_MEDIUM = 1.1;
const LIMIT_MEDIUM_HIGH = 1.4;
const LIMIT_HIGH = Infinity;

const LOW_NAME = 'Low';
const MEDIUM_NAME = 'Medium';
const MEDIUM_HIGH_NAME = 'High';
const HIGH_NAME = 'Critical';
const UNKNOWN = 'Unknown';

export const CASE_GROWTH_RATE_LEVEL_INFO_MAP: LevelInfoMap = {
  [Level.LOW]: {
    level: Level.LOW,
    upperLimit: LIMIT_LOW,
    name: LOW_NAME,
    color: COLOR_MAP.GREEN.BASE,
    detail: () => SHORT_DESCRIPTION_LOW,
  },
  [Level.MEDIUM]: {
    level: Level.MEDIUM,
    upperLimit: LIMIT_MEDIUM,
    name: MEDIUM_NAME,
    color: COLOR_MAP.ORANGE.BASE,
    detail: () => SHORT_DESCRIPTION_MEDIUM,
  },
  [Level.HIGH]: {
    level: Level.HIGH,
    upperLimit: LIMIT_MEDIUM_HIGH,
    name: MEDIUM_HIGH_NAME,
    color: COLOR_MAP.ORANGE_DARK.BASE,
    detail: () => SHORT_DESCRIPTION_MEDIUM_HIGH,
  },
  [Level.CRITICAL]: {
    level: Level.CRITICAL,
    upperLimit: LIMIT_HIGH,
    name: HIGH_NAME,
    color: COLOR_MAP.RED.BASE,
    detail: () => SHORT_DESCRIPTION_HIGH,
  },
  // We don't have a SUPER_CRITICAL threshold, so upperLimit is same as CRITICAL to hide it.
  [Level.SUPER_CRITICAL]: {
    level: Level.SUPER_CRITICAL,
    upperLimit: LIMIT_HIGH,
    name: HIGH_NAME,
    color: COLOR_MAP.RED.BASE,
    detail: () => SHORT_DESCRIPTION_HIGH,
  },
  [Level.UNKNOWN]: {
    level: Level.UNKNOWN,
    upperLimit: 0,
    name: UNKNOWN,
    color: COLOR_MAP.GRAY.BASE,
    detail: () => SHORT_DESCRIPTION_UNKNOWN,
  },
};

function renderStatus(projections: Projections): React.ReactElement {
  const rt = projections.getMetricValue(Metric.CASE_GROWTH_RATE);
  const locationName = projections.locationName;

  if (rt === null) {
    return (
      <Fragment>
        Unable to generate {CaseGrowthMetric.extendedMetricName.toLowerCase()}.
        This could be due to insufficient data.
      </Fragment>
    );
  }

  const level = getLevel(Metric.CASE_GROWTH_RATE, rt);
  const epidemiologyReasoning = levelText(
    level,
    `Because each person is infecting less than one other person, the total number of current cases in ${locationName} is shrinking.`,
    `Because this number is around 1.0, it means that COVID continues to spread, but in a slow and controlled fashion.`,
    `As such, the total number of active cases in ${locationName} is growing at an unsustainable rate. If this trend continues, the hospital system may become overloaded. Caution is warranted.`,
    `As such, the total number of current cases in ${locationName} is exploding, putting the hospital system at risk. Aggressive action urgently needed.`,
  );

  return (
    <Fragment>
      On average, each person in {locationName} with COVID is infecting{' '}
      {formatDecimal(rt)} other people. {epidemiologyReasoning}
    </Fragment>
  );
}

// title is content of tooltip
function renderDisclaimer(): React.ReactElement {
  const { body } = metricToTooltipMap[
    Metric.CASE_GROWTH_RATE
  ].metricCalculation;

  return (
    <Fragment>
      <>Learn more about where our data comes from and </>
      {/* <DisclaimerTooltip
        title={<>disclaimer tooltip</>}
        mainCopy={'where our data comes from'}
      />
      <> and </> */}
      <DisclaimerTooltip
        title={renderTooltipContent(body)}
        mainCopy={'how we calculate our metrics'}
      />
      .
    </Fragment>
  );
}

// const renderDataSourceCopy () => {
//   const body = 'This one is a bit complicated. To calculate infection growth, a mathematical model combines trends in daily new cases from the last ~14 day,  with estimates for other variables, such as how many days on average occur between infection and transmission.'
//   const cta =
//   title={renderTooltipContent(body, cta)}

// }

function renderThermometer(): React.ReactElement {
  const levelInfo = CASE_GROWTH_RATE_LEVEL_INFO_MAP;
  const levelCritical = levelInfo[Level.CRITICAL];
  const levelHigh = levelInfo[Level.HIGH];
  const levelMedium = levelInfo[Level.MEDIUM];
  const levelLow = levelInfo[Level.LOW];

  const items = [
    {
      title: `Over ${levelHigh.upperLimit}`,
      description: 'COVID increasing exponentially',
      color: levelCritical.color,
      roundTop: true,
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
      description: 'COVID decreasing',
      color: levelLow.color,
      roundTop: false,
      roundBottom: true,
    },
  ];
  return <Thermometer items={items} />;
}

function renderInfoTooltip(): React.ReactElement {
  const { body } = metricToTooltipMap[Metric.CASE_GROWTH_RATE].metricDefinition;

  return (
    <InfoTooltip
      title={renderTooltipContent(body)}
      aria-label={`Description of ${CaseGrowthMetric.metricName} metric`}
    />
  );
}
