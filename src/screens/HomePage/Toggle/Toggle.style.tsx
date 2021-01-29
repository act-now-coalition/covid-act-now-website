import styled from 'styled-components';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const Wrapper = styled.div`
  margin: auto;

  @media (min-width: ${materialSMBreakpoint}) {
    width: fit-content;
    padding: 0.75rem 2.25rem;
    border-radius: 4px;
    margin: 3rem auto 0;
  }
`;
