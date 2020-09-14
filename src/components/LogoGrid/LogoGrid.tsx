import React from 'react';
import Grid from '@material-ui/core/Grid';
import ExternalLink from 'components/ExternalLink';

import { StyledPressLogoGrid, Logo, LogoWrapper } from './LogoGrid.style';

export const PartnerLogoGrid = () => {
  return (
    <Grid container spacing={1} alignItems="center" justify="center">
      <Grid item xs={12} md={4}>
        <ExternalLink href="https://ghss.georgetown.edu/">
          <Logo src="/images/ghss.png" alt="Georgetown University logo" />
        </ExternalLink>
      </Grid>
      <Grid item xs={12} md={4}>
        <ExternalLink href="http://med.stanford.edu/cerc.html">
          <Logo
            src="/images/cerc.jpg"
            style={{ transform: 'scale(1.1)' }}
            alt="Stanford Medicine Clinical Excellence Research Center logo"
          />
        </ExternalLink>
      </Grid>
      <Grid item xs={12} md={4}>
        <ExternalLink href="https://grandrounds.com/">
          <Logo src="/images/grand-rounds.png" alt="Grand Rounds logo" />
        </ExternalLink>
      </Grid>
      <Grid item xs={12} md={4}>
        <ExternalLink href="https://globalhealth.harvard.edu/">
          <Logo src="/images/harvard.png" />
        </ExternalLink>
      </Grid>
      <Grid item xs={12} md={4}>
        <ExternalLink href="https://schmidtfutures.com">
          <Logo src="/images/schmidt-futures.png" alt="Schmidt Futures logo" />
        </ExternalLink>
      </Grid>
    </Grid>
  );
};

export const PressLogoGrid = () => {
  return (
    <StyledPressLogoGrid>
      <LogoWrapper>
        <Logo src="/images/press/nyt.png" alt="New York Times logo" />
      </LogoWrapper>
      <LogoWrapper>
        <Logo src="/images/press/wsj.png" alt="The Wall Street Journal logo" />
      </LogoWrapper>
      <LogoWrapper>
        <Logo src="/images/press/vox.png" alt="Vox logo" />
      </LogoWrapper>
    </StyledPressLogoGrid>
  );
};
