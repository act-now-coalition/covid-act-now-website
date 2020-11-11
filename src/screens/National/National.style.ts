import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import theme from 'assets/theme';
import { mobileBreakpoint } from 'assets/theme/sizes';

export const Placeholder = styled.div`
  padding: ${theme.spacing(2)}px;
  background-color: ${COLOR_MAP.LIGHTGRAY_BG};
  border: solid 1px ${COLOR_MAP.LIGHTGRAY};
  display: grid;
  place-items: center;
`;

export const PageContent = styled.main`
  margin: 0 ${theme.spacing(2)}px;
  margin-bottom: ${theme.spacing(4)}px;

  @media (min-width: ${mobileBreakpoint}) {
    max-width: ${mobileBreakpoint};
    margin: 0 auto;
    margin-bottom: ${theme.spacing(4)}px;
  }
`;
