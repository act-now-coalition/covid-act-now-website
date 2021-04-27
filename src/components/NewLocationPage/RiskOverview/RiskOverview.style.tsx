import styled from 'styled-components';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Section1 = styled.div`
  display: flex;
`;

export const Item = styled.div`
  border: 1px solid red;
`;

export const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${materialSMBreakpoint}) {
    flex-direction: row;
  }
`;

export const Section2 = styled.div`
  flex-direction: column;

  @media (min-width: ${materialSMBreakpoint}) {
    flex-direction: row;
  }
`;

export const NonVaxStats = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${materialSMBreakpoint}) {
    flex-direction: row;
  }
`;
