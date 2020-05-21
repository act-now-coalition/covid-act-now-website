import React, { useRef } from 'react';

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
import { Projections } from 'common/models/Projections';
import { Projection } from 'common/models/Projection';
import SummaryStats from 'components/SummaryStats/SummaryStats';
import Disclaimer from 'components/Disclaimer/Disclaimer';
import { ZoneChartWrapper } from 'components/Charts/ZoneChart.style';
import Chart from 'components/Charts/Chart';
import ClaimStateBlock from 'components/ClaimStateBlock/ClaimStateBlock';
import ShareModelBlock from '../../components/ShareBlock/ShareModelBlock';
import { ChartRt } from '../../components/Charts';

import {
  caseGrowthStatusText,
  CASE_GROWTH_DISCLAIMER,
} from 'common/metrics/case_growth';
import {
  positiveTestsStatusText,
  POSITIVE_RATE_DISCLAIMER,
} from 'common/metrics/positive_rate';
import {
  hospitalOccupancyStatusText,
  HOSPITALIZATIONS_DISCLAIMER,
} from 'common/metrics/hospitalizations';
import { generateChartDescription } from 'common/metrics/future_projection';
import { contactTracingStatusText } from 'common/metrics/contact_tracing';

import {
  optionsHospitalUsage,
  optionsPositiveTests,
  optionsContactTracing,
} from 'components/Charts/zoneUtils';
import { getMetricName } from 'common/metric';
import { Metric } from 'common/metric';

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

const scrollTo = (div: null | HTMLDivElement) =>
  div &&
  window.scrollTo({
    left: 0,
    // TODO: 180 is rough accounting for the navbar and searchbar;
    // could make these constants so we don't have to manually update
    top: div.offsetTop - 180,
    behavior: 'smooth',
  });

const ChartsHolder = (props: {
  projections: Projections;
  stateId: string;
  county: County;
}) => {
  const projection: Projection = props.projections.primary;
  const noInterventionProjection: Projection = props.projections.baseline;

  const {
    rtRangeData,
    testPositiveData,
    icuUtilizationData,
    contactTracingData,
  } = getChartData(projection);

  const rtRangeRef = useRef<HTMLDivElement>(null);
  const testPositiveRef = useRef<HTMLDivElement>(null);
  const icuUtilizationRef = useRef<HTMLDivElement>(null);
  const contactTracingRef = useRef<HTMLDivElement>(null);

  const getChartSummarys = (projection: Projection) => {
    return {
      [Metric.CASE_GROWTH_RATE]: projection.rt,
      [Metric.HOSPITAL_USAGE]: projection.currentIcuUtilization,
      [Metric.POSITIVE_TESTS]: projection.currentTestPositiveRate,
      [Metric.CONTACT_TRACING]: projection.currentContactTracerMetric,
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
            <SummaryStats
              stats={getChartSummarys(projection)}
              onRtRangeClick={() => scrollTo(rtRangeRef.current)}
              onTestPositiveClick={() => scrollTo(testPositiveRef.current)}
              onIcuUtilizationClick={() => scrollTo(icuUtilizationRef.current)}
              onContactTracingClick={() => scrollTo(contactTracingRef.current)}
            />
            <MainContentInner>
              <ChartHeader ref={rtRangeRef}>
                {getMetricName(Metric.CASE_GROWTH_RATE)}
              </ChartHeader>
              <ChartLocationName>{projection.locationName}</ChartLocationName>
              <ChartDescription>
                {caseGrowthStatusText(projection)}
              </ChartDescription>
              {rtRangeData && (
                <>
                  <ChartRt columnData={projection.getDataset('rtRange')} />
                  <Disclaimer metricName="infection growth rate">
                    {CASE_GROWTH_DISCLAIMER}
                  </Disclaimer>
                </>
              )}
              <ChartHeader ref={testPositiveRef}>
                {getMetricName(Metric.POSITIVE_TESTS)}
              </ChartHeader>
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
                    {POSITIVE_RATE_DISCLAIMER}
                  </Disclaimer>
                </>
              )}
              <ChartHeader ref={icuUtilizationRef}>
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
                    <a
                      href="https://preventepidemics.org/wp-content/uploads/2020/04/COV020_WhenHowTightenFaucet_v3.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resolve to Save Lives
                    </a>
                    {HOSPITALIZATIONS_DISCLAIMER}
                  </Disclaimer>
                </>
              )}
              <ChartHeader ref={contactTracingRef}>
                {getMetricName(Metric.CONTACT_TRACING)}
                <BetaTag>Beta</BetaTag>
              </ChartHeader>
              <ChartLocationName>{projection.locationName}</ChartLocationName>
              <ChartDescription>
                {contactTracingStatusText(projection)}
              </ChartDescription>
              {/* TODO: Use contact tracing data here */}
              {contactTracingData && (
                <>
                  <ZoneChartWrapper>
                    <Chart
                      options={optionsContactTracing(contactTracingData) as any}
                    />
                  </ZoneChartWrapper>
                  <Disclaimer>
                    <a
                      href="https://science.sciencemag.org/content/368/6491/eabb6936"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Experts recommend
                    </a>{' '}
                    that 80% of contacts for each new case must be traced within
                    48 hours in order to contain COVID. Experts estimate that
                    tracing each new case within 48 hours requires an average of
                    10 contact tracers per new case, as well as fast testing.
                    Our contact tracing data is sourced from{' '}
                    <a
                      href="https://testandtrace.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      testandtrace.com
                    </a>{' '}
                    and NPR.{' '}
                    <a
                      href="https://blog.covidactnow.org/modeling-metrics-critical-to-reopen-safely/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn more
                    </a>
                    .
                  </Disclaimer>
                </>
              )}
              <ChartHeader>
                Future Hospitalization (both ICU and non-ICU) Projections
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

// Exported for use by AllStates.js.
export function getChartData(
  projection: Projection,
): {
  rtRangeData: any;
  testPositiveData: any;
  icuUtilizationData: any;
  contactTracingData: any;
} {
  const rtRangeData =
    projection &&
    projection.rt &&
    projection.getDataset('rtRange').map(d => ({
      x: d.x,
      y: d.y?.rt,
      low: d.y?.low,
      hi: d.y?.high,
    }));

  const testPositiveData =
    projection &&
    projection.currentTestPositiveRate &&
    projection.getDataset('testPositiveRate');

  const icuUtilizationData =
    projection &&
    projection.currentIcuUtilization &&
    projection.getDataset('icuUtilization');

  const contactTracingData =
    projection &&
    projection.currentContactTracerMetric &&
    projection.getDataset('contractTracers');

  return {
    rtRangeData,
    testPositiveData,
    icuUtilizationData,
    contactTracingData,
  };
}

export default ChartsHolder;
