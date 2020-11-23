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
import { mobileBreakpoint, smallPhoneBreakpoint } from 'assets/theme/sizes';

export const AppBar = styled(MuiAppBar)`
  border-bottom: solid 1px ${COLOR_MAP.LIGHTGRAY};
  background-color: white;
`;

export const StyledMobileMenu = styled.nav`
  display: inherit;
  @media print {
    display: none;
  }
`;

export const Toolbar = styled(MuiToolbar)`
  min-height: 64px;
`;

export const TabStyle = css`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 1rem;
  font-weight: bold;
  margin-left: ${theme.spacing(2)}px;
  margin-right: ${theme.spacing(2)}px;

  text-decoration: none;
  color: #000;
  border-bottom: solid 2px transparent;

  // NavLink injects the "active" class when the route is a match
  &.active {
    color: ${palette.primary.main};
    border-bottom: solid 2px ${palette.primary.main};
  }
`;

export const NavLink = styled(_NavLink).attrs(props => ({
  activeClassName: 'active',
}))`
  ${TabStyle}
`;

export const TabLink = styled.a`
  ${TabStyle}
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

export const StyledMenu = styled.nav<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  background: #f2f2f2;
  border-top: 1px solid #e3e3e3;
  transform: ${({ open }) => (open ? 'translateY(64px)' : 'translateY(-100%)')};
  /* height: 100vh; */
  text-align: left;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;

  a {
    cursor: pointer;
    font-size: 1rem;
    color: ${palette.black};
    text-decoration: none;
    font-weight: bold;
    padding: 1.75rem 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    background: white;

    &:hover,
    &:active {
      background: #f2f2f2;
    }

    display: flex;
    align-items: center;

    svg {
      margin-right: 1rem;
    }
  }

  // Mobile menu was larger than an iPhone5 screen (320px wide)
  // Dropping the padding for screens up until that width
  @media (min-width: ${smallPhoneBreakpoint}) {
    a {
      padding: 2rem 1rem;
    }
  }
`;

export const MobileOnly = styled.div`
  display: flex;
  align-items: center;
  @media (min-width: ${mobileBreakpoint}) {
    display: none;
  }
`;

export const DesktopOnly = styled.div`
  display: none;
  @media (min-width: ${mobileBreakpoint}) {
    display: flex;
    align-items: center;
  }
`;

export const IconButton = styled(MuiIconButton).attrs(props => ({
  disableRipple: true,
  disableFocusRipple: true,
}))`
  &:focus {
    outline: rgb(0, 95, 204) 1px auto;
  }
`;

export const CloseIcon = styled(MuiCloseIcon)`
  color: #000;
`;

export const MenuIcon = styled(MuiMenuIcon)`
  color: #000;
`;
