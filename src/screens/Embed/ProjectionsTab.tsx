import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import PeopleIcon from '@material-ui/icons/People';
import {
  H1Statistic,
  PaddedGridItem,
  H3Statistic,
  H2Statistic,
  H4Statistic,
  H4StatisticLight,
  Spacer,
} from './Embed.style';

export default function DataPage({
  cases,
  deaths,
  totalPopulation,
  deathsPercentage,
  populationPercentage,
}: {
  cases: number;
  deaths: number;
  totalPopulation: number;
  deathsPercentage: number;
  populationPercentage: number;
}) {
  return (
    <Grid container style={{ height: '100%' }}>
      <Grid container item xs={12}>
        <PaddedGridItem container item xs={12} p="2rem" direction="column">
          <H1Statistic mb="0.5rem">
            {new Intl.NumberFormat().format(cases)}
          </H1Statistic>
          <H3Statistic>Total Cases</H3Statistic>
          {/* <H4Statistic>{populationPercentage}% of population</H4Statistic> */}
        </PaddedGridItem>
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <Spacer />
          </Grid>
          <Grid container item xs={12}>
            {[
              // TODO
              // {
              //   total: 5370,
              //   percentage: 10,
              //   subHeading: 'Predicted recovered',
              // },
              {
                total: deaths,
                percentage: deathsPercentage,
                subHeading: 'Deceased',
              },
            ].map(GroupStat)}
          </Grid>
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <TotalPopulation population={totalPopulation} />
      </Grid>
    </Grid>
  );
}

function TotalPopulation({ population }: { population: number }) {
  return (
    <PaddedGridItem br bt bb xs={12} direction="column">
      <PeopleIcon />
      <H3Statistic>{new Intl.NumberFormat().format(population)}</H3Statistic>
      <H4Statistic>Total Population</H4Statistic>
    </PaddedGridItem>
  );
}

function GroupStat({
  total,
  percentage,
  subHeading,
}: {
  total: number;
  percentage: number;
  subHeading: string;
}) {
  return (
    <PaddedGridItem direction="column" flexGrow={1}>
      <H2Statistic>{new Intl.NumberFormat().format(total)}</H2Statistic>
      <Box>
        <H4Statistic>{subHeading}&nbsp;</H4Statistic>
        <H4StatisticLight>({percentage}%)</H4StatisticLight>
      </Box>
    </PaddedGridItem>
  );
}
