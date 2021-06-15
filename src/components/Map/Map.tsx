import React from 'react';
import '../../App.css'; /* optional for styling like the :hover pseudo-class */
import USACountyMap from './USACountyMap';

interface MapProps {
  showCounties?: boolean;
}

function Map({ showCounties = false }: MapProps) {
  return (
    <div className="Map">
      <div className="us-state-map">
        <USACountyMap showCounties={showCounties} />
      </div>
    </div>
  );
}

export default Map;
