import React from 'react';

import {
  ChartContentWrapper,
  MainContentInner,
  ChartHeader,
  ChartDescription,
  ChartLocationName,
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
import {
  Level,
  CASE_GROWTH_RATE,
  POSITIVE_TESTS,
  HOSPITAL_USAGE,
  determineZone,
  ChartType,
  ChartTypeToTitle,
} from 'enums/zones';
import { formatDate } from 'utils';
// TODO(michael): These format helpers should probably live in a more
// general-purpose location, not just for charts.
import { formatDecimal, formatPercent } from 'components/Charts/utils';

const ChartsHolder = (props: {
  projections: Projections;
  stateId: string;
  countyId: string;
}) => {
  const projection: Projection = props.projections.primary;
  const noInterventionProjection: Projection = props.projections.baseline;

  // TODO(michael): This should probably be some function of today's date?
  const endDate = new Date('2020-05-15');

  const { rtRangeData, testPositiveData, icuUtilizationData } = getChartData(
    projection,
  );

  const getChartSummarys = (projection: Projection) => {
    return {
      [ChartType.CASE_GROWTH_RATE]: projection.rt,
      [ChartType.HOSPITAL_USAGE]: projection.currentIcuUtilization,
      [ChartType.POSITIVE_TESTS]: projection.currentTestPositiveRate,
    };
  };

  return (
    <>
      {!projection ? (
        <NoCountyDetail countyId={props.countyId} stateId={props.stateId} />
      ) : (
        <ChartContentWrapper>
          <LocationPageHeader projections={props.projections} />
          <SummaryStats stats={getChartSummarys(projection)} />
          <MainContentInner>
            <ChartHeader>
              {ChartTypeToTitle[ChartType.CASE_GROWTH_RATE]}
            </ChartHeader>
            <ChartLocationName>{projection.locationName}</ChartLocationName>
            <ChartDescription>
              {caseGrowthStatusText(projection)}
            </ChartDescription>
            {rtRangeData && (
              <>
                <ZoneChartWrapper>
                  <Chart options={optionsRt(rtRangeData, endDate) as any} />
                </ZoneChartWrapper>
                <Disclaimer>
                  We define <strong>infection rate</strong> as “reproductive
                  number” implied by the growth of new cases and new deaths, day
                  over day.
                </Disclaimer>
              </>
            )}
            <ChartHeader>
              {ChartTypeToTitle[ChartType.POSITIVE_TESTS]}
            </ChartHeader>
            <ChartLocationName>{projection.locationName}</ChartLocationName>
            <ChartDescription>
              {positiveTestsStatusText(projection)}
            </ChartDescription>
            {testPositiveData && (
              <>
                <ZoneChartWrapper>
                  <Chart
                    options={
                      optionsPositiveTests(testPositiveData, endDate) as any
                    }
                  />
                </ZoneChartWrapper>
                <Disclaimer>
                  We define <strong>positive tests</strong> as the percent of
                  people tested for COVID on any given day that test positive.
                </Disclaimer>
              </>
            )}
            <ChartHeader>
              {ChartTypeToTitle[ChartType.HOSPITAL_USAGE]}
            </ChartHeader>
            <ChartLocationName>{projection.locationName}</ChartLocationName>
            <ChartDescription>
              {hospitalOccupancyStatusText(projection)}
            </ChartDescription>
            {icuUtilizationData && (
              <>
                <ZoneChartWrapper>
                  <Chart
                    options={
                      optionsHospitalUsage(icuUtilizationData, endDate) as any
                    }
                  />
                </ZoneChartWrapper>
                <Disclaimer>
                  We define <strong>COVID ICU usage</strong> as the percentage
                  of typically available ICU beds currently occupied by COVID
                  patients.
                </Disclaimer>
              </>
            )}
            <ChartHeader>Future projections</ChartHeader>
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
          <ShareModelBlock
            condensed={false}
            stateId={props.stateId}
            county={props.countyId}
          />
          <ClaimStateBlock
            stateId={props.stateId}
            countyName={props.countyId}
          />
        </ChartContentWrapper>
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
    return (
      `Projections indicate that many additional people will ` +
      `be hospitalized in the next 3 months. At this rate, ${projection.locationName} ` +
      `hospitals may become overloaded by ${formatDate(
        projection.dateOverwhelmed,
      )}.`
    );
  } else {
    const noInterventionDate = noInterventionProjection.dateOverwhelmed;
    const restrictionsLiftedText =
      noInterventionDate &&
      `If all restrictions were lifted today, hospitals would become overloaded by ${formatDate(
        noInterventionDate,
      )}.`;

    return (
      `Projections indicate that ${projection.locationName} hospitals are unlikely to become overloaded in the next 3 months. ` +
      `${restrictionsLiftedText || ''}`
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
  const level = determineZone(CASE_GROWTH_RATE, rt);
  const additionalPeople = formatDecimal(rt);
  const infectionRate = `On average, each person in ${projection.locationName} with COVID is infecting ${additionalPeople} other people.`;

  const epidemiologyReasoning = levelText(
    level,
    `Because this number has been driven below 1.0 — an all-important epidemiology threshold — the total number of cases in ${projection.locationName} is shrinking.`,
    `Because this number is above (but not that far above) 1.0 it means that COVID is growing, and growing exponentially, but not at runaway speed.`,
    `As such, the total number of cases in ${projection.locationName} is growing exponentially.`,
  );

  return `${infectionRate} ${epidemiologyReasoning}`;
}

function positiveTestsStatusText(projection: Projection) {
  const testPositiveRate = projection.currentTestPositiveRate;
  if (testPositiveRate === null) {
    return 'No testing data is available.';
  }
  const level = determineZone(POSITIVE_TESTS, testPositiveRate);
  const lowSizableLarge = levelText(
    level,
    'low',
    'relatively sizable',
    'relatively large',
  );
  const percentage = formatPercent(testPositiveRate);

  const location = projection.locationName;
  const testingBroadlyText = levelText(
    level,
    `relatively widespread, aggressive testing in ${location}`,
    `that testing in ${location} is not widespread`,
    `that testing in ${location} is relatively limited`,
  );

  return `A ${lowSizableLarge} percentage (${percentage}) of COVID tests were positive, which indicates ${testingBroadlyText}.`;
}

function hospitalOccupancyStatusText(projection: Projection) {
  const icuUtilization = projection.currentIcuUtilization;
  if (icuUtilization === null) {
    return 'No ICU occupancy data is available.';
  }
  const level = determineZone(HOSPITAL_USAGE, icuUtilization);

  const location = projection.locationName;
  const capacity = Math.round(projection.totalICUCapacity / 100) * 100;
  const normallyFree =
    Math.round(projection.typicallyFreeICUCapacity / 100) * 100;
  const currentlyInICU = projection.currentICUPatients;

  const lowText = `Hospitals have sufficient ICU capacity to absorb a surge of COVID hospitalizations`;
  const mediumText = `Hospitals’ ICUs are not at capacity, but a surge in COVID cases could quickly push the healthcare system to a breaking point`;
  const highText = `Hospitals’ ICUs are at capacity`;

  return `${location} has ${capacity} ICU Beds, and normally ${normallyFree} of them are unoccupied. Currently we estimate there are ${currentlyInICU} COVID ICU patients. ${levelText(
    level,
    lowText,
    mediumText,
    highText,
  )}.`;
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
