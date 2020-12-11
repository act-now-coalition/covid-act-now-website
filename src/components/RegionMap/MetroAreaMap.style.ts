import styled from 'styled-components';
import { Geography } from 'react-simple-maps';
import { LocationSummary } from 'common/location_summaries';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import { COLOR_MAP } from 'common/colors';

export const MapContainer = styled.div`
  position: relative;
`;

// Setting tabIndex to -1 avoids the map from becoming a focus trap
const GeoPath = styled(Geography).attrs(props => ({
  tabIndex: -1,
  role: 'img',
}))``;

export const StateShape = styled(GeoPath)`
  fill: #ccc;
  stroke: none;
  &:hover {
    fill: #999;
  }
`;

export const StateBorder = styled(GeoPath)`
  fill: none;
  pointer-events: none;
  stroke: white;
  stroke-width: 2px;
`;

export const MetroCounty = styled(GeoPath)<{
  $locationSummary?: LocationSummary;
}>`
  fill: ${({ $locationSummary }) => getAlertColor($locationSummary)};
  stroke: #fff;
  stroke-width: 1;

  &:hover {
    fill-opacity: 0.4;
  }
`;

function getAlertColor(locationSummary?: LocationSummary) {
  return locationSummary
    ? LOCATION_SUMMARY_LEVELS[locationSummary.level].color
    : COLOR_MAP.GRAY.LIGHT;
}
