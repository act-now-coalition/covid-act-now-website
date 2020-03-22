import React, { useState } from 'react';
import '../../App.css'; /* optional for styling like the :hover pseudo-class */
import USAMap from 'react-usa-map';
import { Redirect } from 'react-router-dom';
import { STATES, STATE_TO_INTERVENTION, INTERVENTION_COLOR_MAP } from 'enums';

function Map() {
  let [redirectTarget, setRedirectTarget] = useState();

  if (redirectTarget) {
    return <Redirect push to={redirectTarget} />;
  }

  const statesCustomConfig = () =>
    Object.keys(STATES).reduce((config, currState) => {
      return {
        ...config,
        [currState]: {
          fill: INTERVENTION_COLOR_MAP[STATE_TO_INTERVENTION[currState]],
          clickHandler: event => {
            setRedirectTarget(`/state/${currState}`);
          },
        },
      };
    }, {});

  return (
    <div className="Map">
      <USAMap width="100%" height="auto" customize={statesCustomConfig()} />
    </div>
  );
}

export default Map;
