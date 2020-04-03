import React, { useState, useEffect } from 'react';
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
  const { id: _location } = useParams();
  const location = _location.toUpperCase();

  const [summaryData, setSummaryData] = useState(null);
  const [tabState, setTabState] = useState(0);
  const [shareDrawerOpen, setShareDrawerOpen] = useState(false);
  const handleTabChange = (_event, newTabValue) => setTabState(newTabValue);

  const modelDatasMap = useModelDatas(location, null);

  const locationName = STATES[location];
  const intervention = STATE_TO_INTERVENTION[location];
  const interventions = buildInterventionMap(modelDatasMap.stateDatas);

  useEffect(() => {
    console.log(`/data/${location}.summary.json`);
    fetch(`/data/case_summary/${location}.summary.json`)
      .then(data => data.json())
      .then(setSummaryData)
      .catch(err => {
        throw err;
      });
  }, [location]);

  if (!modelDatasMap || !modelDatasMap.stateDatas || !summaryData) {
    return null;
  }

  const { cases, deaths } = summaryData;

  const baseline = interventions.baseline;
  const totalPopulation = baseline.totalPopulation;
  const populationPercentage =
    Number.parseFloat(deaths / totalPopulation).toPrecision(2) * 100;

  const deathsPercentage =
    Number.parseFloat(deaths / cases).toPrecision(2) * 100;

  return (
    <EmbedContainer elevation="2">
      <EmbedHeaderContainer>
        <StateHeader
          location={location}
          locationName={locationName}
          intervention={intervention}
          interventions={interventions}
        />
        {/* Remove this break once tabs are back */}
        <br />
        {/* <Tabs value={tabState} variant="fullWidth" onChange={handleTabChange}>
          <Tab label="Projections" />
          <Tab label="Charts" />
        </Tabs> */}
      </EmbedHeaderContainer>
      {tabState === 0 ? (
        <ProjectionsTab
          cases={cases}
          deaths={deaths}
          intervention={intervention}
          totalPopulation={totalPopulation}
          deathsPercentage={deathsPercentage}
          populationPercentage={populationPercentage}
        />
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
// TODO
function LoadingState() {}
