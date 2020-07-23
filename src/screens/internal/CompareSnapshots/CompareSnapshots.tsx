import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import * as QueryString from 'query-string';
import { assert, fail } from 'common/utils';
import { MetricChart } from 'components/Charts';
import {
  fetchAllStateProjections,
  fetchAllCountyProjections,
  fetchProjections,
  snapshotFromUrl,
  snapshotUrl,
  fetchMasterSnapshotNumber,
} from 'common/utils/model';
import {
  Wrapper,
  ModelComparisonsContainer,
  ModelSelectorContainer,
} from './CompareSnapshots.style';
import { Metric, getMetricName, ALL_METRICS } from 'common/metric';
import { Projections } from 'common/models/Projections';
import { ProjectionsSet } from 'common/models/ProjectionsSet';
import { SortType, ProjectionsPair } from 'common/models/ProjectionsPair';
import {
  topCountiesByPopulation,
  findCountyByFips,
  County,
} from 'common/locations';
import { SNAPSHOT_URL, SnapshotVersion, Api } from 'api';
import moment from 'moment';

// TODO(michael): Compare page improvements:
// * Virtualize the list so that it's not so awful slow. NOTE: I previously
//   used react-lazyload for this, but it was buggy (sometimes would show stale
//   charts after changing state properties)
// * Add a chart that overlays the two series on top of each other.
// * Show the diff value (the RMSD of the series or the delta between metric values).
// * Automatically find the latest snapshot (probably by just incrementing the
//   snapshot number until it 404s)
// * Show snapshot metadata (the version.json file).

enum Locations {
  STATES,
  TOP_COUNTIES_BY_POPULATION,
  TOP_COUNTIES_BY_DIFF,
  TOM_AND_CHRIS_COUNTIES,
}

const COUNTIES_LIMIT = 100;

export function CompareSnapshots() {
  const masterSnapshot = useMasterSnapshot();
  // TODO(michael): Is there a better React-y way to condition the bulk of a
  // component on a hook result (without introducing a separate component)?
  if (!masterSnapshot) {
    return null;
  } else {
    return <CompareSnapshotsInner masterSnapshot={masterSnapshot} />;
  }
}

function CompareSnapshotsInner({ masterSnapshot }: { masterSnapshot: number }) {
  const location = useLocation();
  const history = useHistory();

  const params = QueryString.parse(history.location.search);

  const [leftSnapshot, setLeftSnapshot] = useState(
    getParamValue(params, 'left', masterSnapshot),
  );
  const [rightSnapshot, setRightSnapshot] = useState(
    getParamValue(params, 'right', snapshotFromUrl(SNAPSHOT_URL)),
  );

  // We have separate state for the input field text
  // because we don't want to actually update our
  // URLs (and reload all the charts) until the
  // input field loses focus (onBlur).
  const [leftSnapshotText, setLeftSnapshotText] = useState(
    leftSnapshot.toString(),
  );
  const [rightSnapshotText, setRightSnapshotText] = useState(
    rightSnapshot.toString(),
  );

  const [sortType, setSortType] = useState<SortType>(
    getParamValue(params, 'sort', SortType.SERIES_DIFF),
  );
  const [metric, setMetric] = useState(
    getParamValue(params, 'metric', Metric.CASE_GROWTH_RATE),
  );
  const [locations, setLocations] = useState(
    getParamValue(params, 'locations', Locations.STATES),
  );

  // Load models for all states or counties.
  const leftProjections: Projections[] | null = useAllProjections(
    snapshotUrl(leftSnapshot),
    locations,
  );
  const rightProjections: Projections[] | null = useAllProjections(
    snapshotUrl(rightSnapshot),
    locations,
  );

  const leftVersion = useSnapshotVersion(leftSnapshot);
  const rightVersion = useSnapshotVersion(rightSnapshot);

  function setQueryParams(newParams: {
    left?: number;
    right?: number;
    sort?: number;
    metric?: number;
    locations?: number;
  }) {
    const params = {
      left: leftSnapshot,
      right: rightSnapshot,
      sort: sortType,
      metric: metric,
      locations: locations,
      ...newParams,
    };

    history.push({
      ...location,
      search: QueryString.stringify(params),
    });
  }

  const changeLeftSnapshot = () => {
    const left = parseInt(leftSnapshotText);
    if (!Number.isNaN(left)) {
      setLeftSnapshot(left);
      setQueryParams({ left });
    }
  };

  const changeRightSnapshot = () => {
    const right = parseInt(rightSnapshotText);
    if (!Number.isNaN(right)) {
      setRightSnapshot(right);
      setQueryParams({ right });
    }
  };

  // TODO: Figure out correct type for event.
  const changeSort = (event: any) => {
    const sort = parseInt(event.target.value);
    setSortType(sort);
    setQueryParams({ sort });
  };

  // TODO: Figure out correct type for event.
  const changeMetric = (event: any) => {
    const metric = parseInt(event.target.value);
    setMetric(metric);
    setQueryParams({ metric });
  };

  // TODO: Figure out correct type for event.
  const changeLocations = (event: any) => {
    const locations = parseInt(event.target.value);
    setLocations(locations);
    setQueryParams({ locations });
  };

  let projectionsSet = new ProjectionsSet([]);
  if (leftProjections && rightProjections) {
    projectionsSet = ProjectionsSet.fromProjections(
      leftProjections,
      rightProjections,
    );

    if (locations === Locations.TOP_COUNTIES_BY_DIFF) {
      projectionsSet = projectionsSet.top(COUNTIES_LIMIT, sortType, metric);
    } else if (locations === Locations.TOP_COUNTIES_BY_POPULATION) {
      projectionsSet = projectionsSet.top(
        COUNTIES_LIMIT,
        SortType.POPULATION,
        metric,
      );
    }

    projectionsSet = projectionsSet.sortBy(sortType, metric);
  }

  return (
    <Wrapper>
      <ModelSelectorContainer>
        <FormControl style={{ width: '8rem', marginRight: '1rem' }}>
          <TextField
            id="compare-left"
            label="Left Snapshot"
            value={leftSnapshotText}
            onChange={e => setLeftSnapshotText(e.target.value)}
            onBlur={() => changeLeftSnapshot()}
            onKeyPress={ev => {
              if (ev.key === 'Enter') {
                changeLeftSnapshot();
                ev.preventDefault();
              }
            }}
          />
        </FormControl>
        <FormControl style={{ width: '8rem' }}>
          <TextField
            id="compare-right"
            label="Right Snapshot"
            value={rightSnapshotText}
            onChange={e => setRightSnapshotText(e.target.value)}
            onBlur={() => changeRightSnapshot()}
            onKeyPress={ev => {
              if (ev.key === 'Enter') {
                changeRightSnapshot();
                ev.preventDefault();
              }
            }}
          />
        </FormControl>
        <FormControl style={{ width: '12rem', marginLeft: '1rem' }}>
          <InputLabel focused={false}>Show:</InputLabel>
          <Select value={locations} onChange={changeLocations}>
            <MenuItem value={Locations.STATES}>States</MenuItem>
            <MenuItem value={Locations.TOP_COUNTIES_BY_POPULATION}>
              Top {COUNTIES_LIMIT} Counties (by Population)
            </MenuItem>
            <MenuItem value={Locations.TOP_COUNTIES_BY_DIFF}>
              Top {COUNTIES_LIMIT} Counties (by Diff) [SLOW!!!]
            </MenuItem>
            <MenuItem value={Locations.TOM_AND_CHRIS_COUNTIES}>
              Tom &amp; Chris Counties
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl style={{ width: '12rem', marginLeft: '1rem' }}>
          <InputLabel focused={false}>Metric:</InputLabel>
          <Select value={metric} onChange={changeMetric}>
            {ALL_METRICS.map(metric => (
              <MenuItem key={metric} value={metric}>
                {getMetricName(metric)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl style={{ width: '12rem', marginLeft: '1rem' }}>
          <InputLabel focused={false}>Sort by:</InputLabel>
          <Select value={sortType} onChange={changeSort}>
            <MenuItem value={SortType.SERIES_DIFF}>Series Diff (RMSD)</MenuItem>
            <MenuItem value={SortType.METRIC_DIFF}>Metric Diff</MenuItem>
            <MenuItem value={SortType.POPULATION}>Population</MenuItem>
            <MenuItem value={SortType.ALPHABETICAL}>Name</MenuItem>
          </Select>
        </FormControl>
      </ModelSelectorContainer>

      <Grid container spacing={8} style={{ margin: '1px' }}>
        <Grid item xs={6}>
          Left Snapshot: <b>{leftSnapshot}</b>
          <VersionInfo version={leftVersion} />
        </Grid>
        <Grid item xs={6}>
          Right Snapshot: <b>{rightSnapshot}</b>
          <VersionInfo version={rightVersion} />
        </Grid>
      </Grid>

      <ComparisonList metric={metric} projectionsSet={projectionsSet} />
    </Wrapper>
  );
}

const VersionInfo = function ({
  version,
}: {
  version: SnapshotVersion | null;
}) {
  return (
    version && (
      <div style={{ fontSize: 'small' }}>
        <b>Build finished:</b>{' '}
        {moment.utc(version.timestamp).local().toDate().toString()}
        <br />
        <b>covid-data-model:</b>{' '}
        {JSON.stringify(version['covid-data-model']).replace(',', ', ')}
        <br />
        <b>covid-data-public:</b>{' '}
        {JSON.stringify(version['covid-data-public']).replace(',', ', ')}
        <br />
      </div>
    )
  );
};

const ComparisonList = function ({
  metric,
  projectionsSet,
}: {
  metric: Metric;
  projectionsSet: ProjectionsSet;
}) {
  if (projectionsSet.isEmpty) {
    return <h1>Loading...</h1>;
  }

  return (
    <ModelComparisonsContainer>
      {projectionsSet.map(pair => (
        <ProjectionsCompare
          key={pair.locationName}
          metric={metric}
          pair={pair}
        />
      ))}
    </ModelComparisonsContainer>
  );
};

function ProjectionsCompare({
  metric,
  pair,
}: {
  metric: Metric;
  pair: ProjectionsPair;
}) {
  return (
    <div style={{ marginLeft: '40px' }}>
      <hr />
      <h2>
        {pair.locationName} ({pair.fips})
      </h2>
      <Grid container spacing={8}>
        <Grid item xs={6}>
          <ProjectionsChart metric={metric} projections={pair.left} />
        </Grid>
        <Grid item xs={6}>
          <ProjectionsChart metric={metric} projections={pair.right} />
        </Grid>
      </Grid>
    </div>
  );
}

const ProjectionsChart = React.memo(function ProjectionsChart({
  metric,
  projections,
}: {
  metric: Metric;
  projections: Projections;
}) {
  return <MetricChart metric={metric} projections={projections} />;
});

function useMasterSnapshot(): number | null {
  const [snapshot, setSnapshot] = useState<number | null>(null);
  useEffect(() => {
    async function fetchData() {
      setSnapshot(await fetchMasterSnapshotNumber());
    }
    fetchData();
  }, []);

  return snapshot;
}

function useAllProjections(
  snapshotUrl: string,
  locations: Locations,
): Projections[] | null {
  const [allProjections, setAllProjections] = useState<Projections[] | null>(
    null,
  );

  useEffect(() => {
    setAllProjections(null);

    async function fetchData() {
      const projections = await fetchAllProjections(snapshotUrl, locations);
      setAllProjections(projections);
    }
    if (snapshotUrl !== undefined) {
      fetchData();
    }
  }, [snapshotUrl, locations]);

  return allProjections;
}

function fetchAllProjections(
  snapshotUrl: string,
  locations: Locations,
): Promise<Projections[]> {
  if (locations === Locations.STATES) {
    return fetchAllStateProjections(snapshotUrl);
  } else if (locations === Locations.TOP_COUNTIES_BY_DIFF) {
    return fetchAllCountyProjections(snapshotUrl);
  } else if (locations === Locations.TOP_COUNTIES_BY_POPULATION) {
    const topCounties = topCountiesByPopulation(COUNTIES_LIMIT);
    return Promise.all(
      topCounties.map(county =>
        fetchProjections(county.state_code, county, snapshotUrl),
      ),
    );
  } else if (locations === Locations.TOM_AND_CHRIS_COUNTIES) {
    return Promise.all(
      tomChrisCounties().map(county =>
        fetchProjections(county.state_code, county, snapshotUrl),
      ),
    );
  } else {
    fail(`Unknown locations: ${locations}`);
  }
}

function getParamValue(
  params: QueryString.ParsedQuery,
  param: string,
  defaultValue: number,
): number {
  let value = _.get(params, param, defaultValue);
  if (typeof value === 'string') {
    value = parseInt(value);
  }
  assert(
    typeof value === 'number' && !Number.isNaN(value),
    `Parameter ${param} has non-numeric value: ${value}`,
  );
  return value;
}

export function useSnapshotVersion(
  snapshot: number | null,
): SnapshotVersion | null {
  const [version, setVersion] = useState<SnapshotVersion | null>(null);
  useEffect(() => {
    setVersion(null);
    if (snapshot !== null) {
      new Api(snapshotUrl(snapshot)).fetchVersionInfo().then(version => {
        setVersion(version);
      });
    }
  }, [snapshot]);

  return version;
}

function tomChrisCounties(): County[] {
  const fips = [
    '26075',
    '26113',
    '26031',
    '26013',
    '47065',
    '26143',
    '10001',
    '47113',
    '31133',
    '02275',
    '31135',
    '47103',
    '26057',
    '31115',
    '47031',
    '47115',
    '02110',
    '47079',
    '26109',
    '26163',
    '26055',
    '26155',
    '47083',
    '47135',
    '31103',
    '47177',
    '47025',
    '47131',
    '36031',
    '26139',
    '26023',
    '47121',
    '47141',
    '47165',
    '47037',
    '26065',
    '02122',
    '09011',
    '26063',
    '02130',
    '09009',
    '09015',
    '26073',
    '47109',
    '26135',
    '02180',
    '02020',
    '47011',
    '31057',
    '26071',
    '26091',
    '26151',
    '26121',
    '26005',
    '26117',
    '47075',
    '26089',
    '26015',
    '26099',
    '47147',
    '02016',
    '26115',
    '26103',
    '02013',
    '26069',
    '02185',
    '26035',
    '47143',
    '02261',
    '26137',
    '47061',
    '47081',
    '47185',
    '26107',
    '47127',
    '26051',
    '26095',
    '47013',
    '31091',
    '26087',
    '26027',
    '26125',
    '47153',
    '47085',
    '26039',
    '26003',
    '47137',
    '26165',
    '26105',
    '47189',
    '26041',
    '47047',
    '47107',
    '47145',
    '02070',
    '47035',
    '47179',
    '47099',
    '47039',
    '47067',
    '47057',
    '47123',
    '47095',
    '26009',
    '47033',
    '47003',
    '26053',
    '02100',
    '26079',
    '31049',
    '26021',
    '26001',
    '26043',
    '47173',
    '47159',
    '26019',
    '47071',
    '47129',
    '26029',
    '26061',
    '47055',
    '02195',
    '26049',
    '26111',
    '47043',
    '47001',
    '06037',
    '26077',
    '47053',
    '26127',
    //'72',
    '47149',
    '31029',
    '47117',
    '26131',
    '47073',
    '26133',
    '47059',
    '02170',
    '31129',
    '47063',
    '26025',
    '02158',
    '26007',
    '26093',
    '09003',
    '26157',
    '02090',
    '26033',
    '47077',
    '26141',
    '02240',
    '10003',
    '47021',
    '47051',
    '47171',
    '26129',
    '02050',
    '26097',
    '47101',
    '47187',
    '26047',
    '26101',
    '26161',
    '47087',
    '47009',
    '26037',
    '02290',
    '31117',
    '47023',
    '47015',
    '26011',
    '47111',
    '26017',
    '26119',
    '47157',
    '26085',
    '47125',
    '31063',
    '47119',
    '47093',
    '02188',
    '26045',
    '47097',
    '02068',
    '47041',
    '47045',
    '02198',
    '26145',
    '02220',
    '26159',
    '26153',
    '26083',
    '09007',
    '02150',
    '10005',
    '12001',
    '12003',
    '12005',
    '12007',
    '12009',
    '12011',
    '12013',
    '12015',
    '12017',
    '12019',
    '12021',
    '12023',
    '12027',
    '12029',
    '12031',
    '12033',
    '12035',
    '12037',
    '12039',
    '12041',
    '12043',
    '12045',
    '12047',
    '12049',
    '12051',
    '12053',
    '12055',
    '12057',
    '12059',
    '12061',
    '12063',
    '12065',
    '12067',
    '12069',
    '12071',
    '12073',
    '12075',
    '12077',
    '12079',
    '12081',
    '12083',
    '12085',
    '12086',
    '12087',
    '12089',
    '12091',
    '12093',
    '12095',
    '12097',
    '12099',
    '12101',
    '12103',
    '12105',
    '12107',
    '12109',
    '12111',
    '12113',
    '12115',
    '12117',
    '12119',
    '12121',
    '12123',
    '12125',
    '12127',
    '12129',
    '12131',
    '12133',
  ];
  return fips.map(findCountyByFips);
}

export default CompareSnapshots;
