import styled, { css } from 'styled-components';
import { materialSMBreakpoint } from 'assets/theme/sizes';

const desktopMapWidth = 320;

export const PinnedContainer = css`
  position: fixed;
  top: 80px;
  right: 16px;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.08);
  z-index: 901;
`;

export const MapContainer = styled.div`
  width: 100%;

  @media (min-width: ${materialSMBreakpoint}) {
    width: ${desktopMapWidth}px;
  }

  @media (min-width: 1350px) {
    ${PinnedContainer};
  }
`;
