import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import {
  materialSMBreakpoint,
  mobileBreakpoint,
  countyMapToFixedBreakpoint,
} from 'assets/theme/sizes';

export const MainWrapper = styled.div`
  padding: ${props => props.theme.spacingTheme.contentGutterMobile};
  background-color: ${COLOR_MAP.GREY_0};

  @media (min-width: ${mobileBreakpoint}) {
    padding: ${props => props.theme.spacingTheme.contentGutterDesktop};
  }
`;

export const ContentContainer = styled.div`
  margin: auto;
  width: 100%;
  max-width: ${props => props.theme.spacingTheme.locationPage.maxWidthContent};
`;

export const HeaderContainer = styled.div`
  padding-bottom: 0.5rem;

  @media (min-width: ${materialSMBreakpoint}) {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0.5rem;
    align-items: center;
  }

  @media (min-width: ${countyMapToFixedBreakpoint}) {
    align-items: start;
  }
`;
