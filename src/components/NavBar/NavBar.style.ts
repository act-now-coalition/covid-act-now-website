import styled, { css } from 'styled-components';
import MuiAppBar from '@material-ui/core/AppBar';
import MuiToolbar from '@material-ui/core/Toolbar';
import { NavLink as _NavLink } from 'react-router-dom';
import MuiMenuIcon from '@material-ui/icons/Menu';
import MuiCloseIcon from '@material-ui/icons/Close';
import MuiIconButton from '@material-ui/core/IconButton';
import theme from 'assets/theme';
import palette from 'assets/theme/palette';
import { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint, mobileBreakpoint } from 'assets/theme/sizes';

export const desktopNavHeight = 84;

export const AppBar = styled(MuiAppBar)`
  border-bottom: solid 1px ${COLOR_MAP.GREY_1};
  background-color: white;
`;

export const Toolbar = styled(MuiToolbar)`
  min-height: ${desktopNavHeight}px;
`;

export const TabStyle = css`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 1rem;
  font-weight: bold;
  padding-left: ${theme.spacing(2)}px;
  padding-right: ${theme.spacing(2)}px;

  min-height: ${desktopNavHeight}px;
  display: flex;
  align-items: center;

  text-decoration: none;
  color: #000;
  border-bottom: solid 2px transparent;

  &:hover {
    color: ${palette.secondary.main};
  }

  // NavLink injects the "active" class when the route is a match
  &.active {
    border-bottom: solid 2px ${palette.secondary.main};
  }
`;

export const Spacer = styled.div`
  flex-grow: 1;
`;

export const BackLink = styled(_NavLink)`
  margin-right: ${theme.spacing(2)}px;
  color: black;
  svg {
    width: 32px;
    height: 32px;
  }
`;

export const IconButton = styled(MuiIconButton).attrs(props => ({
  disableRipple: true,
  disableFocusRipple: true,
}))`
  ${props => props.theme.fonts.regularBookMidWeight};
  color: black;
  font-size: 1rem;
  line-height: 1.4rem;
  padding: 1rem;

  &:focus-visible {
    outline: rgb(0, 95, 204) 1px auto;
  }

  &:hover {
    border-radius: 4px;
  }

  @media (min-width: ${materialSMBreakpoint}) {
    padding: 0.5rem 0.75rem;
  }
`;

export const CloseIcon = styled(MuiCloseIcon)`
  color: ${COLOR_MAP.BLACK};
`;

export const MenuIcon = styled(MuiMenuIcon)`
  color: ${COLOR_MAP.BLACK};
`;

export const MenuLabel = styled.span`
  display: none;

  @media (min-width: ${mobileBreakpoint}) {
    display: inherit;
    margin-right: 0.5rem;
  }
`;

// Location page:
export const GridContainer = styled.div`
  display: grid;
  grid-auto-columns: min-content auto auto min-content;
  align-items: center;
  width: 100%;

  @media (min-width: ${mobileBreakpoint}) {
    grid-auto-columns: min-content min-content 1fr min-content min-content;
    grid-gap: 1rem;
  }
`;

const row = css`
  grid-row: 1;
`;

export const GridItemBackLink = styled.div`
  ${row};
  grid-column: 1/2;
`;

export const GridItemLogo = styled.div<{ hasScrolled: boolean }>`
  ${row};
  grid-column: 2/3;
  display: ${({ hasScrolled }) => hasScrolled && 'none'};

  @media (min-width: ${mobileBreakpoint}) {
    display: inherit;
  }
`;

export const GridItemSearch = styled.div<{ hasScrolled: boolean }>`
  ${row};
  grid-column: ${({ hasScrolled }) => (hasScrolled ? '2/4' : '3/4')};

  @media (min-width: ${mobileBreakpoint}) {
    grid-column: 1/6;
  }
`;

export const GridItemSecondaryEl = styled.div`
  ${row};
  grid-column: 4/5;
  display: none;

  @media (min-width: ${mobileBreakpoint}) {
    display: inherit;
  }
`;

export const GridItemMenuIcon = styled.div`
  ${row};
  grid-column: 4/5;

  @media (min-width: ${mobileBreakpoint}) {
    grid-column: 5/6;
  }
`;
