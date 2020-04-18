import React from 'react';

import ModelChart from 'components/Charts/ModelChart';

import { EmbedChartContainer } from './Embed.style';

export default function ChartsTab({
  state,
  isCounty,
  interventions,
  currentIntervention,
}) {
  return (
    <EmbedChartContainer>
      <ModelChart
        condensed
        height={290}
        isCounty={isCounty}
        subtitle="Hospitalizations over time"
        interventions={interventions}
        currentIntervention={currentIntervention}
      />
    </EmbedChartContainer>
  );
}
