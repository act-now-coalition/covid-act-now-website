import React from 'react';

import ModelChart from 'components/Charts/ModelChart';

import { EmbedChartContainer } from './Embed.style';

export default function ChartsTab({ projections }) {
  return (
    <EmbedChartContainer>
      <ModelChart
        condensed
        height={290}
        subtitle="Hospitalizations over time"
        projections={projections}
      />
    </EmbedChartContainer>
  );
}
