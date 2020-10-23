import styled from 'styled-components';
import { mobileBreakpoint } from 'assets/theme/sizes';

export const Sidebar = styled.div`
  flex: 0 0 auto;
`;

export const MobileOnly = styled.div`
  display: initial;
  @media (min-width: ${mobileBreakpoint}) {
    display: none;
  }
`;

export const DesktopOnly = styled.div`
  display: none;
  @media (min-width: ${mobileBreakpoint}) {
    display: flex;
  }
`;
