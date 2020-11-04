import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import theme from 'assets/theme';
import { COLOR_MAP } from 'common/colors';
import { NavHashLink } from 'react-router-hash-link';
import { scrollWithOffset } from 'components/TableOfContents';

const topBarHeight = 64;

const fontCss = css`
  font-family: Roboto;
  font-size: 15px;
  font-weight: 400;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
`;

export const TopLevelList = styled.ul`
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

export const TopLevelLink = styled(NavLink).attrs(props => ({
  activeClassName: 'active',
}))`
  ${fontCss}
  text-decoration: none;
  padding-left: ${theme.spacing(3)}px;
  border-left: solid 3px transparent;
  &.active {
    font-weight: bold;
    color: #000;
    border-left: solid 3px ${COLOR_MAP.GREEN.BASE};
  }
`;

export const InnerLevelLink = styled(NavHashLink).attrs(props => ({
  activeClassName: 'active',
  scroll: elem => scrollWithOffset(elem, -(topBarHeight + theme.spacing(2))),
}))`
  ${fontCss}
  text-decoration: none;
  &.active {
    font-weight: bold;
    color: #000;
  }
`;

export const InnerList = styled.ul`
  ${fontCss}
  list-style-type: none;
  margin-top: ${theme.spacing(2)}px;
  padding-inline-start: ${theme.spacing(2) + theme.spacing(3)}px;
  li {
    margin-bottom: ${theme.spacing(2)}px;
  }
`;
