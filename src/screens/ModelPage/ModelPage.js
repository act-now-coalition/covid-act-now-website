import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import US_STATE_DATASET from 'components/MapSelectors/datasets/us_states_dataset_01_02_2020';
import CountyMap from 'components/CountyMap/CountyMap';
import Outcomes from './Outcomes/Outcomes';
import CallToAction from './CallToAction/CallToAction';
import ShareModelBlock from './ShareModelBlock/ShareModelBlock';
import StateHeader from 'components/StateHeader/StateHeader';
import ModelChart from 'components/Charts/ModelChart';
import Newsletter from 'components/Newsletter/Newsletter';
import CountySelector from 'components/MapSelectors/CountySelector';
import {
  Wrapper,
  Content,
  ModelViewOption,
  ModelViewToggle,
  CountySelectorWrapper,
  StyledCountySelectorWrapper,
  LoadingScreen,
  NoData,
  MapIconButton,
  CountyMapWrapper,
  ChartHeader,
} from './ModelPage.style';
import { MapTitle, MapTitleDivider } from 'screens/HomePage/HomePage.style';
import {
  STATES,
  STATE_TO_INTERVENTION,
  INTERVENTION_COLOR_MAP,
  INTERVENTIONS,
  SHELTER_IN_PLACE_WORST_CASE_COLOR,
} from 'enums';
import { useModelDatas, Model } from 'utils/model';
import _ from 'lodash';
import MapIcon from 'assets/images/mapIcon';

const limitedActionColor = INTERVENTION_COLOR_MAP[INTERVENTIONS.LIMITED_ACTION];
const socialDistancingColor =
  INTERVENTION_COLOR_MAP[INTERVENTIONS.SOCIAL_DISTANCING];
const shelterInPlaceColor =
  INTERVENTION_COLOR_MAP[INTERVENTIONS.SHELTER_IN_PLACE];
const lockdownColor = INTERVENTION_COLOR_MAP[INTERVENTIONS.LOCKDOWN];
const shelterInPlaceWorseCaseColor =
  INTERVENTION_COLOR_MAP[INTERVENTIONS.SHELTER_IN_PLACE_WORST_CASE];

function ModelPage() {
  const { id: location, countyId } = useParams();
  const [countyView, setCountyView] = useState(countyId ? true : false);
  // const [countyView, setCountyView] = useState(true);
  const [showCountyMap, setShowCountyMap] = useState(false);
  let countyOption = null;
  if (countyId) {
    countyOption = _.find(
      US_STATE_DATASET.state_county_map_dataset[location].county_dataset,
      ['county_url_name', countyId],
    );
  }
  const [selectedCounty, setSelectedCounty] = useState(countyOption);
  const [redirectTarget, setRedirectTarget] = useState();
  const history = useHistory();

  let modelDatas = null;
  const modelDatasMap = useModelDatas(location, selectedCounty);
  console.log('modelDatasMap', modelDatasMap, selectedCounty);

  const locationName = STATES[location];
  const countyName = selectedCounty ? selectedCounty.county : null;

  const intervention = STATE_TO_INTERVENTION[location];
  const datasForView = countyView
    ? modelDatasMap.countyDatas
    : modelDatasMap.stateDatas;

  modelDatas = datasForView;

  const showModel =
    !countyView ||
    (countyView && selectedCounty && modelDatas && !modelDatas.error);

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

  // No model data
  if (
    (!countyView && !modelDatas) ||
    (countyView && selectedCounty && !modelDatas)
  ) {
    return <LoadingScreen></LoadingScreen>;
  }

  const shouldShowCountyMap =
    showCountyMap || // The map was explicitly toggled on
    (modelDatas && modelDatas.error) || // There are no results for a county
    !modelDatas; // There are no results for a county

  const shouldShowMapButton =
    selectedCounty && // There is a currently selected county
    modelDatas && // We have model data to toggle back to
    !modelDatas.error; // That model data does not contain an error

  return (
    <Wrapper>
      {stateInterventions && (
        <StateHeader
          location={location}
          locationName={locationName}
          countyName={countyName}
          intervention={intervention}
          interventions={stateInterventions}
        />
      )}
      <Content>
        <Panel>
          <ChartHeader>
            <h2>Projected hospitalizations</h2>
            <span>
              {countyName ? `${countyName}, ${locationName}` : locationName}
            </span>
          </ChartHeader>
          <CountySelectorWrapper>
            <ModelViewToggle>
              <ModelViewOption
                selected={!countyView}
                onClick={() => {
                  setRedirectTarget(`/state/${location}`);
                  setCountyView(false);
                  setSelectedCounty(null);
                  setShowCountyMap(false);
                }}
              >
                Entire State
              </ModelViewOption>
              <ModelViewOption
                selected={countyView}
                onClick={() => {
                  setCountyView(true);
                  if (!selectedCounty) {
                    setShowCountyMap(true);
                  }
                }}
              >
                By County
              </ModelViewOption>
            </ModelViewToggle>
            {countyView && (
              <div>
                <StyledCountySelectorWrapper>
                  <div style={{ flexGrow: 1 }}>
                    <CountySelector
                      state={location}
                      selectedCounty={selectedCounty}
                      handleChange={option => {
                        if (!option || !option.county_url_name) {
                          return;
                        }
                        setRedirectTarget(
                          `/state/${location}/county/${option.county_url_name}`,
                        );
                        setSelectedCounty(option);
                        setShowCountyMap(false);
                      }}
                      autoFocus
                    />
                  </div>
                  {shouldShowMapButton && (
                    <MapIconButton
                      showCountyMap={showCountyMap}
                      onClick={() => setShowCountyMap(!showCountyMap)}
                    >
                      <MapIcon />
                    </MapIconButton>
                  )}
                </StyledCountySelectorWrapper>
                {countyName && modelDatas && modelDatas.error && (
                  <NoData>
                    No data available for {countyName}, {locationName}
                  </NoData>
                )}
                {shouldShowCountyMap && (
                  <>
                    {!selectedCounty && (
                      <MapTitle>
                        <MapTitleDivider>
                          <div></div>
                          <span>Or</span>
                          <div></div>
                        </MapTitleDivider>
                        <p>
                          Select your county below to see detailed projections
                        </p>
                      </MapTitle>
                    )}
                    <CountyMapWrapper>
                      <CountyMap
                        fill={INTERVENTION_COLOR_MAP[intervention]}
                        stateSummary={modelDatasMap && modelDatasMap.summary}
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
                          setShowCountyMap(false);
                          setSelectedCounty(county);
                        }}
                      />
                    </CountyMapWrapper>
                  </>
                )}
              </div>
            )}
          </CountySelectorWrapper>
        </Panel>
      </Content>
      {!shouldShowCountyMap && showModel && interventions && (
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
                  ? shelterInPlaceWorseCaseColor
                  : socialDistancingColor,
                shelterInPlaceColor,
                lockdownColor,
              ]}
              asterisk={['', '*', '*', '**']}
              timeHorizon={100}
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
                  A second spike in disease may occur after social distancing is
                  stopped.
                </b>{' '}
                Interventions are important because they buy time to create
                surge capacity in hospitals and develop therapeutic drugs that
                may have potential to lower hospitalization and fatality rates
                from COVID-19.{' '}
                <a href="https://docs.google.com/document/d/1ETeXAfYOvArfLvlxExE0_xrO5M4ITC0_Am38CRusCko/edit#heading=h.vyhw42b7pgoj">
                  See full scenario definitions here.
                </a>
              </li>
              <li style={{ listStyleType: 'none' }}>
                ** Our models show that it would take at least 2 months of
                Wuhan-style Lockdown to achieve full containment. However, it is
                unclear at this time how you could manage newly introduced
                infections.{' '}
                <a href="https://docs.google.com/document/d/1ETeXAfYOvArfLvlxExE0_xrO5M4ITC0_Am38CRusCko/edit#heading=h.vyhw42b7pgoj">
                  See full scenario definitions here.
                </a>
              </li>
            </ul>

            <ShareModelBlock location={location} county={selectedCounty} />
          </Content>
          <Content>
            <div style={{ marginTop: '3rem' }}>
              <Newsletter />
            </div>
          </Content>
        </Panel>
      )}
    </Wrapper>
  );
}

const buildInterventionMap = modelDatas => {
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
