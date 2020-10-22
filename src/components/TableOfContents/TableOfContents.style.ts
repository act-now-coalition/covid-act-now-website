import styled from 'styled-components';
import theme from 'assets/theme';

export const Container = styled.nav`
  font-family: Roboto;
  font-weight: 400;
  line-height: 200%;
  letter-spacing: 0em;

  padding-bottom: ${theme.spacing(3)}px;
  border-bottom: solid 1px #ddd;

  ul {
    list-style-type: none;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0;
  }

  a {
    color: #00bfea;
    text-decoration: none;
  }
`;
