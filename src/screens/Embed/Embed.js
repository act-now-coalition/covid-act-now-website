import React from 'react';
import { useParams } from 'react-router-dom';
import { STATES, STATE_TO_INTERVENTION } from 'enums';
import '../../App.css'; /* optional for styling like the :hover pseudo-class */
import StateHeader from '../../components/StateHeader/StateHeader';
import CallToAction from '../../screens/ModelPage/CallToAction/CallToAction';

import { buildInterventionMap } from '../../screens/ModelPage/ModelPage';
import { useModelDatas } from 'utils/model';

import {
  EmbedContainer,
  EmbedHeaderContainer,
  EmbedContentContainer,
  EmbedGlobalStyle,
} from './Embed.style';

export default function Embed() {
  const { id: location } = useParams();

  const modelDatasMap = useModelDatas(location, null);

  const locationName = STATES[location];
  const intervention = STATE_TO_INTERVENTION[location];
  const interventions = buildInterventionMap(modelDatasMap.state);

  if (!modelDatasMap || !modelDatasMap.state) {
    return null;
  }

  return (
    <EmbedContainer elevation="2">
      <EmbedHeaderContainer>
        <StateHeader
          location={location}
          locationName={locationName}
          intervention={intervention}
          interventions={interventions}
        />
      </EmbedHeaderContainer>
      <EmbedContentContainer>
        <CallToAction
          interventions={interventions}
          currentIntervention={intervention}
        />
      </EmbedContentContainer>
      <EmbedGlobalStyle />
    </EmbedContainer>
  );
}
