import React from 'react';
import Chart from './Chart';
import { ProjectionDataset } from 'models/Projection';

import { ChartContainer, Wrapper, ChartHeader } from './ChartModule.style';

const ChartModule = (props: {
  title: string;
  data: ProjectionDataset;
  height?: string;
  condensed?: boolean;
  forCompareModels?: boolean; // true when used by CompareInterventions.js component.
}) => {
  // GENERATE options with data here
  return (
    <>
      <ChartHeader>
        <h2>{props.title}</h2>
      </ChartHeader>
      <ChartContainer>
        <Wrapper>
          <Chart options={{}} />
        </Wrapper>
      </ChartContainer>
      {/* TODO(add in descriptions here) */}
    </>
  );
};

export default ChartModule;
