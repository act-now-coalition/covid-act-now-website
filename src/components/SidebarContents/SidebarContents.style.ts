import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import theme from 'assets/theme';
import { COLOR_MAP } from 'common/colors';
import { NavHashLink } from 'react-router-hash-link';
import { scrollWithOffset } from 'components/TableOfContents';
import ScrollSpy from 'react-scrollspy';

const topBarHeight = 64;

const fontCss = css`
  font-family: Roboto;
  font-size: 15px;
  font-weight: 400;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
`;

const activeCss = css`
  font-weight: bold;
  color: #000;
`;

export const TopLevelList = styled.ul`
  list-style-type: none;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  padding-inline-start: 0;
  margin-top: 1.25rem;
  li {
    margin-bottom: 1rem;
  }
`;

export const TopLevelLink = styled(NavLink).attrs(props => ({
  activeClassName: 'active',
}))`
  ${fontCss}
  text-decoration: none;
  padding-left: 1.25rem;
  border-left: solid 3px transparent;
  &.active {
    ${activeCss}
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
    ${activeCss}
  }
`;

export const InnerList = styled(ScrollSpy)`
  ${fontCss}
  list-style-type: none;
  margin-top: ${theme.spacing(2)}px;
  padding-inline-start: ${theme.spacing(2) + theme.spacing(3)}px;
  li {
    margin-bottom: ${theme.spacing(2)}px;
    &.active a {
      ${activeCss}
    }
  }
`;
