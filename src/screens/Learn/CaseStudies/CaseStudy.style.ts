import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import theme from 'assets/theme';
import { MarkdownContent } from 'components/Markdown';

export const Logo = styled.img.attrs(props => ({
  height: '50px',
}))``;

/**
 * More studies in the category and additional resources
 */

export const LearnMoreSection = styled.div`
  margin-top: ${theme.spacing(4)}px;
`;

export const CardsContainer = styled(Grid).attrs(props => ({
  container: true,
  alignItems: 'stretch',
}))`
  margin-bottom: ${theme.spacing(3)}px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const Author = styled(MarkdownContent)`
  margin-bottom: 1.5rem;

  p {
    font-size: 14px;
  }
`;
