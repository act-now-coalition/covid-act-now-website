import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import theme from 'assets/theme';

export const LogoContainer = styled.div`
  max-height: 64px;
  max-width: 160px;
  margin: ${theme.spacing(3)}px 0;

  img {
    width: auto;
    max-height: 64px;
  }
`;

export const Logo = styled.img``;

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
  margin-top: 0.75rem;
  &:last-child {
    margin-bottom: 0;
  }
`;
