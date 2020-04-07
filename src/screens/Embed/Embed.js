import _ from 'lodash';
import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { STATES, STATE_TO_INTERVENTION } from 'enums';
import US_STATE_DATASET from 'components/MapSelectors/datasets/us_states_dataset_01_02_2020';
import '../../App.css'; /* optional for styling like the :hover pseudo-class */
import StateHeader from '../../components/StateHeader/StateHeader';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';

import { useModelDatas, useStateSummaryData } from 'utils/model';

import {
  EmbedContainer,
  EmbedGlobalStyle,
  EmbedHeaderContainer,
} from './Embed.style';

import ProjectionsTab from './ProjectionsTab';
import ChartsTab from './ChartsTab';
import EmbedFooter from './EmbedFooter';

export default function Embed() {
  const { id: _location, countyId, countyFipsId } = useParams();

  const [tabState /*, setTabState */] = useState(0);
  // const [shareDrawerOpen, setShareDrawerOpen] = useState(false);
  // const handleTabChange = (_event, newTabValue) => setTabState(newTabValue);

  const [selectedCounty, setSelectedCounty] = useState(null);
  const [location, setLocation] = useState(null);
  const [missingCounty, setMissingCounty] = useState(false);
  useMemo(() => {
    let state = null,
      county = null;
    if (countyFipsId) {
      county = findCountyByFips(countyFipsId);
      state = county?.state_code;
    } else {
      state = _location.toUpperCase();
      if (countyId) {
        county = _.find(
          US_STATE_DATASET.state_county_map_dataset[state].county_dataset,
          ['county_url_name', countyId],
        );
      }
    }

    setLocation(state);
    if (county === undefined) {
      setMissingCounty(true);
    } else {
      setSelectedCounty(county);
    }
  }, [_location, countyId, countyFipsId]);

  const modelDatasMap = useModelDatas(location, selectedCounty);

  const locationName = STATES[location];
  const intervention = STATE_TO_INTERVENTION[location];

  const datasForView = selectedCounty
    ? modelDatasMap.countyDatas
    : modelDatasMap.stateDatas;
  let interventions = null;
  if (datasForView && !datasForView.error) {
    interventions = datasForView.projections;
  }

  const stateSummaryData = useStateSummaryData(location);

  let summaryData = stateSummaryData;
  if (stateSummaryData && selectedCounty) {
    summaryData = _.find(summaryData.counties, [
      'fips',
      selectedCounty.full_fips_code,
    ]);
    if (!summaryData) {
      setMissingCounty(true);
    }
  }

  if (missingCounty || modelDatasMap?.countyDatas?.error) {
    return <span>'No data available for county.'</span>;
  }

  if (!interventions || !summaryData) {
    return null;
  }

  const { cases, deaths } = summaryData;

  const baseline = interventions.baseline;
  const totalPopulation = baseline.totalPopulation;
  const populationPercentage =
    Number.parseFloat(deaths / totalPopulation).toPrecision(2) * 100;

  const deathsPercentage = Number.parseFloat(
    (deaths / cases) * 100,
  ).toPrecision(2);

  return (
    <EmbedContainer elevation="2">
      <EmbedHeaderContainer>
        <StateHeader
          location={location}
          locationName={locationName}
          countyName={selectedCounty?.county}
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

function findCountyByFips(fips) {
  // NYC HACK.
  if (['36047', '36061', '36005', '36081', '36085'].includes(fips)) {
    fips = '36061';
  }

  const statesData = US_STATE_DATASET.state_county_map_dataset;
  for (const state in statesData) {
    const countiesData = statesData[state].county_dataset;
    for (const county of countiesData) {
      if (String(county.full_fips_code) === String(fips)) {
        return county;
      }
    }
  }
  return undefined;
}
