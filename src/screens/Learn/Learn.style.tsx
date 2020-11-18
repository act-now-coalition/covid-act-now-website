import styled from 'styled-components';
import theme from 'assets/theme';
import { Heading2, Heading3 } from 'components/Markdown';
import { mobileBreakpoint } from 'assets/theme/sizes';

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
    margin: 3rem 0 2rem;

    &:first-of-type {
      margin-top: 3.25rem;
    }
  }
`;

export const ItemName = styled(Heading3)`
  font-size: 1rem;
  margin: 1rem 0;

  &:not(:first-of-type) {
    margin-top: 2.5rem;
  }
`;

export const ItemsContainer = styled.div``;
