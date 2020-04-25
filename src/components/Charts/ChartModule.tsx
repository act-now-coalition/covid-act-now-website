import React from 'react';
import Chart from './Chart';

import { ChartContainer, Wrapper, ChartHeader } from './ChartModule.style';

const ChartModule = (props: {
  height: string;
  title: string;
  data: any[];
  condensed?: boolean;
  forCompareModels?: boolean; // true when used by CompareInterventions.js component.
}) => {
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
      {/* TODO(add in descriotsions here) */}
    </>
  );
};

export default ChartModule;
