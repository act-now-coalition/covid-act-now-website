import styled from 'styled-components';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const BlockWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: fit-content;

  @media (min-width: ${materialSMBreakpoint}) {
    flex-direction: row;
    align-items: center;
  }
`;

export const Section = styled.div`
  display: flex;
  &:first-child {
    margin-top: 1rem;
    justify-content: center;
  }

  @media (min-width: ${materialSMBreakpoint}) {
    &:first-child {
      margin-right: 1.25rem;
      margin-top: 0;
    }
  }
`;
