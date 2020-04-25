import React from 'react';

import {
  MainContentWrapper,
  MainContentInner,
  MainContentInnerBody,
} from './ChartsHolder.style';
import LocationPageHeader from 'components/LocationPageHeader/LocationPageHeader';
import NoCountyDetail from './NoCountyDetail';
import ModelChart from 'components/Charts/ModelChart';
import { Projections } from 'models/Projections';
import { Projection } from 'models/Projection';

const ChartsHolder = (props: {
  projections: Projections; // make this be a type with
  stateId: string;
  countyId: string;
}) => {
  // this is the inferred projection. Ideally we'd pass in just the single projeciton, but the location page header needs the full obj
  const projection: Projection = props.projections.primary;

  if (projection && projection.isInferred) {
    const rt_data = projection.getDataset('rt');
  }

  return (
    <>
      {!projection.isInferred ? (
        <NoCountyDetail countyId={props.countyId} stateId={props.stateId} />
      ) : (
        <MainContentWrapper>
          <MainContentInner>
            <LocationPageHeader projections={props.projections} />
            <MainContentInnerBody>
              <ModelChart
                projections={props.projections}
                stateId={props.stateId}
                selectedCounty={props.countyId}
                height
                condensed
                forCompareModels
              />
              {/* TODO(sgoldblatt): Chart Module looping goes here! */}
              {/* TODO(sgoldblatt): Disclaimer should go here! */}
            </MainContentInnerBody>
          </MainContentInner>
        </MainContentWrapper>
      )}
    </>
  );
};

export default ChartsHolder;
