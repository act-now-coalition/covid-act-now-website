import styled, { css } from 'styled-components';
import {
  materialSMBreakpoint,
  countyMapToFixedBreakpoint,
} from 'assets/theme/sizes';
import { FixedAspectRatioContainer } from 'components/FixedAspectRatio/FixedAspectRatio.style';

export const PinnedContainer = css`
  position: fixed;
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
    width: ${props => props.theme.spacingTheme.locationPage.mapWidthDesktop};
  }

  @media (min-width: ${countyMapToFixedBreakpoint}) {
    ${PinnedContainer};
  }
`;

export const ThermometerContainer = styled.div`
  padding: 1rem;
`;
