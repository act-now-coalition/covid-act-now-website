import React from 'react';

import ModelChart from 'components/Charts/ModelChart';

import { EmbedChartContainer } from './Embed.style';

export default function ChartsTab({ interventions, currentIntervention }) {
  return (
    <EmbedChartContainer>
      <ModelChart
        condensed
        height={290}
        subtitle="Hospitalizations over time"
        interventions={interventions}
        currentIntervention={currentIntervention}
      />
    </EmbedChartContainer>
  );
}
