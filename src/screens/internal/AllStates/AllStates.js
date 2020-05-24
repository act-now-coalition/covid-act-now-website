import React from 'react';
import { LoadingScreen } from './AllStates.style';
import { useProjections } from 'common/utils/model';
import { STATES } from 'common';
import {
  ChartRt,
  ChartPositiveTestRate,
  ChartICUHeadroom,
} from 'components/Charts';

function AllStates() {
  return Object.keys(STATES).map(stateId => (
    <State key={stateId} stateId={stateId} />
  ));
}

function State({ stateId }) {
  const projections = useProjections(stateId);

  // Projections haven't loaded yet
  if (!projections) {
    return <LoadingScreen></LoadingScreen>;
  }
  const stateName = projections.stateName;

  const projection = projections.primary;

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
        <div style={{ width: '31%' }}>
          {projection.rt && (
            <ChartRt columnData={projection.getDataset('rtRange')} />
          )}
        </div>
        <div style={{ width: '31%' }}>
          {projection.currentTestPositiveRate && (
            <ChartPositiveTestRate
              columnData={projection.getDataset('testPositiveRate')}
            />
          )}
        </div>
        <div style={{ width: '31%' }}>
          {projection.currentIcuUtilization && (
            <ChartICUHeadroom
              columnData={projection.getDataset('icuUtilization')}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default AllStates;
