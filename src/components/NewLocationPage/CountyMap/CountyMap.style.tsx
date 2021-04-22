import styled, { css } from 'styled-components';

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

  @media (min-width: 600px) {
    width: ${desktopMapWidth}px;
  }

  @media (min-width: 1350px) {
    ${PinnedContainer};
  }
`;

// The default aspect-ratio for the state and US maps is 800x600, so we
// can use the width to calculate the height of the map container, which
// makes it possible to center it vertically.
export const MapContainerInner = styled.div<{ mapWidth: number }>`
  width: ${({ mapWidth }) => `${mapWidth}px`};
  height: ${({ mapWidth }) => `${0.75 * mapWidth}px`};
`;
