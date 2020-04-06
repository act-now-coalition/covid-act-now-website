import React from 'react';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import {
  ColorBox,
  CondensedCaption,
  CondensedLegendItemText,
  LegendContainer,
  LegendItemHeader,
  LegendItemContainer,
  LegendItemDescription,
} from './Legend.style';

export function Legend(props) {
  return (
    <>
      <LegendContainer item container spacing={0} direction="row" {...props}>
        {React.Children.map(props.children, child =>
          React.cloneElement(child, { condensed: props.condensed }),
        )}
      </LegendContainer>
      {props.condensed && (
        <CondensedCaption
          variant="caption"
          color="inherit"
          style={{ padding: '0 calc(1rem + 8px)' }}
        >
          Hover to learn more
        </CondensedCaption>
      )}
    </>
  );
}

const CustomTooltip = withStyles(theme => ({
  tooltip: {
    fontSize: theme.typography.pxToRem(13),
    maxWidth: 250,
  },
}))(Tooltip);

export function LegendItem(props) {
  const { title, color, description, condensed } = props;
  if (condensed) {
    return (
      <Grid item xs="4" sm="4">
        <CustomTooltip arrow title={description}>
          <LegendItemContainer color={color}>
            <LegendItemHeader condensed>
              <CondensedLegendItemText align="center" variant="body1">
                {title}
              </CondensedLegendItemText>
            </LegendItemHeader>
          </LegendItemContainer>
        </CustomTooltip>
      </Grid>
    );
  }

  return (
    <Grid item xs={12} md={4}>
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

export function MiniLegendItem(props) {
  const { title, color, description, condensed } = props;
  if (condensed) {
    return (
      <Grid item xs="4" sm="4">
        <CustomTooltip arrow title={description}>
          <LegendItemContainer color={color}>
            <LegendItemHeader condensed>
              <CondensedLegendItemText align="center" variant="body1">
                {title}
              </CondensedLegendItemText>
            </LegendItemHeader>
          </LegendItemContainer>
        </CustomTooltip>
      </Grid>
    );
  }

  return (
    <Grid item xs={12} md={4}>
        <LegendItemHeader>
          <ColorBox color={color} />
          {description}
        </LegendItemHeader>
    </Grid>
  );
}
