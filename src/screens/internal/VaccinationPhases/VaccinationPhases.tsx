import React from 'react';
import {
  RegionVaccinePhaseInfo,
  RegionPhaseGroup,
  stateVaccinationPhases,
} from 'cms-content/vaccines/phases';
import { Grid, Typography } from '@material-ui/core';
import ExternalLink from 'components/ExternalLink';
import { MarkdownContent } from 'components/Markdown';
import PageContent from 'components/PageContent';
import { sortBy } from 'lodash';

interface StateVaccineDataProps {
  regionData: RegionVaccinePhaseInfo;
}

const PipeDelimatedRow = ({
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
  <PipeDelimatedRow>
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
  </PipeDelimatedRow>
);

const VaccinePhaseGroup = ({ data }: { data: RegionPhaseGroup }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h6">
          Phase {data.phase}
          {data.tier && <>, tier{data.tier}</>}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <PipeDelimatedRow>
          {data.currentlyEligible ? (
            <Typography color="textPrimary">Currently Eligible</Typography>
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
        </PipeDelimatedRow>
      </Grid>
      {/*
      <Grid container item xs={12}>
        <Grid item xs={12}>
          {data.currentlyEligible ? (
            <Typography variant="body1" color="textPrimary">
              Currently Eligible
            </Typography>
          ) : (
            <Typography variant="body1" color="error">
              Not eligible
            </Typography>
          )}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1">Start Date: {data.startDate}</Typography>
        </Grid>
        {data.expandedDefinitionUrl && (
          <Grid item xs={12}>
            <ExternalLink href={data.expandedDefinitionUrl}>
              Detailed information
            </ExternalLink>
          </Grid>
        )}
      </Grid> */}
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
        <Typography variant="h4">{regionData.locationName}</Typography>
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
    <PageContent sidebarItems={[]}>
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
    </PageContent>
  );
};

export default VaccinationPhases;
