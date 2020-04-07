import React, { useState, useMemo } from 'react';
import _ from 'lodash';
import { Helmet } from 'react-helmet';
import { useParams, useHistory } from 'react-router-dom';
import US_STATE_DATASET from 'components/MapSelectors/datasets/us_states_dataset_01_02_2020';
import CountyMap from 'components/CountyMap/CountyMap';
import { MAP_FILTERS } from './Enums/MapFilterEnums';
import Outcomes from './Outcomes/Outcomes';
import CallToAction from './CallToAction/CallToAction';
import Map from 'components/Map/Map';
import ShareModelBlock from './ShareModelBlock/ShareModelBlock';
import SearchHeader from 'components/Header/SearchHeader';
import StateHeader from 'components/StateHeader/StateHeader';
import ModelChart from 'components/Charts/ModelChart';
import Newsletter from 'components/Newsletter/Newsletter';
import {
  MapMenuMobileWrapper,
  MapMenuItem,
} from 'components/Header/SearchHeader.style';

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
import { useModelDatas } from 'utils/model';
import { useEmbed } from 'utils/hooks';

function ModelPage() {
  const { id: location, countyId } = useParams();
  const _location = location.toUpperCase();
  const { iFrameCodeSnippet } = useEmbed();

  const [mapOption, setMapOption] = useState(
    _location === MAP_FILTERS.DC ? MAP_FILTERS.NATIONAL : MAP_FILTERS.STATE,
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  let countyOption = null;
  if (countyId) {
    countyOption = _.find(
      US_STATE_DATASET.state_county_map_dataset[_location].county_dataset,
      ['county_url_name', countyId],
    );
  }

  const [selectedCounty, setSelectedCounty] = useState(countyOption);
  useMemo(() => {
    setSelectedCounty(countyOption);
  }, [countyOption]);
  const history = useHistory();

  let modelDatas = null;
  const modelDatasMap = useModelDatas(_location, selectedCounty);

  const locationName = STATES[_location];
  let countyName = selectedCounty ? selectedCounty.county : null;

  const intervention = STATE_TO_INTERVENTION[_location];

  modelDatas = selectedCounty
    ? modelDatasMap.countyDatas
    : modelDatasMap.stateDatas;

  let interventions = null;
  if (modelDatas && !modelDatas.error) {
    interventions = modelDatas.projections;
  }

  const goTo = route => {
    history.push(route);
  };

  // No model data
  if (!modelDatas) {
    return <LoadingScreen></LoadingScreen>;
  }

  let title;
  let description;
  const canonical = `/us/${_location.toLowerCase()}`;
  if (intervention === INTERVENTIONS.SHELTER_IN_PLACE) {
    title = `Keep staying at home in ${locationName}.`;
    description = `Avoiding hospital overload depends heavily on your cooperation.`;
  } else {
    title = `You must act now in ${locationName}!`;
    description = `To prevent hospital overload, our projections indicate a Stay at home order must be implemented soon.`;
  }

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
          <StateHeader interventions={interventions} />
          <MainContentInnerBody>
            <Panel>
              <ChartHeader>
                <h2>Projected hospitalizations</h2>
                <span>
                  {interventions.countyName
                    ? `${interventions.countyName}, ${interventions.stateName}`
                    : interventions.stateName}
                </span>
              </ChartHeader>
            </Panel>
            {interventions && (
              <Panel>
                <ModelChart
                  countyName={countyName}
                  interventions={interventions}
                  currentIntervention={intervention}
                  dateOverwhelmed={interventions.baseline.dateOverwhelmed}
                />
                <Content>
                  <CallToAction
                    interventions={interventions}
                    currentIntervention={intervention}
                  />
                  <Outcomes
                    title="Predicted Outcomes after 3 Months"
                    models={[
                      interventions.baseline,
                      interventions.distancingPoorEnforcement.now,
                      interventions.distancing.now,
                    ]}
                    colors={[
                      interventions.getSeriesColorForLimitedAction(),
                      interventions.getSeriesColorForSocialDistancing(),
                      interventions.getSeriesColorForShelterInPlace(),
                    ]}
                    asterisk={['', '*', '*', '**']}
                    timeHorizon={120}
                    currentIntervention={intervention}
                  />
                  <ul
                    style={{
                      textAlign: 'left',
                      lineHeight: '2em',
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
                    <li style={{ listStyleType: 'none' }}>
                      ** Our models show that it would take at least 2 months of
                      Wuhan-style Lockdown to achieve full containment. However,
                      it is unclear at this time how you could manage newly
                      introduced infections.{' '}
                      <a
                        href="https://data.covidactnow.org/Covid_Act_Now_Model_References_and_Assumptions.pdf"
                        rel="noreferrer noopener"
                      >
                        See full scenario definitions here.
                      </a>
                    </li>
                  </ul>

                  <ShareModelBlock
                    location={_location}
                    county={selectedCounty}
                    embedSnippet={iFrameCodeSnippet}
                  />
                  <Newsletter
                    county={countyName}
                    stateAbbr={location}
                    stateFull={locationName}
                  />
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
          {_location !== MAP_FILTERS.DC && (
            <MapMenuItem
              onClick={() => setMapOption(MAP_FILTERS.STATE)}
              selected={mapOption === MAP_FILTERS.STATE}
            >
              {locationName}
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

          {_location !== MAP_FILTERS.DC && (
            <CountyMapAltWrapper visible={mapOption === MAP_FILTERS.STATE}>
              <CountyMap
                fill={
                  interventions
                    ? interventions.getInterventionColor()
                    : '#e3e3e3'
                }
                stateSummary={modelDatasMap.summary}
                selectedCounty={selectedCounty}
                setSelectedCounty={fullFips => {
                  const county = _.find(
                    US_STATE_DATASET.state_county_map_dataset[_location]
                      .county_dataset,
                    ['full_fips_code', fullFips],
                  );

                  goTo(
                    `/us/${_location.toLowerCase()}/county/${
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
      <Helmet>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="twitter:title" content={title} />
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta name="twitter:description" content={description} />
        <meta property="og:description" content={description} />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <ContentWrapper>
        {renderHeader()}
        {modelDatas && modelDatas.error ? (
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
                  <span onClick={() => goTo('/us/' + _location.toLowerCase())}>
                    {locationName}
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
