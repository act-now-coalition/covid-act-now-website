import React from 'react';
import '../../App.css'; /* optional for styling like the :hover pseudo-class */
import USMap from './USMap';

interface MapProps {
  showCounties?: boolean;
}

function USRiskMap({ showCounties = false }: MapProps) {
  return (
    <div className="Map">
      <div className="us-state-map">
        <USMap showCounties={showCounties} />
      </div>
    </div>
  );
}

export default USRiskMap;
