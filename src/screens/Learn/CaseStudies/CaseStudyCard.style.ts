import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { COLOR_MAP } from 'common/colors';
import { COLORS } from 'common';
import theme from 'assets/theme';
import { MarkdownContent, Heading3 } from 'components/Markdown';

/*
 TODO (Chelsi): we're almost always removing the underline
 manually. Lets put this styled Link somewhere global ::
*/
export const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

export const ArrowIcon = styled(ArrowForwardIosIcon)`
  color: ${COLOR_MAP.GRAY_ICON};
  display: flex;
  width: 14px;
  height: 14px;
  margin-top: 0.33rem;
  margin-left: 0.5rem;
`;

export const StyledCard = styled(Card)`
  box-shadow: none;
  border: 1px solid ${COLORS.LIGHTGRAY};

  p {
    margin-bottom: 0;
  }

  h3 {
    margin: 0.75rem 0;
  }

  &:hover {
    border: 1px solid ${COLOR_MAP.GRAY.DARK};
    /* Highlights the arrow icon on hover */
    ${ArrowIcon} {
      color: ${COLOR_MAP.GRAY.DARK};
    }
  }
`;

export const StyledCardContent = styled(CardContent)`
  display: flex;
  padding: 1rem 1.25rem;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

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
`;

export const ReadMoreContainer = styled.div`
  display: flex;
  margin-top: 1rem;

  p {
    color: ${COLOR_MAP.BLUE};
  }
`;
