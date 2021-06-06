import styled, { css } from 'styled-components';
import {
  materialSMBreakpoint,
  countyMapToFixedBreakpoint,
} from 'assets/theme/sizes';
import { FixedAspectRatioContainer } from 'components/FixedAspectRatio/FixedAspectRatio.style';

const desktopMapWidth = 320;

export const PinnedContainer = css`
  position: fixed;
  // top: 116px; // navBar height (84) + above the fold top padding (2rem)
  // right: 40px;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.08);
  z-index: 901;
`;

export const MapContainer = styled.div`
  width: 100%;
  background: white;
  border-radius: 4px;

  ${FixedAspectRatioContainer} {
    border-radius: 4px;
  }

  @media (min-width: ${materialSMBreakpoint}) {
    width: ${desktopMapWidth}px;
  }

  @media (min-width: ${countyMapToFixedBreakpoint}) {
    ${PinnedContainer};
  }
`;
