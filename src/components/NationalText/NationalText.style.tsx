import styled from 'styled-components';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const Wrapper = styled.div`
  max-width: 600px;
  margin: 1rem auto 1.5rem;

  p {
    margin: 0;
  }

  @media (min-width: ${materialSMBreakpoint}) {
    text-align: center;
  }
`;
