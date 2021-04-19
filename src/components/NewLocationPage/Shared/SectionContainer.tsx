/**
 * Parent div for each module on the new location page
 */

import React from 'react';
import { Container } from './Shared.style';

const SectionContainer: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default SectionContainer;
