import styled from 'styled-components';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const BlockContainer = styled.div`
  margin: 3rem 1rem 0;

  @media (min-width: ${materialSMBreakpoint}) {
    margin-top: 4.5rem;
  }

  @media (min-width: 932px) {
    max-width: 900px;
    margin: 4.25rem auto 0;
  }

  @media (min-width: 1350px) {
    margin: 4.25rem 445px 0 auto;
  }

  @media (min-width: 1750px) {
    margin: 4.25rem auto 0;
  }

  @media print {
    margin: 0 auto;
    padding: 0 1rem;
  }
`;
