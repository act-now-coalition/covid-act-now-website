import React from 'react';
import Grid from '@material-ui/core/Grid';
import ExternalLink from 'components/ExternalLink';

import { Logo, PressLogoWrapper } from './LogoGrid.style';

export const LogoGridItem = (props: {
  image: string;
  url: string;
  altText: string;
}) => {
  return (
    <Grid container item xs={12} sm={4} justify="center">
      <Grid item>
        <ExternalLink href={props.url}>
          <Logo src={props.image} alt={props.altText} />
        </ExternalLink>
      </Grid>
    </Grid>
  );
};

export const PartnerLogoGrid = () => {
  return (
    <Grid container spacing={1} alignItems="center" justify="center">
      <Grid container item xs={12} sm={4} justify="center">
        <Grid item>
          <ExternalLink href="https://ghss.georgetown.edu/">
            <Logo src="/images/ghss.png" alt="Georgetown University logo" />
          </ExternalLink>
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={4} justify="center">
        <Grid item>
          <ExternalLink href="http://med.stanford.edu/cerc.html">
            <Logo
              src="/images/cerc.png"
              style={{ transform: 'scale(1.1)' }}
              alt="Stanford Medicine Clinical Excellence Research Center logo"
            />
          </ExternalLink>
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={4} justify="center">
        <Grid item>
          <ExternalLink href="https://grandrounds.com/">
            <Logo src="/images/grand-rounds.png" alt="Grand Rounds logo" />
          </ExternalLink>
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={4} justify="center">
        <Grid item>
          <ExternalLink href="https://globalhealth.harvard.edu/">
            <Logo
              src="/images/harvard.png"
              alt="Harvard Global Health Institute logo"
            />
          </ExternalLink>
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={4} justify="center">
        <Grid item>
          <ExternalLink href="https://schmidtfutures.com">
            <Logo
              src="/images/schmidt-futures.png"
              alt="Schmidt Futures logo"
            />
          </ExternalLink>
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={4} justify="center">
        <Grid item>
          <ExternalLink href="https://usafacts.org/">
            <Logo src="/images_cms/usa_facts.png" alt="USA Facts logo" />
          </ExternalLink>
        </Grid>
      </Grid>
    </Grid>
  );
};

export const PressLogoGrid = () => {
  const logos = [
    {
      src: '/images/press/wsj.png',
      alt: 'The Wall Street Journal logo',
    },
    {
      src: '/images/press/fastcompany.png',
      alt: 'Fast Company logo',
    },
    {
      src: '/images/press/nyt.png',
      alt: 'New York Times logo',
    },
    {
      src: '/images/press/forbes.png',
      alt: 'Forbes logo',
    },
    {
      src: '/images/press/vox.png',
      alt: 'Vox logo',
    },
  ];

  return (
    <Grid container spacing={1} alignItems="center" justify="center">
      {logos.map((logo, i) => (
        <Grid container item xs={12} sm={4} justify="center" key={logo.alt}>
          <PressLogoWrapper item>
            <Logo src={logo.src} alt={logo.alt} />
          </PressLogoWrapper>
        </Grid>
      ))}
    </Grid>
  );
};
