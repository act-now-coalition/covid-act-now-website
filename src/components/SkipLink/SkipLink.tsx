import React from 'react';
import { StyledLink } from './SkipLink.style';

/**
 * Creates a skip link to allow accessibility devices to quickly jump past
 * the header to the main content
 */

const SkipLink = () => {
  return <StyledLink to="#main">Skip to main</StyledLink>;
};

export default SkipLink;
