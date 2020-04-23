import React from 'react';
import Chart from './Chart';

import { ChartContainer, Wrapper, ChartHeader } from './ChartModule.style';

const ChartModule = ({
  height,
  title,
  series,
  condensed,
  forCompareModels, // true when used by CompareInterventions.js component.
  children,
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
            {children}
          </Wrapper>
        </ChartContainer>
      </Panel>
    </>
  );
};

const Panel = ({ children, title }) => {
  return <div style={{}}>{children}</div>;
};

export default ChartModule;
