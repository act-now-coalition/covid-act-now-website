import React from 'react';
import Typography from '@material-ui/core/Typography';
import { INTERVENTIONS, INTERVENTION_COLOR_MAP } from 'common';

import { StatusWrapper } from './Status.style';

const textColor = intervention =>
  intervention === INTERVENTIONS.LIMITED_ACTION ? 'white' : 'black';

export default function ({ intervention }) {
  return (
    <StatusWrapper color={INTERVENTION_COLOR_MAP[intervention]}>
      <Typography
        align="center"
        variant="h4"
        style={{ color: textColor(intervention) }}
      >
        Status: {intervention}
      </Typography>
    </StatusWrapper>
  );
}
