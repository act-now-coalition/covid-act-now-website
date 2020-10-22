import styled from 'styled-components';
import theme from 'assets/theme';
import { COLOR_MAP } from 'common/colors';

export const Container = styled.nav`
  font-family: Roboto;
  font-weight: 400;

  ul {
    list-style-type: none;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-inline-start: 0;

    li {
      margin-bottom: ${theme.spacing(3)}px;
    }
  }

  a {
    font-size: 16px;
    font-weight: 700;
    color: #000;
    text-decoration: none;

    padding-left: ${theme.spacing(3)}px;
    border-left: solid 3px transparent;

    &.active {
      color: ${COLOR_MAP.GREEN.BASE};
      border-left: solid 3px ${COLOR_MAP.GREEN.BASE};
    }
  }
`;
