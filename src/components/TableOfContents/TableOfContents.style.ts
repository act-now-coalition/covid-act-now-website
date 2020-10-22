import styled from 'styled-components';
import theme from 'assets/theme';
import { COLOR_MAP } from 'common/colors';

export const Container = styled.nav`
  font-family: Roboto;
  font-weight: 400;
  line-height: 200%;

  padding-bottom: ${theme.spacing(3)}px;
  border-bottom: solid 1px ${COLOR_MAP.LIGHTGRAY};

  ul {
    list-style-type: none;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-inline-start: 0;
  }

  a {
    color: ${COLOR_MAP.BLUE};
    text-decoration: none;
  }
`;
