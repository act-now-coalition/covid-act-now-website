import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {
  ColorBox,
  LegendContainer,
  LegendItemHeader,
  LegendItemContainer,
  LegendItemDescription,
} from './Legend.style';

export function Legend(props) {
  return (
    <LegendContainer container spacing={1} direction="row" {...props}>
      {props.children}
    </LegendContainer>
  );
}

export function LegendItem(props) {
  const { title, color, description } = props;
  return (
    <Grid item xs="12" md="4">
      <LegendItemContainer>
        <LegendItemHeader>
          <ColorBox color={color} />
          {title}
        </LegendItemHeader>
        <LegendItemDescription>
          <Typography variant="caption" display="block" align="left">
            {description}
          </Typography>
        </LegendItemDescription>
      </LegendItemContainer>
    </Grid>
  );
}
