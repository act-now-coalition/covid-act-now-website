import React from 'react';

import {
  MainContentWrapper,
  MainContentInner,
  MainContentInnerBody,
} from './ChartsHolder.style';
import LocationPageHeader from 'components/LocationPageHeader/LocationPageHeader';
import NoCountyDetail from './NoCountyDetail';
import ModelChart from 'components/Charts/ModelChart';

const ChartsHolder = (props: {
  projections: any; // make this be a type with
  stateId: string;
  countyId: string;
}) => {
  return (
    <>
      {props.projections && !props.projections.primary ? (
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
