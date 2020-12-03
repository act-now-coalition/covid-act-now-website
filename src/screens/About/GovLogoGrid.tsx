import React from 'react';
import Grid from '@material-ui/core/Grid';
import { GovLogo } from 'components/LogoGrid/LogoGrid.style';
import { LogoItem } from 'cms-content/about';

const GovLogoGrid = (props: { logos: LogoItem[] }) => {
  const { logos } = props;
  return (
    <Grid container spacing={1} alignItems="center" justify="center">
      {logos.map((logo: LogoItem) => {
        return (
          <Grid container item xs={4} justify="center" key={logo.altText}>
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
