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
import { ZoneChartWrapper } from 'components/Charts/ZoneChart.style';
import Chart from 'components/Charts/Chart';
import {
  optionsRt,
  optionsHospitalUsage,
  optionsPositiveTests,
} from 'components/Charts/zoneUtils';

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
      low: d?.y.low,
      hi: d.y?.high,
    }));

  const testPositiveData =
    projection && projection.getDataset('testPositiveRate').data;

  const icuUtilizationData =
    projection && projection.getDataset('icuUtilization').data;

  return (
    <>
      {!projection ? (
        <NoCountyDetail countyId={props.countyId} stateId={props.stateId} />
      ) : (
        <ChartContentWrapper>
          <LocationPageHeader projections={props.projections} />
          <MainContentInner>
            <ChartHeader></ChartHeader>
            <h2>Case growth</h2>
            {rtRangeData && (
              <ZoneChartWrapper>
                <Chart options={optionsRt(rtRangeData, endDate) as any} />
              </ZoneChartWrapper>
            )}
            <h2>Positive tests</h2>
            {testPositiveData && (
              <ZoneChartWrapper>
                <Chart
                  options={
                    optionsPositiveTests(testPositiveData, endDate) as any
                  }
                />
              </ZoneChartWrapper>
            )}
            <h2>Hospital ICU occupancy</h2>
            {icuUtilizationData && (
              <ZoneChartWrapper>
                <Chart
                  options={
                    optionsHospitalUsage(icuUtilizationData, endDate) as any
                  }
                />
              </ZoneChartWrapper>
            )}
            <h2>Future projections</h2>
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

export default ChartsHolder;
