import styled from 'styled-components';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const RegionNameContainer = styled.div`
  text-align: center;
  @media (min-width: ${materialSMBreakpoint}) {
    text-align: left;
  }
`;

export const RegionNameText = styled.h1`
  font-weight: normal;
  font-size: 2rem;
  line-height: 1.3;
  margin: 0.1rem 0;
`;

export const MultiStateText = styled.div`
  font-size: 1rem;
  font-weight: 500;
`;
