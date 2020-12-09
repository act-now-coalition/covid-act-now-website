import React from 'react';
import { LoadingScreen } from './AllStates.style';
import { useProjectionsFromRegion } from 'common/utils/model';
import { STATES } from 'common';
import { Metric } from 'common/metric';
import { MetricChart } from 'components/Charts';
import regions from 'common/regions';

function AllStates() {
  return Object.keys(STATES).map(stateCode => {
    return <State key={stateCode} stateCode={stateCode} />;
  });
}

function State({ stateCode }) {
  const region = regions.findStateByStateCode(stateCode);
  const projections = useProjectionsFromRegion(region);

  // Projections haven't loaded yet
  if (!projections) {
    return <LoadingScreen></LoadingScreen>;
  }
  const stateName = projections.stateName;

  return (
    <>
      <h3>{stateName}</h3>
      <div
        style={{
          marginLeft: '50px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {[
          Metric.CASE_GROWTH_RATE,
          Metric.POSITIVE_TESTS,
          Metric.HOSPITAL_USAGE,
        ].map(metric => (
          <div style={{ width: '31%' }}>
            <MetricChart metric={metric} projections={projections} />
          </div>
        ))}
      </div>
    </>
  );
}

export default AllStates;
