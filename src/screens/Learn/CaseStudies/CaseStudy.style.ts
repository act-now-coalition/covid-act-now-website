import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import theme from 'assets/theme';
import { StylesH2, StylesMarkdown } from 'components/Markdown';

export const Logo = styled.img.attrs(props => ({
  height: '50px',
}))``;

export const CategoryHeader = styled.h2`
  ${StylesH2};
  margin-bottom: ${theme.spacing(2)}px;
`;

/**
 * More studies in the category and additional resources
 */

export const LearnMoreSection = styled.div`
  margin-top: ${theme.spacing(4)}px;
`;

export const LearnMoreTitle = styled.h2`
  ${StylesH2}
`;

export const LearnMoreBody = styled.div`
  ${StylesMarkdown}
`;

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
