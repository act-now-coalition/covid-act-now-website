import styled from 'styled-components';
import { Geography } from 'react-simple-maps';

export const StateGeography = styled(Geography)`
  fill: #ddd;
`;

export const StateOutline = styled(Geography)`
  fill: none;
  pointer-events: none;
  stroke: white;
  stroke-width: 2px;
`;
