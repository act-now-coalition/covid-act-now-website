import styled from 'styled-components';

import { mobileBreakpoint } from 'assets/theme/sizes';

export const Wrapper = styled.div `
  background-color: white;
  padding: 1rem 2rem;
  min-height: calc(100vh - 64px);

  @media (min-width: ${mobileBreakpoint}) {
    padding: 40px;
  }
`;

export const Content = styled.div `
  max-width: 900px;
  margin: auto;
`;
