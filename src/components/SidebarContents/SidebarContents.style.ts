import styled from 'styled-components';
import { NavHashLink } from 'react-router-hash-link';
import { COLOR_MAP } from 'common/colors';
import theme from 'assets/theme';

export const ItemList = styled.ul`
  list-style-type: none;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  padding-inline-start: 0;
  li {
    margin-bottom: ${theme.spacing(3)}px;
  }
`;

export const NavLink = styled(NavHashLink).attrs(props => ({
  activeClassName: 'active',
}))`
  text-decoration: none;
  padding-left: ${theme.spacing(3)}px;
  border-left: solid 3px transparent;
  color: #000;
  font-family: Roboto;
  font-weight: bold;

  &.active {
    font-weight: bold;
    color: ${COLOR_MAP.GREEN.BASE};
    border-left: solid 3px ${COLOR_MAP.GREEN.BASE};
  }
`;
