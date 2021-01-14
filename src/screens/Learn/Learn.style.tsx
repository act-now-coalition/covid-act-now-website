import styled from 'styled-components';
import theme from 'assets/theme';
import {
  Heading1,
  Heading2,
  Heading3,
  MarkdownContent,
  Paragraph,
} from 'components/Markdown';
import { mobileBreakpoint, materialSMBreakpoint } from 'assets/theme/sizes';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { COLOR_MAP } from 'common/colors';
import { COLORS } from 'common';

/**
 * Styles that are shared between Learn pages
 */

export const BreadcrumbsContainer = styled.div`
  margin-bottom: ${theme.spacing(2)}px;
`;

export const ButtonContainer = styled.div`
  margin-top: ${theme.spacing(2)}px;
  margin-bottom: ${theme.spacing(6)}px;
`;

export const SectionName = styled(Heading2)`
  margin: 2rem 0 1rem;

  &:first-of-type {
    margin-top: 2.5rem;
  }

  @media (min-width: ${mobileBreakpoint}) {
    margin: 2.5rem 0 1.5rem;

    &:first-of-type {
      margin-top: 3.25rem;
    }
  }
`;

export const ItemName = styled(Heading3)`
  margin: 1rem 0;

  &:not(:first-of-type) {
    margin-top: 2.5rem;
  }
`;

export const ItemsContainer = styled.div``;

export const LearnHeading1 = styled(Heading1)`
  margin: 0 0 1.5rem;

  @media (min-width: ${materialSMBreakpoint}) {
    margin: 1.5rem 0 2.5rem;
  }
`;

export const SmallSubtext = styled(MarkdownContent)`
  margin-bottom: 2rem;

  p {
    font-size: 14px;
  }
`;

export const LastUpdatedDate = styled(Paragraph)`
  font-size: 0.875rem;
`;

/* Used for case studies landing + covid explained landing: */
export const CardsContainer = styled(Grid).attrs(props => ({
  container: true,
  alignItems: 'stretch',
}))`
  margin-bottom: ${theme.spacing(3)}px;
  margin-top: 0.75rem;
  &:last-child {
    margin-bottom: 0;
  }
`;

/*
 TODO (Chelsi): we're almost always removing the underline
 manually. Lets put this styled Link somewhere global ::
*/
export const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

/* These styles are used for the cards on CE landing (and eventually case studies landing): */

export const ArrowIcon = styled(ArrowForwardIosIcon)`
  color: ${COLOR_MAP.GRAY_ICON};
  display: flex;
  width: 16px;
  height: 16px;
  margin-left: 1.25rem;
`;

export const StyledCard = styled(Card)<{ borderTop?: boolean }>`
  box-shadow: none;
  border-bottom: 1px solid ${COLORS.LIGHTGRAY};
  border-radius: unset;

  :first-of-type {
    border-top: ${({ borderTop }) =>
      borderTop && `1px solid ${COLORS.LIGHTGRAY}`};
  }

  :last-of-type {
    border-bottom: none;
  }

  p {
    margin-bottom: 0;
  }

  h3 {
    margin: 0.75rem 0;
  }

  &:hover {
    background-color: ${COLOR_MAP.LIGHTGRAY_BG};
    ${ArrowIcon} {
      color: ${COLOR_MAP.GRAY.DARK};
    }
  }
`;

export const StyledCardContent = styled(CardContent)`
  display: flex;
  padding: 1.25rem 0.75rem;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
  align-items: center;

  &:last-child {
    padding-bottom: 1rem;
  }
`;

export const CardLogo = styled.img.attrs(props => ({
  height: 28,
}))`
  max-height: 40px;
  max-width: 90px;
  height: auto;
  width: auto;
  margin-bottom: 0.25rem;
`;

export const CardTitle = Heading3;

export const CardBody = styled(MarkdownContent)``;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: ${theme.spacing(2)}px;
`;

export const CopyContainer = styled.div`
  flex-direction: column;

  ${Heading3} {
    margin-top: 0;
    line-height: 1.4;
  }
`;

export const ReadMoreContainer = styled.div`
  display: flex;
  margin-top: 1rem;

  p {
    color: ${COLOR_MAP.BLUE};
  }
`;
