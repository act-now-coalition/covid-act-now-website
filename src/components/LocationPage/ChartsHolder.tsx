import React from 'react';

import {
  ChartContentWrapper,
  MainContentInner,
  ChartHeader,
} from './ChartsHolder.style';
import LocationPageHeader from 'components/LocationPage/LocationPageHeader';
import NoCountyDetail from './NoCountyDetail';
import ModelChart from 'components/Charts/ModelChart';
import { Projections } from 'models/Projections';
import { Projection } from 'models/Projection';
import SummaryStats from 'components/SummaryStats/SummaryStats';
import { ZoneChartWrapper } from 'components/Charts/ZoneChart.style';
import Chart from 'components/Charts/Chart';
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
  getChartColumnFromChartType,
} from 'enums/zones';
// TODO(michael): These format helpers should probably live in a more
// general-purpose location, not just for charts.
import {
  formatDecimal,
  formatPercent,
  formatInteger,
} from 'components/Charts/utils';

const ChartsHolder = (props: {
  projections: Projections;
  stateId: string;
  countyId: string;
}) => {
  const projection: Projection = props.projections.primary;

  // TODO(michael): This should probably be some function of today's date?
  const endDate = new Date('2020-05-15');

  // TODO(michael): We need to handle absence of data better and decide whether
  // to hide charts or show a no-data indicator of some kind.
  const rtRangeData =
    projection &&
    projection.isInferred &&
    projection.getDataset('rtRange').data.map(d => ({
      x: d.x,
      y: d.y?.rt,
      low: d.y?.low,
      hi: d.y?.high,
    }));

  const testPositiveData =
    projection && projection.getDataset('testPositiveRate').data;

  const icuUtilizationData =
    projection && projection.getDataset('icuUtilization').data;

  const getChartSummarys = (projection: Projection) => {
    return {
      [ChartType.CASE_GROWTH_RATE]: projection.getLatestColumnValue('rtRange'),
      [ChartType.HOSPITAL_USAGE]: projection.getLatestColumnValue(
        'icuUtilization',
      ),
      [ChartType.POSITIVE_TESTS]: projection.getLatestColumnValue(
        'testPositiveRate',
      ),
    };
  };

  return (
    <>
      {!projection ? (
        <NoCountyDetail countyId={props.countyId} stateId={props.stateId} />
      ) : (
        <ChartContentWrapper>
          <LocationPageHeader projections={props.projections} />
          {projection.isInferred && <SummaryStats stats={getChartSummarys(projection)} />}
          <MainContentInner>
            <ChartHeader></ChartHeader>
            <h1>{ChartType.CASE_GROWTH_RATE}</h1>
            {caseGrowthStatusText(projection)}
            {rtRangeData && (
              <ZoneChartWrapper>
                <Chart options={optionsRt(rtRangeData, endDate) as any} />
              </ZoneChartWrapper>
            )}
            <h1>{ChartType.POSITIVE_TESTS}</h1>
            {positiveTestsStatusText(projection)}
            {testPositiveData && (
              <ZoneChartWrapper>
                <Chart
                  options={
                    optionsPositiveTests(testPositiveData, endDate) as any
                  }
                />
              </ZoneChartWrapper>
            )}
            <h1>{ChartType.HOSPITAL_USAGE}</h1>
            {hospitalOccupancyStatusText(projection)}
            {icuUtilizationData && (
              <ZoneChartWrapper>
                <Chart
                  options={
                    optionsHospitalUsage(icuUtilizationData, endDate) as any
                  }
                />
              </ZoneChartWrapper>
            )}
            <h1>Future Projections</h1>
            <span>
              {props.projections.countyName
                ? `${props.projections.countyName}, ${props.projections.stateName}`
                : props.projections.stateName}
            </span>
            <ModelChart
              projections={props.projections}
              stateId={props.stateId}
              selectedCounty={props.countyId}
              height={''}
              condensed={false}
              forCompareModels={false}
            />
            {/* TODO(sgoldblatt): Inferred Chart Module looping goes here! */}
            {/* TODO(sgoldblatt): Disclaimer should go here! */}
          </MainContentInner>
        </ChartContentWrapper>
      )}
    </>
  );
};

function caseGrowthStatusText(projection: Projection) {
  const rt = projection.rt!;
  if (rt === null) {
    return 'No case load data is available.';
  }
  const level = determineZone(CASE_GROWTH_RATE, rt);
  const decreasingStabilizingGrowing = levelText(
    level,
    'decreasing',
    'stabilizing',
    'growing',
  );

  const additionalPeople = formatDecimal(rt);

  const d = projection.weeklyNewCasesDelta;
  const weeklyDelta =
    d >= 0 ? formatInteger(d) + ' more' : formatInteger(-d) + ' fewer';
  const weeklyDeltaText =
    d === 0 ? '' : `There are ${weeklyDelta} new cases this week than last.`;

  return `Case load is ${decreasingStabilizingGrowing}, because each person with COVID infects ${additionalPeople} additional people. ${weeklyDeltaText}`;
}

function positiveTestsStatusText(projection: Projection) {
  const testPositiveRate = projection.currentTestPositiveRate;
  if (testPositiveRate === null) {
    return 'No testing data is available.';
  }
  const level = determineZone(POSITIVE_TESTS, testPositiveRate);
  const lowSizableLarge = levelText(level, 'low', 'sizable', 'large');
  const percentage = formatPercent(testPositiveRate);

  const location = projection.locationName;
  const testingBroadlyText = levelText(
    level,
    `${location} is testing broadly`,
    `testing in ${location} is not sufficiently broad`,
    `testing is not widely available in ${location}`,
  );

  return `A ${lowSizableLarge} percentage (${percentage}) of people tested for COVID test positive, meaning that ${testingBroadlyText}.`;
}

function hospitalOccupancyStatusText(projection: Projection) {
  const icuUtilization = projection.currentIcuUtilization;
  if (icuUtilization === null) {
    return 'No ICU occupancy data is available.';
  }
  const level = determineZone(HOSPITAL_USAGE, icuUtilization);

  const location = projection.locationName;
  const lowText = `Hospitals in ${location} have sufficient capacity to support COVID patients if cases were to spike.`;
  const mediumText = `Hospitals in ${location} are not overloaded, but a spike in cases could strain the hospital system.`;
  const highText = `Hospitals in ${location} are overloaded.`;
  return levelText(level, lowText, mediumText, highText);
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
