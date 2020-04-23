import React, { useState, useMemo } from 'react';
import _ from 'lodash';
import { useParams, useHistory } from 'react-router-dom';
import US_STATE_DATASET from 'components/MapSelectors/datasets/us_states_dataset_01_02_2020';
import CountyMap from 'components/CountyMap/CountyMap';
import { MAP_FILTERS } from './Enums/MapFilterEnums';
import Outcomes from './Outcomes/Outcomes';
import Map from 'components/Map/Map';
import ShareModelBlock from 'components/ShareBlock/ShareModelBlock';
import SearchHeader from 'components/Header/SearchHeader';
import LocationPageHeader from 'components/LocationPageHeader/LocationPageHeader';
import ChartModule from 'components/Charts/ChartModule';
import {
  MapMenuMobileWrapper,
  MapMenuItem,
} from 'components/Header/SearchHeader.style';
import Disclaimer from 'components/Charts/Disclaimer';

import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import {
  Wrapper,
  ContentWrapper,
  MainContentWrapper,
  MainContentInner,
  MainContentInnerBody,
  MapContentWrapper,
  MapContentInner,
  StyledNoResultsWrapper,
  StyledNoResults,
  Content,
  SearchHeaderWrapper,
  LoadingScreen,
  MapWrapper,
  CountyMapAltWrapper,
  ChartHeader,
} from './ModelPage.style';

import { STATES, STATE_TO_INTERVENTION, INTERVENTIONS } from 'enums';
import {
  useProjections,
  useStateSummary,
  useModelLastUpdatedDate,
} from 'utils/model';

function ModelPage_Phase3() {
  let { stateId, countyId } = useParams();
  // TODO(igor): don't mix uppercase and lowercase in here
  stateId = stateId.toUpperCase();

  const modelLastUpdatedDate = useModelLastUpdatedDate();
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
  const history = useHistory();

  const projections = useProjections(stateId, selectedCounty);
  const stateSummary = useStateSummary(stateId);

  const stateName = STATES[stateId];
  const intervention = STATE_TO_INTERVENTION[stateId];

  const goTo = route => {
    history.push(route);
  };

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
  let metaTags = (
    <AppMetaTags
      canonicalUrl={`/us/${stateId.toLowerCase()}`}
      pageTitle={`${stateName} Forecast`}
      pageDescription={actionTitle}
      shareTitle={actionTitle}
      shareDescription={actionDescription}
    />
  );

  const renderHeader = () => {
    return (
      <SearchHeaderWrapper>
        <SearchHeader
          setMapOption={setMapOption}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      </SearchHeaderWrapper>
    );
  };

  const renderMainContent = () => {
    return (
      <MainContentWrapper mobileMenuOpen={mobileMenuOpen}>
        <MainContentInner>
          <LocationPageHeader projections={projections} />
          <MainContentInnerBody>
            <Panel>
              <ChartHeader>
                <h2>[DEV] Projected hospitalizations</h2>
              </ChartHeader>
            </Panel>
            {projections && (
              <Panel>
                <ChartModule
                  series={["test"]}>
                    <Disclaimer 
                      modelLastUpdatedDate={modelLastUpdatedDate}
                      stateId={stateId}
                      county={selectedCounty}/>
                </ChartModule>              
              </Panel>
            )}
          </MainContentInnerBody>
        </MainContentInner>
      </MainContentWrapper>
    );
  };

  const renderMapContent = () => {
    return (
      <MapContentWrapper mobileMenuOpen={mobileMenuOpen}>
        <MapMenuMobileWrapper>
          <MapMenuItem
            onClick={() => setMapOption(MAP_FILTERS.NATIONAL)}
            selected={mapOption === MAP_FILTERS.NATIONAL}
          >
            United States
          </MapMenuItem>
          {stateId !== MAP_FILTERS.DC && (
            <MapMenuItem
              onClick={() => setMapOption(MAP_FILTERS.STATE)}
              selected={mapOption === MAP_FILTERS.STATE}
            >
              {stateName}
            </MapMenuItem>
          )}
        </MapMenuMobileWrapper>
        <MapContentInner>
          <MapWrapper visible={mapOption === MAP_FILTERS.NATIONAL}>
            <Map
              hideLegend={true}
              setMapOption={setMapOption}
              setMobileMenuOpen={setMobileMenuOpen}
            />
          </MapWrapper>

          {stateId !== MAP_FILTERS.DC && (
            <CountyMapAltWrapper visible={mapOption === MAP_FILTERS.STATE}>
              <CountyMap
                fill={
                  projections.primary
                    ? projections.getAlarmLevelColor()
                    : '#e3e3e3'
                }
                stateSummary={stateSummary}
                selectedCounty={selectedCounty}
                setSelectedCounty={fullFips => {
                  const county = _.find(
                    US_STATE_DATASET.state_county_map_dataset[stateId]
                      .county_dataset,
                    ['full_fips_code', fullFips],
                  );

                  goTo(
                    `/us/${stateId.toLowerCase()}/county/${
                      county.county_url_name
                    }`,
                  );
                  setMobileMenuOpen(false);
                  setSelectedCounty(county);
                }}
              />
            </CountyMapAltWrapper>
          )}
        </MapContentInner>
      </MapContentWrapper>
    );
  };

  return (
    <Wrapper>
      {metaTags}
      <ContentWrapper>
        {renderHeader()}
        {projections && !projections.primary ? (
          <div>
            <StyledNoResultsWrapper>
              <StyledNoResults>
                <div>
                  We either weren't able to get data for {selectedCounty.county}
                  , {selectedCounty.state_code}, or no cases have yet been
                  confirmed.
                </div>
                <div>
                  We’re unable to produce our model for this county until we
                  have data. Check back soon.
                </div>
                <div style={{ marginTop: '1rem' }}>
                  View projections for{' '}
                  <span onClick={() => goTo('/us/' + stateId.toLowerCase())}>
                    {stateName}
                  </span>
                </div>
              </StyledNoResults>
            </StyledNoResultsWrapper>
            {renderMapContent()}
          </div>
        ) : (
          [renderMainContent(), renderMapContent()]
        )}
      </ContentWrapper>
    </Wrapper>
  );
}

const Panel = ({ children, title }) => {
  return <div style={{}}>{children}</div>;
};

export default ModelPage_Phase3;
