import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Card, CardContent, Grid } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { COLOR_MAP } from 'common/colors';
import { COLORS } from 'common';

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
  &:hover {
    border: 1px solid ${COLOR_MAP.GREEN.BASE};
  }
`;

export const StyledCardContent = styled(CardContent)`
  padding: 0 1.25rem;
  display: flex;

  &:last-child {
    padding: 0 1.25rem;
  }
`;

export const CardsWrapper = styled(Grid)`
  display: flex;
  flex-wrap: wrap;
`;

export const CardTitle = styled.h3`
  font-size: 1.25rem;
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
