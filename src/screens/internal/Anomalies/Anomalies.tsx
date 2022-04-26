import React from 'react';
import sortBy from 'lodash/sortBy';
import {
  RegionVaccinePhaseInfo,
  RegionPhaseGroup,
  stateVaccinationPhases,
} from 'cms-content/vaccines/phases';
import { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import ExternalLink from 'components/ExternalLink';
import { MarkdownContent } from 'components/Markdown';
import { Metric } from 'common/metricEnum';
import { fetchCountyProjectionsForState } from 'common/utils/model';
import {
  Region,
  State,
  getStateName,
  statesByFips,
  getCountyRegionFromZipCode,
} from 'common/regions';
import { getAnomaliesForMetric } from 'screens/internal/Anomalies/utils';
import {
  Anomalies,
  AnomalyAnnotation,
  TagType,
  Date,
  OriginalObservation,
} from 'api/schema/RegionSummaryWithTimeseries';
import { Projections } from 'common/models/Projections';

interface LocationAnomalies {
  region: Region;
  anomalies: Anomalies;
}

const AnnotationLocation = ({
  anomalies,
}: {
  anomalies: AnomalyAnnotation[];
}) => {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          {anomalies.map(anomaly => (
            <Typography>
              {anomaly.date} {anomaly.type} {anomaly.original_observation}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

const AnomaliesPage = () => {
  const projections = useCountyProjectionsFromRegion(statesByFips['12']);
  let casesAnnotationsRaw: LocationAnomalies[];
  projections?.forEach(projection => {
    if (projections) {
      const val = getAnomaliesForMetric(
        projection.primary.annotations,
        Metric.CASE_DENSITY,
      );
      casesAnnotationsRaw.push();
    }
  });
  const casesAnnotations = casesAnnotationsRaw.filter(
    anomalies => anomalies !== undefined,
  ) as Anomalies[];

  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h2">Anomalies</Typography>
          {casesAnnotations.map(anomalies => (
            <AnnotationLocation anomalies={anomalies} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default AnomaliesPage;

export function useCountyProjectionsFromRegion(region: State | null) {
  const [projections, setProjections] = useState<Projections[]>();

  useEffect(() => {
    async function fetchData() {
      if (region) {
        const projections = await fetchCountyProjectionsForState(region);
        setProjections(projections);
      }
    }

    fetchData();
  }, [region]);

  return projections;
}
