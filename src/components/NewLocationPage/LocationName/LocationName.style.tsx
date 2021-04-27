import styled from 'styled-components';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const RegionContainer = styled.div`
  @media (max-width: ${materialSMBreakpoint}) {
    text-align: center;
  }
`;

export const RegionNameText = styled.div`
  font-size: 2rem;
  line-height: 128%;
`;

export const MultiStateText = styled.div`
  margin-top: 0.13rem;
  font-size: 1rem;
  font-weight: 500;
`;
