import React, { useState, useMemo } from 'react';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import US_STATE_DATASET from 'components/MapSelectors/datasets/us_states_dataset_01_02_2020';
import { MAP_FILTERS } from './Enums/MapFilterEnums';
import SearchHeader from 'components/Header/SearchHeader';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import MiniMap from 'components/MiniMap/MiniMap';
import ChartsHolder from 'components/ModelView/ChartsHolder';
import {
  Wrapper,
  ContentWrapper,
  SearchHeaderWrapper,
  LoadingScreen,
} from './ModelPage.style';
import { STATES, STATE_TO_INTERVENTION, INTERVENTIONS } from 'enums';
import { useProjections } from 'utils/model';

function ModelPage() {
  let { stateId, countyId } = useParams();
  // TODO(igor): don't mix uppercase and lowercase in here
  stateId = stateId.toUpperCase();

  const [mapOption, setMapOption] = useState(
    stateId === MAP_FILTERS.DC ? MAP_FILTERS.NATIONAL : MAP_FILTERS.STATE,
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  let countyOption = null;

  if (countyId) {
    countyOption = _.find(
      US_STATE_DATASET.state_county_map_dataset[stateId].county_dataset,
      ['county_url_name', countyId],
    );
  }
  const [selectedCounty, setSelectedCounty] = useState(countyOption);

  useMemo(() => {
    setSelectedCounty(countyOption);
  }, [countyOption]);

  const projections = useProjections(stateId, selectedCounty);

  const stateName = STATES[stateId];
  const intervention = STATE_TO_INTERVENTION[stateId];

  // Projections haven't loaded yet
  // If a new county has just been selected, we may not have projections
  // for the new county loaded yet
  if (!projections || projections.county !== selectedCounty) {
    return <LoadingScreen></LoadingScreen>;
  }

  let actionTitle;
  let actionDescription;
  if (intervention === INTERVENTIONS.SHELTER_IN_PLACE) {
    actionTitle = `${stateName}: Keep staying at home to protect against the COVID-19 outbreak.`;
    actionDescription = `Avoiding hospital overload depends heavily on your cooperation.`;
  } else {
    actionTitle = `${stateName}: Urge your public officials to act now against the COVID-19 outbreak!`;
    actionDescription = `To prevent hospital overload, our projections indicate a Stay at home order must be implemented soon.`;
  }

  return (
    <Wrapper>
      <AppMetaTags
        canonicalUrl={`/us/${stateId.toLowerCase()}`}
        pageTitle={`${stateName} Forecast`}
        pageDescription={actionTitle}
        shareTitle={actionTitle}
        shareDescription={actionDescription}
      />
      <ContentWrapper>
        <SearchHeaderWrapper>
          <SearchHeader
            setMapOption={setMapOption}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        </SearchHeaderWrapper>
        <ChartsHolder
          projections={projections}
          stateId={stateId}
          countyId={countyId}
        />
        <MiniMap
          projections={projections}
          stateId={stateId}
          selectedCounty={selectedCounty}
          setSelectedCounty={setSelectedCounty}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          mapOption={mapOption}
          setMapOption={setMapOption}
        />
      </ContentWrapper>
    </Wrapper>
  );
}

export default ModelPage;
