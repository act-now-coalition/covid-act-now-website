import React from 'react';

import ModelChart from 'components/Charts/ModelChart';

import { EmbedChartContainer } from './Embed.style';

export default function ChartsTab({
  state,
  county,
  interventions,
  currentIntervention,
}) {
  return (
    <EmbedChartContainer>
      <ModelChart
        condensed
        state={state}
        height={300}
        county={county}
        subtitle="Hospitalizations over time"
        interventions={interventions}
        currentIntervention={currentIntervention}
      />
    </EmbedChartContainer>
  );
}
