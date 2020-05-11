import React from 'react';

import {
  ChartContentWrapper,
  MainContentInner,
  ChartHeader,
  ChartDescription,
  ChartLocationName,
  BetaTag,
} from './ChartsHolder.style';
import LocationPageHeader from 'components/LocationPage/LocationPageHeader';
import NoCountyDetail from './NoCountyDetail';
import ModelChart from 'components/Charts/ModelChart';
import { Projections } from 'models/Projections';
import { Projection } from 'models/Projection';
import SummaryStats from 'components/SummaryStats/SummaryStats';
import Disclaimer from 'components/Disclaimer/Disclaimer';
import { ZoneChartWrapper } from 'components/Charts/ZoneChart.style';
import Chart from 'components/Charts/Chart';
import ClaimStateBlock from 'components/ClaimStateBlock/ClaimStateBlock';
import ShareModelBlock from '../../components/ShareBlock/ShareModelBlock';

import {
  optionsRt,
  optionsHospitalUsage,
  optionsPositiveTests,
} from 'components/Charts/zoneUtils';
import { getLevel, getMetricName } from 'metrics/utils';
import { Metric } from 'enums/metrics';
import { Level } from 'enums/levels';
import { formatDate } from 'utils';

// TODO(michael): These format helpers should probably live in a more
// general-purpose location, not just for charts.
import {
  formatDecimal,
  formatPercent,
  formatInteger,
} from 'components/Charts/utils';

// States here that give us specific
const STATES_WITH_DATA_OVERRIDES = ['Nevada'];

// TODO(michael): figure out where this type declaration should live.
type County = {
  county: string;
  county_url_name: string;
  county_fips_code: string;
  state_fips_code: string;
  state_code: string;
  full_fips_code: string;
  cities: string[];
  population: string;
};

const ChartsHolder = (props: {
  projections: Projections;
  stateId: string;
  county: County;
}) => {
  const projection: Projection = props.projections.primary;
  const noInterventionProjection: Projection = props.projections.baseline;

  const { rtRangeData, testPositiveData, icuUtilizationData } = getChartData(
    projection,
  );

  const getChartSummarys = (projection: Projection) => {
    return {
      [Metric.CASE_GROWTH_RATE]: projection.rt,
      [Metric.HOSPITAL_USAGE]: projection.currentIcuUtilization,
      [Metric.POSITIVE_TESTS]: projection.currentTestPositiveRate,
    };
  };

  return (
    <>
      {!projection ? (
        <NoCountyDetail
          countyId={props.county?.county_url_name}
          stateId={props.stateId}
        />
      ) : (
        <>
          <ChartContentWrapper>
            <LocationPageHeader projections={props.projections} />
            <SummaryStats stats={getChartSummarys(projection)} />
            <MainContentInner>
              <ChartHeader>
                {getMetricName(Metric.CASE_GROWTH_RATE)}
              </ChartHeader>
              <ChartLocationName>{projection.locationName}</ChartLocationName>
              <ChartDescription>
                {caseGrowthStatusText(projection)}
              </ChartDescription>
              {rtRangeData && (
                <>
                  <ZoneChartWrapper>
                    <Chart options={optionsRt(rtRangeData) as any} />
                  </ZoneChartWrapper>
                  <Disclaimer metricName="infection growth rate">
                    Most experts recommend an infection rate of less than 1.0
                    for two weeks before reopening.
                  </Disclaimer>
                </>
              )}
              <ChartHeader>{getMetricName(Metric.POSITIVE_TESTS)}</ChartHeader>
              <ChartLocationName>{projection.locationName}</ChartLocationName>
              <ChartDescription>
                {positiveTestsStatusText(projection)}
              </ChartDescription>
              {testPositiveData && (
                <>
                  <ZoneChartWrapper>
                    <Chart
                      options={optionsPositiveTests(testPositiveData) as any}
                    />
                  </ZoneChartWrapper>
                  <Disclaimer metricName="positive test rate">
                    The World Health Organization recommends a positive test
                    rate of less than 10% before reopening. The countries most
                    successful in containing COVID have rates of 3% or less. We
                    calculate the rate as a 7-day trailing average.
                  </Disclaimer>
                </>
              )}
              <ChartHeader>
                {getMetricName(Metric.HOSPITAL_USAGE)}
                <BetaTag>Beta</BetaTag>
              </ChartHeader>
              <ChartLocationName>{projection.locationName}</ChartLocationName>
              <ChartDescription>
                {hospitalOccupancyStatusText(projection)}
              </ChartDescription>
              {icuUtilizationData && (
                <>
                  <ZoneChartWrapper>
                    <Chart
                      options={optionsHospitalUsage(icuUtilizationData) as any}
                    />
                  </ZoneChartWrapper>
                  <Disclaimer metricName="COVID ICU usage">
                    While experts agree surge healthcare capacity is critical,
                    there is no benchmark for ICU surge capacity. This metric
                    attempts to model capacity as interventions are relaxed.
                  </Disclaimer>
                </>
              )}
              <ChartHeader>
                Future projections: all hospitalizations
              </ChartHeader>
              <ChartLocationName>{projection.locationName}</ChartLocationName>
              <ChartDescription>
                {generateChartDescription(projection, noInterventionProjection)}
              </ChartDescription>
              <ModelChart
                projections={props.projections}
                height={''}
                condensed={false}
                forCompareModels={false}
              />
            </MainContentInner>
            <ClaimStateBlock
              stateId={props.stateId}
              countyId={props.county?.county_url_name}
            />
          </ChartContentWrapper>
          <ShareModelBlock
            condensed={false}
            stateId={props.stateId}
            county={props.county}
            projections={props.projections}
            stats={getChartSummarys(projection)}
          />
        </>
      )}
    </>
  );
};

function generateChartDescription(
  projection: Projection,
  noInterventionProjection: Projection,
) {
  // TODO(sgoldblatt): figure out how to get people number data from projection
  if (projection.dateOverwhelmed) {
    if (projection.dateOverwhelmed < new Date()) {
      return `Our projections suggest hospitals in ${projection.locationName} are overloaded.`;
    }
    return `Assuming current trends and interventions continue, ${
      projection.locationName
    } hospitals are projected to become overloaded on ${formatDate(
      projection.dateOverwhelmed,
    )}. Exercise caution.`;
  } else {
    const noInterventionDate = noInterventionProjection.dateOverwhelmed;
    const restrictionsLiftedText = noInterventionDate
      ? `However, any reopening should happen in a slow and phased fashion. If all restrictions were completely lifted today, hospitals would overload on ${formatDate(
          noInterventionDate,
        )}.`
      : `However, any reopening should happen in a slow and phased fashion.`;

    return (
      `Assuming current trends and interventions continue, ${projection.locationName} hospitals are unlikely to become overloaded in the next 3 months. ` +
      `${restrictionsLiftedText}`
    );
  }
}

// Exported for use by AllStates.js.
export function getChartData(
  projection: Projection,
): { rtRangeData: any; testPositiveData: any; icuUtilizationData: any } {
  const rtRangeData =
    projection &&
    projection.rt &&
    projection.getDataset('rtRange').data.map(d => ({
      x: d.x,
      y: d.y?.rt,
      low: d.y?.low,
      hi: d.y?.high,
    }));

  const testPositiveData =
    projection &&
    projection.currentTestPositiveRate &&
    projection.getDataset('testPositiveRate').data;

  const icuUtilizationData =
    projection &&
    projection.currentIcuUtilization &&
    projection.getDataset('icuUtilization').data;

  return { rtRangeData, testPositiveData, icuUtilizationData };
}

function caseGrowthStatusText(projection: Projection) {
  const rt = projection.rt!;
  if (rt === null) {
    return 'No case load data is available.';
  }
  const level = getLevel(Metric.CASE_GROWTH_RATE, rt);
  const additionalPeople = formatDecimal(rt);
  const infectionRate = `On average, each person in ${projection.locationName} with COVID is infecting ${additionalPeople} other people.`;

  const epidemiologyReasoning = levelText(
    level,
    `Because each person is infecting less than one other person, the total number of cases in ${projection.locationName} is shrinking.`,
    `Because this number is only slightly above 1.0, it means that COVID is growing, but slowly.`,
    `As such, the total number of cases in ${projection.locationName} is growing exponentially.`,
  );

  return `${infectionRate} ${epidemiologyReasoning}`;
}

function positiveTestsStatusText(projection: Projection) {
  const testPositiveRate = projection.currentTestPositiveRate;
  if (testPositiveRate === null) {
    return 'No testing data is available.';
  }
  const level = getLevel(Metric.POSITIVE_TESTS, testPositiveRate);
  const lowSizableLarge = levelText(
    level,
    'low',
    'relatively sizable',
    'relatively high',
  );
  const percentage = formatPercent(testPositiveRate);

  const location = projection.locationName;
  const testingBroadlyText = levelText(
    level,
    `which suggests widespread, aggressive testing in ${location}`,
    `which indicates that testing in ${location} is not widespread, meaning that many cases may go undetected`,
    `which indicates that testing in ${location} is limited, meaning that many cases may go undetected`,
  );

  return `A ${lowSizableLarge} percentage (${percentage}) of COVID tests were positive, ${testingBroadlyText}.`;
}

function hospitalOccupancyStatusText(projection: Projection) {
  const currentIcuUtilization = projection.currentIcuUtilization;
  const currentCovidICUPatients = projection.currentCovidICUPatients;
  const totalICUCapacity = projection.totalICUCapacity;
  const nonCovidPatients = Math.floor(projection.nonCovidPatients);

  if (
    currentIcuUtilization === null ||
    currentCovidICUPatients === null ||
    totalICUCapacity === null
  ) {
    return 'No ICU occupancy data is available.';
  }
  const level = getLevel(Metric.HOSPITAL_USAGE, currentIcuUtilization);

  const location = projection.locationName;

  const lowText = `This suggests there is likely enough capacity to absorb a wave of new COVID infections.`;
  const mediumText = `This suggests some ability to absorb an increase in COVID cases, but caution is warranted.`;
  const highText = `This suggests the healthcare system is not well positioned  to absorb a wave of new COVID infections without substantial surge capacity.`;

  const noStateOverride =
    STATES_WITH_DATA_OVERRIDES.indexOf(projection.stateName) < 0 ||
    !projection.hasActualData;

  return `${location} ${noStateOverride ? 'has about' : 'has'} ${formatInteger(
    totalICUCapacity,
  )} ICU Beds.
   ${
     noStateOverride ? 'We estimate that currently' : 'Currently'
   } ${formatPercent(nonCovidPatients / totalICUCapacity)} (${formatInteger(
    nonCovidPatients,
  )})
      are occupied by non-COVID patients. Of the remaining ${formatInteger(
        totalICUCapacity - nonCovidPatients,
      )} ICU beds, ${noStateOverride ? 'we estimate ' : ''}
      ${formatInteger(
        currentCovidICUPatients,
      )} are occupied by COVID cases, or ${formatPercent(
    Math.min(
      1,
      currentCovidICUPatients / (totalICUCapacity - nonCovidPatients),
    ),
  )} of available beds. ${levelText(level, lowText, mediumText, highText)}`;
}

/**
 * Depending on provided `level`, returns the provided `lowText`, `mediumText`,
 * or `highText`.
 */
function levelText(
  level: Level,
  lowText: string,
  mediumText: string,
  highText: string,
) {
  return level === Level.LOW
    ? lowText
    : level === Level.MEDIUM
    ? mediumText
    : highText;
}

export default ChartsHolder;
