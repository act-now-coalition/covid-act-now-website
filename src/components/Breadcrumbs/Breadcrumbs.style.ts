import styled from 'styled-components';
import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs';
import { NavLink } from 'react-router-dom';
import { COLOR_MAP } from 'common/colors';

export const Breadcrumbs = styled(MuiBreadcrumbs)``;

export const BreadcrumbLink = styled(NavLink)`
  color: #000;
  text-decoration: none;

  &.active {
    color: ${COLOR_MAP.GREEN.BASE};
    font-weight: bold;
  }
`;
