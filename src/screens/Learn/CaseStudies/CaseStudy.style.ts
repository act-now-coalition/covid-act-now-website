import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Card, CardContent, Grid } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { COLOR_MAP } from 'common/colors';
import { COLORS } from 'common';
import theme from 'assets/theme';
import { StylesH2 } from 'components/Markdown';

/*
 TODO (Chelsi): we're almost always removing the underline
 manually. Lets put this styled Link somewhere global ::
*/
export const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const StyledCard = styled(Card)`
  box-shadow: none;
  border: 1px solid ${COLORS.LIGHTGRAY};
  /* padding: ${theme.spacing(2)}px; */

  &:hover {
    border: 1px solid ${COLOR_MAP.GREEN.BASE};
  }
`;

export const StyledCardContent = styled(CardContent)`
  display: flex;
  padding: ${theme.spacing(2)}px;
`;

export const CardsWrapper = styled(Grid)`
  display: flex;
  flex-wrap: wrap;
`;

export const CardTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: #000;
`;

export const CardHalf = styled.div`
  &:last-child {
    display: flex;
    align-items: center;
    margin-left: 2rem;
  }
`;

export const ArrowIcon = styled(ArrowForwardIosIcon)`
  color: ${COLOR_MAP.GRAY_ICON};
  display: flex;
`;

export const Logo = styled.img.attrs(props => ({
  height: '50px',
}))``;

export const CardsContainer = styled(Grid).attrs(props => ({
  container: true,
  spacing: 1,
  alignItems: 'stretch',
}))`
  margin-bottom: ${theme.spacing(3)}px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const CategoryHeader = styled.h2`
  ${StylesH2};
  margin-bottom: ${theme.spacing(2)}px;
`;
