import React, { useState, useMemo } from 'react';
import _ from 'lodash';
import { Helmet } from 'react-helmet';
import { useParams, useHistory } from 'react-router-dom';
import US_STATE_DATASET from 'components/MapSelectors/datasets/us_states_dataset_01_02_2020';
import CountyMap from 'components/CountyMap/CountyMap';
import Outcomes from './Outcomes/Outcomes';
import CallToAction from './CallToAction/CallToAction';
import Map from 'components/Map/Map';
import ShareModelBlock from './ShareModelBlock/ShareModelBlock';
import SearchHeader from 'components/Header/SearchHeader';
import StateHeader from 'components/StateHeader/StateHeader';
import ModelChart from 'components/Charts/ModelChart';
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
  CountyMapAltWrapper,
  ChartHeader,
} from './ModelPage.style';
import {
  STATES,
  STATE_TO_INTERVENTION,
  INTERVENTION_COLOR_MAP,
  INTERVENTIONS,
} from 'enums';
import { useModelDatas, Model } from 'utils/model';

const limitedActionColor = INTERVENTION_COLOR_MAP[INTERVENTIONS.LIMITED_ACTION];
const socialDistancingColor =
  INTERVENTION_COLOR_MAP[INTERVENTIONS.SOCIAL_DISTANCING];
const shelterInPlaceColor =
  INTERVENTION_COLOR_MAP[INTERVENTIONS.SHELTER_IN_PLACE];
const lockdownColor = INTERVENTION_COLOR_MAP[INTERVENTIONS.LOCKDOWN];
const shelterInPlaceWorstCaseColor =
  INTERVENTION_COLOR_MAP[INTERVENTIONS.SHELTER_IN_PLACE_WORST_CASE];

function ModelPage() {
  const [mapOption, setMapOption] = useState('STATE');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { id: location, countyId } = useParams();

  let countyOption = null;
  if (countyId) {
    countyOption = _.find(
      US_STATE_DATASET.state_county_map_dataset[location].county_dataset,
      ['county_url_name', countyId],
    );
  }

  const [selectedCounty, setSelectedCounty] = useState(countyOption);
  useMemo(() => {
    setSelectedCounty(countyOption);
  }, [countyOption]);
  const [redirectTarget, setRedirectTarget] = useState();
  const history = useHistory();

  let modelDatas = null;
  const modelDatasMap = useModelDatas(location, selectedCounty);
  console.log('modelDatasMap', modelDatasMap, selectedCounty);

  const locationName = STATES[location];
  let countyName = selectedCounty ? selectedCounty.county : null;

  const intervention = STATE_TO_INTERVENTION[location];
  const datasForView = selectedCounty
    ? modelDatasMap.countyDatas
    : modelDatasMap.stateDatas;

  modelDatas = datasForView;

  const showModel =
    !selectedCounty || (selectedCounty && modelDatas && !modelDatas.error);

  let interventions = null;
  if (modelDatas && !modelDatas.error) {
    interventions = buildInterventionMap(datasForView);
  }

  let stateInterventions = null;
  if (modelDatasMap.stateDatas) {
    stateInterventions = buildInterventionMap(modelDatasMap.stateDatas);
  }

  if (redirectTarget) {
    const goToLocation = redirectTarget;
    setRedirectTarget(null);
    history.push(goToLocation);
  }

  const goTo = (route) => {
    history.push(route);
  };

  // No model data
  if (
    (!selectedCounty && !modelDatas) ||
    (selectedCounty && selectedCounty && !modelDatas)
  ) {
    return <LoadingScreen></LoadingScreen>;
  }

  let title;
  let description;
  const canonical = `/state/${location}`;
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
          mapOption={mapOption}
          setMapOption={setMapOption}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          location={location}
          locationName={locationName}
          countyName={location}
        />
      </SearchHeaderWrapper>
    );
  };

  const renderMainContent = () => {
    if (
      locationName == 'New York' &&
      [
        'Kings County',
        'Queens County',
        'Bronx County',
        'Richmond County',
      ].indexOf(countyName) > -1
    ) {
      countyName = 'New York';
    }

    return (
      <MainContentWrapper mobileMenuOpen={mobileMenuOpen}>
        <MainContentInner>
          {stateInterventions && (
            <StateHeader
              location={location}
              locationName={locationName}
              countyName={countyName}
              intervention={intervention}
              interventions={stateInterventions}
            />
          )}
          <MainContentInnerBody>
            <Panel>
              <ChartHeader>
                <h2>Projected hospitalizations</h2>
                <span>
                  {countyName ? `${countyName}, ${locationName}` : locationName}
                </span>
              </ChartHeader>
            </Panel>
            {showModel && interventions && (
              <Panel>
                <ModelChart
                  state={locationName}
                  countyName={countyName}
                  subtitle="Hospitalizations over time"
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
                      interventions.contain.now,
                    ]}
                    colors={[
                      limitedActionColor,
                      intervention === INTERVENTIONS.SHELTER_IN_PLACE
                        ? shelterInPlaceWorstCaseColor
                        : socialDistancingColor,
                      shelterInPlaceColor,
                      lockdownColor,
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
                      <a href="https://docs.google.com/document/d/1ETeXAfYOvArfLvlxExE0_xrO5M4ITC0_Am38CRusCko/edit#heading=h.vyhw42b7pgoj">
                        See full scenario definitions here.
                      </a>
                    </li>
                    <li style={{ listStyleType: 'none' }}>
                      ** Our models show that it would take at least 2 months of
                      Wuhan-style Lockdown to achieve full containment. However,
                      it is unclear at this time how you could manage newly
                      introduced infections.{' '}
                      <a href="https://docs.google.com/document/d/1ETeXAfYOvArfLvlxExE0_xrO5M4ITC0_Am38CRusCko/edit#heading=h.vyhw42b7pgoj">
                        See full scenario definitions here.
                      </a>
                    </li>
                  </ul>

                  <ShareModelBlock
                    location={location}
                    county={selectedCounty}
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
            onClick={() => setMapOption('NATIONAL')}
            selected={mapOption === 'NATIONAL'}
          >
            United States
          </MapMenuItem>
          <MapMenuItem
            onClick={() => setMapOption('STATE')}
            selected={mapOption === 'STATE'}
          >
            {locationName}
          </MapMenuItem>
        </MapMenuMobileWrapper>
        <MapContentInner>
          {mapOption === 'NATIONAL' && (
            <Map hideLegend={true} setMobileMenuOpen={setMobileMenuOpen} />
          )}

          {mapOption === 'STATE' && (
            <CountyMapAltWrapper>
              <CountyMap
                fill={INTERVENTION_COLOR_MAP[intervention]}
                stateSummary={modelDatasMap.summary}
                selectedCounty={selectedCounty}
                setSelectedCounty={fullFips => {
                  const county = _.find(
                    US_STATE_DATASET.state_county_map_dataset[location]
                      .county_dataset,
                    ['full_fips_code', fullFips],
                  );

                  setRedirectTarget(
                    `/state/${location}/county/${county.county_url_name}`,
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
                  <a onClick={() => goTo('/state/' + location)}>
                    {locationName}
                  </a>
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

// Exported for use by CompareModels screen, so it can generate identical charts.
export const buildInterventionMap = modelDatas => {
  let interventions = {
    baseline: null,
    distancing: null,
    distancingPoorEnforcement: null,
    contain: null,
  };

  if (!modelDatas) {
    return interventions;
  }

  // Initialize models
  interventions.baseline = new Model(modelDatas.baseline, {
    intervention: INTERVENTIONS.LIMITED_ACTION,
    r0: 2.4,
  });
  interventions.distancing = {
    now: new Model(modelDatas.strictDistancingNow, {
      intervention: INTERVENTIONS.SHELTER_IN_PLACE,
      durationDays: 90,
      r0: 1.2,
    }),
  };
  interventions.distancingPoorEnforcement = {
    now: new Model(modelDatas.weakDistancingNow, {
      intervention: INTERVENTIONS.SOCIAL_DISTANCING,
      durationDays: 90,
      r0: 1.7,
    }),
  };
  interventions.contain = {
    now: new Model(modelDatas.containNow, {
      intervention: INTERVENTIONS.LOCKDOWN,
      durationDays: 90,
      r0: 0.3,
    }),
  };

  return interventions;
};

const Panel = ({ children, title }) => {
  return <div style={{}}>{children}</div>;
};

export default ModelPage;
