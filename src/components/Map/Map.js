import React, { useState } from 'react';
import USAMap from 'react-usa-map';
import { Redirect } from 'react-router-dom';

import 'App.css'; /* optional for styling like the :hover pseudo-class */

function Map() {
  let [redirectTarget, setRedirectTarget] = useState();

  if (redirectTarget) {
    return <Redirect push to={redirectTarget} />;
  }

  /* mandatory */
  let mapHandler = event => {
    alert('No model yet');
  };

  /* optional customization of filling per state and calling custom callbacks per state */
  let statesCustomConfig = () => {
    return {
      CA: {
        fill: 'rgba(1,1,1,0.7)',
        clickHandler: event => {
          setRedirectTarget('/ca');
        },
      },
      AK: {
        fill: 'rgba(1,1,1,0.7)',
        clickHandler: event => {
          setRedirectTarget('/ak');
        },
      },
      FL: {
        fill: 'rgba(1,1,1,0.7)',
        clickHandler: event => {
          setRedirectTarget('/fl');
        },
      },
      CO: {
        fill: 'rgba(1,1,1,0.7)',
        clickHandler: event => {
          setRedirectTarget('/co');
        },
      },
      WA: {
        fill: 'rgba(1,1,1,0.7)',
        clickHandler: event => {
          setRedirectTarget('/wa');
        },
      },
    };
  };

  return (
    <div className="App">
      <USAMap width="100%" customize={statesCustomConfig()} />
    </div>
  );
}

export default Map;
