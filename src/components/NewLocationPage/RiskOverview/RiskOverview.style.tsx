import styled from 'styled-components';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${materialSMBreakpoint}) {
    flex-direction: row;
  }
`;

export const Section = styled.div`
  flex-direction: column;

  @media (min-width: ${materialSMBreakpoint}) {
    flex-direction: row;
  }
`;

export const MultiStatsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${materialSMBreakpoint}) {
    flex-direction: row;
  }
`;

export const Item = styled.div`
  border: 1px solid red;
`;
