import React  from 'react';
import { LoadingScreen } from './AllStates.style';
import { useProjections, useStateSummary } from 'utils/model';
import { STATES } from 'enums';
import CountyMap from 'components/CountyMap/CountyMap';

function AllStates() {
  return Object.keys(STATES).filter(s => s !== 'DC').map(stateId => (
    <State key={stateId} stateId={stateId} />
  ));
}

function State({ stateId }) {
  const projections = useProjections(stateId);
  const stateSummary = useStateSummary(stateId);

  // Projections haven't loaded yet
  if (!projections) {
    return <LoadingScreen></LoadingScreen>;
  }
  const stateName = projections.stateName;

  return (
    <div style={{width: 390, height: 300, position: 'relative' }}>
      <h3>{stateName}</h3>
            <CountyMap
              fill={
                projections.primary
                  ? projections.getAlarmLevelColor()
                  : '#e3e3e3'
              }
              stateId={stateId}
              stateSummary={stateSummary}
              selectedCounty={null}
              setSelectedCounty={() => { }}
            />
    </div>
  );
}

export default AllStates;
