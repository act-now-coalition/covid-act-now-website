import React from 'react';

import { ChartContentWrapper, MainContentInner } from './ChartsHolder.style';
import LocationPageHeader from 'components/LocationPage/LocationPageHeader';
import NoCountyDetail from './NoCountyDetail';
import ModelChart from 'components/Charts/ModelChart';
import { Projections } from 'models/Projections';
import { Projection } from 'models/Projection';

const ChartsHolder = (props: {
  projections: Projections;
  stateId: string;
  countyId: string;
}) => {
  const projection: Projection = props.projections.primary;

  if (projection && projection.isInferred) {
    const rtData = projection.getDataset('rt');
  }

  return (
    <>
      {!projection ? (
        <NoCountyDetail countyId={props.countyId} stateId={props.stateId} />
      ) : (
        <ChartContentWrapper>
          <LocationPageHeader projections={props.projections} />
          <MainContentInner>
            <ModelChart
              projections={props.projections}
              stateId={props.stateId}
              selectedCounty={props.countyId}
              height
              condensed
              forCompareModels
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
