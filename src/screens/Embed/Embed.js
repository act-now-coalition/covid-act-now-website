import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { STATES, STATE_TO_INTERVENTION } from 'enums';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import '../../App.css'; /* optional for styling like the :hover pseudo-class */
import StateHeader from '../../components/StateHeader/StateHeader';

import { buildInterventionMap } from '../../screens/ModelPage/ModelPage';
import { useModelDatas } from 'utils/model';

import {
  EmbedContainer,
  EmbedGlobalStyle,
  EmbedHeaderContainer,
} from './Embed.style';

import ProjectionsTab from './ProjectionsTab';
import ChartsTab from './ChartsTab';
import EmbedFooter from './EmbedFooter';

export default function Embed() {
  const { id: location } = useParams();

  const [tabState, setTabState] = useState(0);
  const handleTabChange = (_event, newTabValue) => setTabState(newTabValue);

  const modelDatasMap = useModelDatas(location, null);

  const locationName = STATES[location];
  const intervention = STATE_TO_INTERVENTION[location];
  const interventions = buildInterventionMap(modelDatasMap.stateDatas);

  if (!modelDatasMap || !modelDatasMap.stateDatas) {
    return null;
  }

  const baseline = interventions.baseline;
  const { deaths } = baseline;
  console.log({ baseline, deaths });

  return (
    <EmbedContainer elevation="2">
      <EmbedHeaderContainer>
        <StateHeader
          location={location}
          locationName={locationName}
          intervention={intervention}
          interventions={interventions}
        />
        <Tabs value={tabState} variant="fullWidth" onChange={handleTabChange}>
          <Tab label="Projections" />
          <Tab label="Charts" />
        </Tabs>
      </EmbedHeaderContainer>
      {tabState === 0 ? (
        <ProjectionsTab intervention={intervention} />
      ) : (
        <ChartsTab
          state={STATES[location]}
          county={null}
          interventions={interventions}
          currentIntervention={intervention}
        />
      )}
      <EmbedFooter />
      <EmbedGlobalStyle />
    </EmbedContainer>
  );
}

function LoadingState() {}
