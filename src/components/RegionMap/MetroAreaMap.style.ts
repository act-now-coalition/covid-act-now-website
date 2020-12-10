import styled from 'styled-components';
import { Geography } from 'react-simple-maps';

const GeoPath = styled(Geography).attrs(props => ({
  tabIndex: -1,
  role: 'img',
}))``;

export const StateShape = styled(GeoPath)`
  fill: #ccc;
  stroke: none;
`;

export const StateBorder = styled(GeoPath)`
  fill: none;
  pointer-events: none;
  stroke: white;
  stroke-width: 2px;
`;

export const MetroCounty = styled(GeoPath)`
  fill: #333;
  stroke: #fff;
  stroke-width: 1;
`;
