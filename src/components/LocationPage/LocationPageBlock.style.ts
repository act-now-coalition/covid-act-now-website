import styled from 'styled-components';
import {
  materialSMBreakpoint,
  countyMapToFixedBreakpoint,
} from 'assets/theme/sizes';

export const BlockContainer = styled.div`
  flex: 0 0 40vw;
  zoom: 0.75;
  margin-right: 2rem;
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
`;

export const WidthContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
