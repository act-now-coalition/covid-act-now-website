import React from 'react';
import { LoadingScreen } from './AllStates.style';
import { useProjections } from 'common/utils/model';
import { STATES } from 'common';
import {
  ChartRt,
  ChartPositiveTestRate,
  ChartICUHeadroom,
} from 'components/Charts';
import { getChartData } from 'components/LocationPage/ChartsHolder';

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

  const { rtRangeData, testPositiveData, icuUtilizationData } = getChartData(
    projection,
  );

  return (
    <>
      <h3>{stateName}</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '32%', height: '450px' }}>
          {rtRangeData && (
            <ChartRt
              height={450}
              columnData={projection.getDataset('rtRange')}
            />
          )}
        </div>
        <div style={{ width: '32%', height: '450px' }}>
          {testPositiveData && (
            <ChartPositiveTestRate columnData={testPositiveData} />
          )}
        </div>
        <div style={{ width: '32%', height: '450px' }}>
          {icuUtilizationData && (
            <ChartICUHeadroom columnData={icuUtilizationData} />
          )}
        </div>
      </div>
    </>
  );
}

export default AllStates;
