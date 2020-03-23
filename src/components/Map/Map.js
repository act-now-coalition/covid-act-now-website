import React, { useState } from 'react';
import '../../App.css'; /* optional for styling like the :hover pseudo-class */
import USAMap from 'react-usa-map';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import {
  STATES,
  STATE_TO_INTERVENTION,
  INTERVENTION_COLOR_MAP,
  INTERVENTION_DESCRIPTIONS,
  INTERVENTION_EFFICACY_ORDER_ASC,
} from 'enums';
import { Legend, LegendItem } from './Legend';

function Map() {
  let [redirectTarget, setRedirectTarget] = useState();

  if (redirectTarget) {
    return <Redirect push to={redirectTarget} />;
  }

  const legendConfig = {};

  //comment

  const statesCustomConfig = Object.keys(STATES).reduce((config, currState) => {
    const intervention = STATE_TO_INTERVENTION[currState];
    const interventionColor = INTERVENTION_COLOR_MAP[intervention];

    if (!legendConfig[intervention]) {
      legendConfig[intervention] = true;
    }

    return {
      ...config,
      [currState]: {
        fill: interventionColor,
        clickHandler: event => {
          setRedirectTarget(`/state/${currState}`);
        },
      },
    };
  }, {});

  return (
    <div className="Map">
      <Grid container spacing={2}>
        <Grid item xs="12" md="8">
          <USAMap width="100%" height="auto" customize={statesCustomConfig} />
        </Grid>
        <Grid item xs="12" md="4">
          <Legend>
            {INTERVENTION_EFFICACY_ORDER_ASC.filter(
              intervention => legendConfig[intervention],
            ).map(intervention => (
              <LegendItem
                title={intervention}
                color={INTERVENTION_COLOR_MAP[intervention]}
                description={INTERVENTION_DESCRIPTIONS[intervention]}
              />
            ))}
          </Legend>
        </Grid>
      </Grid>
    </div>
  );
}

export default Map;
