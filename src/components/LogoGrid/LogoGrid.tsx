import React from 'react';
import Grid from '@material-ui/core/Grid';
import ExternalLink from 'components/ExternalLink';
import { Logo, LogoSmall } from './LogoGrid.style';
import ghssLogoUrl from 'assets/images/ghss.png';
import harvardLogoUrl from 'assets/images/harvard.png';
import cercLogo from 'assets/images/cerc.png';
import { StyledGridContainer } from 'screens/About/About.style';
import { LogoItem } from 'cms-content/about';

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
            <Logo src={ghssLogoUrl} alt="Georgetown University logo" />
          </ExternalLink>
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={4} justify="center">
        <Grid item>
          <ExternalLink href="http://med.stanford.edu/cerc.html">
            <Logo
              src={cercLogo}
              style={{ transform: 'scale(1.1)' }}
              alt="Stanford Medicine Clinical Excellence Research Center logo"
            />
          </ExternalLink>
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={4} justify="center">
        <Grid item>
          <ExternalLink href="https://globalhealth.harvard.edu/">
            <Logo
              src={harvardLogoUrl}
              alt="Harvard Global Health Institute logo"
            />
          </ExternalLink>
        </Grid>
      </Grid>
    </Grid>
  );
};

const LogoGrid: React.FC<{ logos: LogoItem[] }> = ({ logos }) => {
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
                <LogoSmall src={logo.image} alt={logo.altText} />
              </ExternalLink>
            </Grid>
          </Grid>
        );
      })}
    </StyledGridContainer>
  );
};
export default LogoGrid;
