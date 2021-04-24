import styled from 'styled-components';
import { HashLink } from 'react-router-hash-link';

/**
 * Create an off-screen link for accessibility devices
 */
export const StyledLink = styled(HashLink)`
  position: absolute;
  top: -40px;
  left: 0;
  background: #000000;
  color: white;
  padding: 8px;
  z-index: 100;
`;
