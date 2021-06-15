import React from 'react';
import '../../App.css'; /* optional for styling like the :hover pseudo-class */
import USACountyMap from './USACountyMap';
import noop from 'lodash/noop';

interface MapProps {
  onClick?: () => void;
  showCounties?: boolean;
}

function Map({ onClick = noop, showCounties = false }: MapProps) {
  // TODO(chris): The only user of `onClick` is the embed. When you click on a state
  // it eventually navigates you to the home page. If we want the action of clicking
  // on a state to take you to the home page, we should change the link in USACountyMap
  // rather than redirecting here.
  const handleClick = React.useCallback(
    stateName => {
      // externally provided click handler
      if (Boolean(onClick)) {
        onClick();
      }
    },
    [onClick],
  );

  return (
    <div className="Map">
      <div className="us-state-map">
        <USACountyMap
          stateClickHandler={handleClick}
          showCounties={showCounties}
        />
      </div>
    </div>
  );
}

export default Map;
