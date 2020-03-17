import React, { Component, useState } from 'react';
import './App.css'; /* optional for styling like the :hover pseudo-class */
import USAMap from "react-usa-map";
import { Redirect } from "react-router-dom";

function Map () {
  let [redirectTarget, setRedirectTarget] = useState();

  if (redirectTarget) {
    return <Redirect push to={redirectTarget} />;
  }

  /* mandatory */
  let mapHandler = (event) => {
    alert("No model yet");
  };

  /* optional customization of filling per state and calling custom callbacks per state */
  let statesCustomConfig = () => {
    return {
      CA: {
        fill: "rgba(1,1,1,0.7)",
        clickHandler: event => {
          setRedirectTarget("/ca");
        }
      },
      AK: {
        fill: "rgba(1,1,1,0.7)",
        clickHandler: (event) => { setRedirectTarget('/ak') }
      },
    };
  };

  return (
    <div className="App">
      <USAMap width="100%" customize={statesCustomConfig()}   />
    </div>
  );
}

export default Map;