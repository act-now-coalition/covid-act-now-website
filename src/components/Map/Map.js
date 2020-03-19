import React, { Component, useState } from 'react';
import './../../App.css'; /* optional for styling like the :hover pseudo-class */
import USAMap from "react-usa-map";
import { Redirect } from "react-router-dom";

const STATES = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

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
    let config = {};
    for (var i=0; i<STATES.length; i++) {
      let state = STATES[i];
      config[state] = {
          fill: "rgba(1,1,1,0.7)",
          clickHandler: event => {
            setRedirectTarget(`/${state}`);
          }};
    }
    return config;
  };

  return (
    <div className="App">
      <USAMap width="100%" height="auto" customize={statesCustomConfig()}   />
    </div>
  );
}

export default Map;