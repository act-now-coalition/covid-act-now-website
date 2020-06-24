import React from 'react';
import { useHistory } from 'react-router-dom';
import { find as _find } from 'lodash';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ParentSize } from '@vx/responsive';
import { Level } from 'common/level';
import { MAP_LEGEND } from 'common/metrics/location_summary';
import CountyMap from 'components/CountyMap/CountyMap';
import { LegendItem } from 'components/Map/Legend';
import { County } from 'components/LocationPage/ChartsHolder';
import US_STATE_DATASET from 'components/MapSelectors/datasets/us_states_dataset_01_02_2020.json';
import * as Style from './LocationMap.style';

const getCounty = (stateId: string, fullFips: string) =>
  _find(
    // @ts-ignore: US_STATE_DATASET is .js, but this is valid
    US_STATE_DATASET.state_county_map_dataset[stateId].county_dataset,
    ['full_fips_code', fullFips],
  );

const LEVELS = [
  Level.LOW,
  Level.MEDIUM,
  Level.MEDIUM_HIGH,
  Level.HIGH,
  Level.UNKNOWN,
];

// Note: There is no Level for "no data", and adding it to the MAP_LEGEND
// object would mean to add it for the metrics as well.
const LEGEND_ITEMS = [
  ...LEVELS.map(level => ({
    title: MAP_LEGEND[level].legend,
    color: MAP_LEGEND[level].color,
  })),
  {
    title: 'No data',
    color: '#e3e3e3',
  },
];

// On mobile, the order of the legend items needs to be changed so the items
// can be read vertically. It's easier to change the order of the items on
// mobile than setting the layout to work that way.
//
// The order of the items (reading from left to rigth and top to bottom)
// should be:
//
// 0. LOW           3. HIGH
// 1. MEDIUM        4. UNKNOWN
// 2. MEDIUM_HIGH   5. NO_DATA
const LEGEND_ITEMS_MOBILE = [
  LEGEND_ITEMS[0],
  LEGEND_ITEMS[3],
  LEGEND_ITEMS[1],
  LEGEND_ITEMS[4],
  LEGEND_ITEMS[2],
  LEGEND_ITEMS[5],
];

const LocationMap: React.FunctionComponent<{
  selectedCounty: County;
  setSelectedCounty: (input: string) => {};
  stateId: string;
}> = ({ selectedCounty, setSelectedCounty, stateId }) => {
  const history = useHistory();
  const theme = useTheme();

  const goTo = (route: string) => {
    history.push(route);
  };

  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const legendItems = isMobile ? LEGEND_ITEMS_MOBILE : LEGEND_ITEMS;

  const onClickCounty = (fullFips: string): void => {
    const county = getCounty(stateId, fullFips);
    goTo(`/us/${stateId.toLowerCase()}/county/${county.county_url_name}`);
    setSelectedCounty(county);
  };

  return (
    <Style.Container>
      <Grid container>
        <Grid item xs={12}>
          <Hidden smUp>
            <Style.MapTitle>COVID Threat Level</Style.MapTitle>
          </Hidden>
        </Grid>
        <Grid item xs={12} sm={8}>
          <ParentSize>
            {({ width }) => (
              // The map has a default aspect ratio of 800x600. Since the width is
              // determined by the device, we scale the height keeping the ratio.
              <div style={{ width, height: 0.75 * width }}>
                <CountyMap
                  selectedCounty={selectedCounty}
                  setSelectedCounty={onClickCounty}
                />
              </div>
            )}
          </ParentSize>
        </Grid>
        <Grid container item xs={12} sm={4} alignContent="space-between">
          <Grid item sm={12}>
            <Hidden xsDown>
              <Style.MapTitle>COVID Threat Level</Style.MapTitle>
            </Hidden>
          </Grid>
          <Grid container item sm={12}>
            {legendItems.map(({ title, color }, idx) => (
              <Grid item xs={6} sm={12} key={`legend-item-${idx}`}>
                <LegendItem title={title} color={color} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Style.Container>
  );
};

export default LocationMap;
