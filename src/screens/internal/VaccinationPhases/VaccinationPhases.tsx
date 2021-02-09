import React from 'react';
import {
  RegionVaccinePhaseInfo,
  RegionPhaseGroup,
  stateVaccinationPhases,
} from 'cms-content/vaccines/phases';
import { Container, Grid, Typography } from '@material-ui/core';
import ExternalLink from 'components/ExternalLink';
import { MarkdownContent } from 'components/Markdown';

import { sortBy } from 'lodash';

interface StateVaccineDataProps {
  regionData: RegionVaccinePhaseInfo;
}

const PipeDelimitedRow = ({
  children,
}: {
  children: (React.ReactElement | string | undefined)[];
}) => {
  return (
    <Grid container xs={12} spacing={1}>
      {children.map((child, idx) => {
        if (!child) {
          return null;
        }
        if (idx === 0) {
          return <Grid item>{child}</Grid>;
        }
        return (
          <>
            <Grid item>|</Grid>
            <Grid item>{child}</Grid>
          </>
        );
      })}
    </Grid>
  );
};

const StateHeader = ({ regionData }: StateVaccineDataProps) => (
  <PipeDelimitedRow>
    <Typography variant="body1">FIPS: {regionData.fips}</Typography>
    <ExternalLink href={regionData.eligibilityInfoUrl}>
      Eligibility URL
    </ExternalLink>
    <Typography variant="body1">
      Email alert version: {regionData.emailAlertVersion}
    </Typography>
    <ExternalLink
      href={`https://www.goodrx.com/covid-19/${regionData.locationName
        .replace(' ', '')
        .toLowerCase()}`}
    >
      Good RX
    </ExternalLink>
  </PipeDelimitedRow>
);

const VaccinePhaseGroup = ({ data }: { data: RegionPhaseGroup }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6" style={{ margin: 0 }}>
          Phase {data.phase}
          {data.tier && <>, tier{data.tier}</>}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <PipeDelimitedRow>
          {data.currentlyEligible ? (
            <Typography color="secondary">Currently Eligible</Typography>
          ) : (
            <Typography color="error">Not eligible</Typography>
          )}
          <Typography>Start Date: {data.startDate ?? '--'}</Typography>
          {data.expandedDefinitionUrl && (
            <Grid item xs={12}>
              <ExternalLink href={data.expandedDefinitionUrl}>
                Detailed information
              </ExternalLink>
            </Grid>
          )}
        </PipeDelimitedRow>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={12}>
          <Typography>Description:</Typography>{' '}
        </Grid>
        <Grid item xs={12}>
          <MarkdownContent source={data.description}></MarkdownContent>
        </Grid>
      </Grid>
    </Grid>
  );
};
const StateVaccinationData = ({ regionData }: StateVaccineDataProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" style={{ margin: 0 }}>
          {regionData.locationName}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <StateHeader regionData={regionData} />
      </Grid>
      <Grid container spacing={1} item xs={12}>
        {regionData.phaseGroups.map(data => (
          <Grid item xs={12}>
            <VaccinePhaseGroup data={data} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

const VaccinationPhases = () => {
  const data = sortBy(stateVaccinationPhases, item => item.locationName);

  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h2">State Vaccination Phases</Typography>
        </Grid>
        <Grid item xs={12}>
          {data.map(stateData => (
            <StateVaccinationData regionData={stateData} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default VaccinationPhases;
