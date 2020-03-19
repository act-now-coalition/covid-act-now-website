import React, { Component, useState } from 'react';
import './../../App.css'; /* optional for styling like the :hover pseudo-class */
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
        clickHandler: event => {
          setRedirectTarget("/ak");
        }
      },
      FL: {
        fill: "rgba(1,1,1,0.7)",
        clickHandler: event => {
          setRedirectTarget("/fl");
        }
      },
      CO: {
        fill: "rgba(1,1,1,0.7)",
        clickHandler: event => {
          setRedirectTarget("/co");
        }
      },
      MO: {
        fill: "rgba(1,1,1,0.7)",
        clickHandler: event => {
          setRedirectTarget("/mo");
        }
      },
      NM: {
        fill: "rgba(1,1,1,0.7)",
        clickHandler: event => {
          setRedirectTarget("/nm");
        }
      },
      NV: {
        fill: "rgba(1,1,1,0.7)",
        clickHandler: event => {
          setRedirectTarget("/nv");
        }
      },
      NY: {
        fill: "rgba(1,1,1,0.7)",
        clickHandler: event => {
          setRedirectTarget("/ny");
        }
      },
      OR: {
        fill: "rgba(1,1,1,0.7)",
        clickHandler: event => {
          setRedirectTarget("/or");
        }
      },
      TX: {
        fill: "rgba(1,1,1,0.7)",
        clickHandler: event => {
          setRedirectTarget("/tx");
        }
      }
    };
  };

  return (
    <div className="App">
      <USAMap width="100%" customize={statesCustomConfig()}   />
    </div>
  );
}

export default Map;