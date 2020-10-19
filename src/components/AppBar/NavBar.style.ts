import styled, { css } from 'styled-components';
import MuiAppBar from '@material-ui/core/AppBar';
import MuiToolbar from '@material-ui/core/Toolbar';
import { NavLink as _NavLink } from 'react-router-dom';
import theme from 'assets/theme';
import palette from 'assets/theme/palette';

import { COLOR_MAP } from 'common/colors';

export const AppBar = styled(MuiAppBar)`
  border-bottom: solid 1px ${COLOR_MAP.LIGHTGRAY};
  background-color: white;
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
    color: ${palette.secondary.main};
    border-bottom: solid 2px ${palette.secondary.main};
  }
`;

export const NavLink = styled(_NavLink)`
  ${TabStyle}
`;

export const TabLink = styled.a`
  ${TabStyle}
`;

export const Spacer = styled.div`
  flex-grow: 1;
`;
