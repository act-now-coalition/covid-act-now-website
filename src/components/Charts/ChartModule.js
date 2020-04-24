import React from 'react';
import Chart from './Chart';

import { ChartContainer, Wrapper, ChartHeader } from './ChartModule.style';

const ChartModule = ({
  height,
  title,
  series,
  condensed,
  forCompareModels, // true when used by CompareInterventions.js component.
}) => {
  return (
    <>
      <Panel>
        <ChartHeader>
          <h2>{title}</h2>
        </ChartHeader>
      </Panel>
      <Panel>
        <ChartContainer>
          <Wrapper>
            <Chart />
          </Wrapper>
        </ChartContainer>
        {/* TODO(add in descriotsions here) */}
      </Panel>
    </>
  );
};

const Panel = ({ children }) => {
  return <div style={{}}>{children}</div>;
};

export default ChartModule;
