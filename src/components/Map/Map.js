import React, { Component, useState } from 'react';
import '../../App.css'; /* optional for styling like the :hover pseudo-class */
import USAMap from 'react-usa-map';
import { Redirect } from 'react-router-dom';
import { STATES } from 'enums';

function Map() {
  let [redirectTarget, setRedirectTarget] = useState();

  if (redirectTarget) {
    return <Redirect push to={redirectTarget} />;
  }

  /* mandatory */
  let mapHandler = event => {
    alert('No model yet');
  };

  const statesCustomConfig = () =>
    Object.keys(STATES).reduce((config, currState) => {
      return {
        ...config,
        [currState]: {
          fill: 'rgba(1,1,1,0.7)',
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
