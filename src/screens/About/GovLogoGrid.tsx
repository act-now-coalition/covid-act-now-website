import React from 'react';
import Grid from '@material-ui/core/Grid';
import { GovLogo } from 'components/LogoGrid/LogoGrid.style';

const GovLogoGrid = (props: { logos: any }) => {
  const { logos } = props;
  return (
    <Grid container spacing={1} alignItems="center" justify="center">
      {logos.map((logo: any) => {
        return (
          <Grid container item xs={4} justify="center">
            <Grid item>
              <GovLogo src={logo.image} alt={logo.altText} />
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default GovLogoGrid;
