import React from 'react';
import Grid from '@material-ui/core/Grid';
import { GovLogo } from 'components/LogoGrid/LogoGrid.style';
import { LogoItem } from 'cms-content/about';
import ExternalLink from 'components/ExternalLink';
import { StyledGridContainer } from './About.style';

const GovLogoGrid = (props: { logos: LogoItem[] }) => {
  const { logos } = props;
  return (
    <StyledGridContainer
      container
      spacing={1}
      alignItems="center"
      justify="center"
    >
      {logos.map((logo: LogoItem) => {
        return (
          <Grid container item xs={4} justify="center" key={logo.altText}>
            <Grid item>
              <ExternalLink href={logo.url}>
                <GovLogo src={logo.image} alt={logo.altText} />
              </ExternalLink>
            </Grid>
          </Grid>
        );
      })}
    </StyledGridContainer>
  );
};

export default GovLogoGrid;
