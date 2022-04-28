import React from 'react';
import { orderBy } from 'lodash';
import { useState, useEffect } from 'react';
import { Container, Grid, Typography, Link, Box } from '@material-ui/core';
import { fetchCountyProjectionsForState } from 'common/utils/model';
import { State, statesByFips } from 'common/regions';
import {
  AnnotationType,
  getAnomaliesForAnnotationType,
} from 'screens/internal/Anomalies/utils';
import { Projections } from 'common/models/Projections';
import { Wrapper } from '../CompareSnapshots/CompareSnapshots.style';
import { AnnotationsSelector } from './AnomaliesSelector';
import { AnnotationOptions } from './utils';
import { snapshotUrl } from 'common/utils/snapshots';
import {
  VersionInfo,
  useSnapshotVersion,
} from '../CompareSnapshots/SnapshotVersions';

export function AnomaliesPage() {
  const [options, setOptions] = useState<AnnotationOptions | null>(null);
  return (
    <Wrapper>
      <Typography variant="h3">County Data Anomaly Tracker</Typography>
      <AnnotationsSelector onNewOptions={setOptions} />
      {options && <AnomaliesWrapper options={options} />}
    </Wrapper>
  );
}

const AnomaliesWrapper = React.memo(function AnomaliesWrapper({
  options,
}: {
  options: AnnotationOptions;
}) {
  const { stateFips, annotationType, snapshot } = options;

  let projections = useCountyProjectionsFromRegion(
    statesByFips[stateFips],
    snapshotUrl(snapshot),
  );
  const snapshotInfo = useSnapshotVersion(snapshot);

  if (projections === undefined) {
    return <Typography variant="h4">Loading data...</Typography>;
  } else if (projections.length === 0) {
    return (
      <Typography variant="h4">
        No data to display for snapshot {snapshot}.
      </Typography>
    );
  }
  // Sort the counties by the number of anomalies in each.
  // TODO: I think it would be more helpful to sort locations by which
  // have the newest/most recent anomalies, but that was less straightforward.
  projections = orderBy(
    projections,
    [
      function (projection) {
        return getAnomaliesForAnnotationType(
          projection.primary.annotations,
          annotationType,
        );
      },
    ],
    'desc',
  );

  return (
    <Container>
      <Typography style={{ paddingTop: '20px' }}>
        Snapshot {snapshot} Info:
      </Typography>
      <VersionInfo version={snapshotInfo}></VersionInfo>

      <Typography>
        Anomalies formatted below as:{' '}
        <Box fontWeight="fontWeightMedium" fontStyle="italic">
          Date, Anomaly Type, Original Value
        </Box>
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          {projections?.map(projection => (
            <LocationAnomalies
              annotationType={annotationType}
              projection={projection}
            />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
});

const LocationAnomalies = ({
  projection,
  annotationType,
}: {
  projection: Projections;
  annotationType: AnnotationType;
}) => {
  let anomalies = getAnomaliesForAnnotationType(
    projection.primary.annotations,
    annotationType,
  );
  anomalies = orderBy(
    anomalies,
    [
      function (anomaly) {
        return anomaly.date;
      },
    ],
    'desc',
  );
  return (
    <Container>
      <Typography variant="h5">
        <Link style={{ color: 'blue' }} href={projection.region.relativeUrl}>
          {projection.region.name}
        </Link>
        , FIPS: {projection.region.fipsCode}
      </Typography>
      <Grid item xs={12}>
        {anomalies.map(anomaly => (
          <Typography>
            {anomaly.date}, {anomaly.type}, {anomaly.original_observation}
          </Typography>
        ))}
      </Grid>
    </Container>
  );
};

function useCountyProjectionsFromRegion(
  region: State | null,
  snapshot: string | null,
) {
  const [projections, setProjections] = useState<Projections[]>();

  useEffect(() => {
    async function fetchData() {
      if (region && snapshot) {
        // Immediately clear page/data upon options update.
        setProjections(undefined);
        try {
          const projections = await fetchCountyProjectionsForState(
            region,
            snapshot,
          );
          setProjections(projections);
        } catch (e) {
          // Hacky way to determine if the fetch has failed.
          // Later, we display error text if projections.length === 0
          setProjections([]);
        }
      }
    }

    fetchData();
  }, [region, snapshot]);

  return projections;
}

export default AnomaliesPage;
