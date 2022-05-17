import styled, { css } from 'styled-components';
import {
  materialSMBreakpoint,
  countyMapToFixedBreakpoint,
} from 'assets/theme/sizes';
import { FixedAspectRatioContainer } from 'components/FixedAspectRatio/FixedAspectRatio.style';
import { Label } from 'components/HorizontalThermometer/CommunityLevelThermometer/CommunityLevelThermometer.style';

export const PinnedContainer = css`
  position: fixed;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.08);
  z-index: 901;
`;

export const MapContainer = styled.div<{ offsetMap: boolean }>`
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
    transform: ${({ offsetMap }) =>
      offsetMap ? 'translateY(-200px)' : 'none'};
  }
`;

export const ThermometerContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ToggleWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const VaccinationsThermLabel = styled(Label)`
  margin-right: 1rem;
  line-height: 1.1rem;
`;
