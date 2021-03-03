import React from 'react';
import MetricChart from './MetricChart';
import { Metric } from 'common/metricEnum';
import regions from 'common/regions';
import { useProjectionsFromRegion } from 'common/utils/model';

export default {
  title: 'Charts/Metric Chart',
  component: MetricChart,
};

const DesktopContainer: React.FC = ({ children }) => (
  <div style={{ margin: '0 auto', maxWidth: 900, border: 'solid 1px #ddd' }}>
    <div
      style={{ width: 948, marginRight: '-3rem', border: 'dashed 1px blue' }}
    >
      {children}
    </div>
  </div>
);

const MobileContainer: React.FC = ({ children }) => (
  <div style={{ border: 'dashed 1px blue', minWidth: '343px' }}>{children}</div>
);

export const DailyCases = () => {
  const region = regions.findByFipsCodeStrict('06');
  const projections = useProjectionsFromRegion(region);
  if (!projections) {
    return null;
  }
  return (
    <DesktopContainer>
      <MetricChart
        metric={Metric.CASE_DENSITY}
        projections={projections}
        height={400}
      />
    </DesktopContainer>
  );
};

export const InfectionRate = () => {
  const region = regions.findByFipsCodeStrict('06');
  const projections = useProjectionsFromRegion(region);
  if (!projections) {
    return null;
  }
  return (
    <DesktopContainer>
      <MetricChart
        metric={Metric.CASE_GROWTH_RATE}
        projections={projections}
        height={400}
      />
    </DesktopContainer>
  );
};

export const PositiveTests = () => {
  const region = regions.findByFipsCodeStrict('06');
  const projections = useProjectionsFromRegion(region);
  if (!projections) {
    return null;
  }
  return (
    <DesktopContainer>
      <MetricChart
        metric={Metric.POSITIVE_TESTS}
        projections={projections}
        height={400}
      />
    </DesktopContainer>
  );
};

export const ICUCapacity = () => {
  const region = regions.findByFipsCodeStrict('06');
  const projections = useProjectionsFromRegion(region);
  if (!projections) {
    return null;
  }
  return (
    <DesktopContainer>
      <MetricChart
        metric={Metric.HOSPITAL_USAGE}
        projections={projections}
        height={400}
      />
    </DesktopContainer>
  );
};

export const DailyCasesMobile = () => {
  const region = regions.findByFipsCodeStrict('06');
  const projections = useProjectionsFromRegion(region);
  if (!projections) {
    return null;
  }
  return (
    <MobileContainer>
      <MetricChart
        metric={Metric.CASE_DENSITY}
        projections={projections}
        height={400}
      />
    </MobileContainer>
  );
};

export const ICUCapacityMobile = () => {
  const region = regions.findByFipsCodeStrict('06');
  const projections = useProjectionsFromRegion(region);
  if (!projections) {
    return null;
  }
  return (
    <MobileContainer>
      <MetricChart
        metric={Metric.HOSPITAL_USAGE}
        projections={projections}
        height={400}
      />
    </MobileContainer>
  );
};
