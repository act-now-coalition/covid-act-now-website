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
import ModelChart from 'components/Charts/ModelChart';
import {
  MapMenuMobileWrapper,
  MapMenuItem,
} from 'components/Header/SearchHeader.style';

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

function ModelPage() {
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

  // No projections
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
                <h2>Projected hospitalizations</h2>
                <span>
                  {projections.countyName
                    ? `${projections.countyName}, ${projections.stateName}`
                    : projections.stateName}
                </span>
              </ChartHeader>
            </Panel>
            {projections && (
              <Panel>
                <ModelChart
                  projections={projections}
                  currentIntervention={intervention}
                  lastUpdatedDate={modelLastUpdatedDate}
                  dateOverwhelmed={projections.baseline.dateOverwhelmed}
                  stateId={stateId}
                  selectedCounty={selectedCounty}
                />
                <Content>
                  <Outcomes
                    title="Predicted Outcomes"
                    models={[projections.baseline, projections.primary]}
                    colors={[
                      projections.getSeriesColorForLimitedAction(),
                      projections.getSeriesColorForPrimary(),
                    ]}
                    asterisk={['', '*', '*', '**']}
                    timeHorizon={120}
                    currentIntervention={intervention}
                  />
                  <ul
                    style={{
                      textAlign: 'left',
                      lineHeight: '2em',
                      paddingLeft: 0,
                    }}
                  >
                    <li
                      style={{
                        listStyleType: 'none',
                        marginBottom: 10,
                      }}
                    >
                      *{' '}
                      <b>
                        A second spike in disease may occur after social
                        distancing is stopped.
                      </b>{' '}
                      Interventions are important because they buy time to
                      create surge capacity in hospitals and develop therapeutic
                      drugs that may have potential to lower hospitalization and
                      fatality rates from COVID.{' '}
                      <a
                        href="https://data.covidactnow.org/Covid_Act_Now_Model_References_and_Assumptions.pdf"
                        rel="noreferrer noopener"
                      >
                        See full scenario definitions here.
                      </a>
                    </li>
                  </ul>

                  <ShareModelBlock stateId={stateId} county={selectedCounty} />
                </Content>
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

export default ModelPage;
