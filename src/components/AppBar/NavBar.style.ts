import styled from 'styled-components';
import MuiAppBar from '@material-ui/core/AppBar';
import MuiToolbar from '@material-ui/core/Toolbar';
import { NavLink as _NavLink } from 'react-router-dom';
import theme from 'assets/theme';

import { COLOR_MAP } from 'common/colors';

export const AppBar = styled(MuiAppBar)`
  border-bottom: solid 1px ${COLOR_MAP.LIGHTGRAY};
`;

export const Toolbar = styled(MuiToolbar)`
  min-height: 64px;
`;

export const NavLink = styled(_NavLink)`
  text-decoration: none;
  color: #000;
  margin-left: ${theme.spacing(2)}px;
  margin-right: ${theme.spacing(2)}px;
  // NavLink injects the "active" class when the route is a match
  &.active {
    font-weight: bold;
  }
`;

export const Spacer = styled.div`
  flex-grow: 1;
`;
