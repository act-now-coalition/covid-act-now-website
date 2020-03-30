import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
// import CountyMap from 'components/CountyMap/CountyMap';
import Outcomes from './Outcomes/Outcomes';
import CallToAction from './CallToAction/CallToAction';
import ShareModelBlock from './ShareModelBlock/ShareModelBlock';
import StateHeader from 'components/StateHeader/StateHeader';
import ModelChart from 'components/Charts/ModelChart';
import Newsletter from 'components/Newsletter/Newsletter';
import { Wrapper, Content, LoadingScreen } from './ModelPage.style';
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
const shelterInPlaceWorseCaseColor =
  INTERVENTION_COLOR_MAP[INTERVENTIONS.SHELTER_IN_PLACE_WORST_CASE];

function ModelPage() {
  const { id: location } = useParams();
  const [countyView, setCountyView] = useState(false);
  const [county, setCounty] = useState(null);
  // const [modelDatas, setModelDatas] = useState(null);
  // const [interventions, setInterventions] = useState(null);
  let modelDatas = null;
  let interventions = null;
  const modelDatasMap = useModelDatas(location, county);

  const locationName = STATES[location];
  const intervention = STATE_TO_INTERVENTION[location];
  const showModel = !countyView || (countyView && county);

  const datasForView = countyView ? modelDatasMap.county : modelDatasMap.state;
  modelDatas = datasForView;
  interventions = buildInterventionMap(datasForView);

  // No model data
  if ((!countyView && !modelDatas) || (countyView && county && !modelDatas)) {
    return <LoadingScreen></LoadingScreen>;
  }

  return (
    <Wrapper>
      {showModel && interventions && (
        <StateHeader
          location={location}
          locationName={locationName}
          intervention={intervention}
          interventions={interventions}
        />
      )}
      {false && (
        <Panel>
          <input
            type="checkbox"
            checked={countyView}
            value={countyView}
            onClick={() => setCountyView(!countyView)}
          />{' '}
          Show County View
          {countyView && (
            <input
              type="text"
              value={county}
              onChange={e => setCounty({ county: e.target.value })}
            />
          )}
        </Panel>
      )}
      {showModel && interventions && (
        <Panel>
          <Content>
            <CallToAction
              currentIntervention={intervention}
              interventions={interventions}
            />
          </Content>

          <ModelChart
            state={locationName}
            county={county}
            subtitle="Hospitalizations over time"
            interventions={interventions}
            currentIntervention={intervention}
          />

          <Content>
            <ShareModelBlock location={location} />

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

            <ul style={{ textAlign: 'left', lineHeight: '2em' }}>
              <li style={{ listStyleType: 'none', marginBottom: 10 }}>
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

            <ShareModelBlock location={location} />
          </Content>
        </Panel>
      )}
      <Content>
        <div style={{ marginTop: '3rem' }}>
          <Newsletter />
        </div>
      </Content>
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
