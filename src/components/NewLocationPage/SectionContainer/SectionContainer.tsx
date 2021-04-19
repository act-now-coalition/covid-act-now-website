/**
 * Parent div for each module on the new location page
 */

import React from 'react';
import styled from 'styled-components';
import { mobileBreakpoint } from 'assets/theme/sizes';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 4px;
  padding: 1.25rem;

  @media (min-width: ${mobileBreakpoint}) {
    padding: 1.5rem;
  }
`;

const SectionContainer: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default SectionContainer;
