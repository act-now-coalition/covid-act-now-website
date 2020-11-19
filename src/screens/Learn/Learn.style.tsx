import styled from 'styled-components';
import theme from 'assets/theme';
import { Heading1, Heading2, Heading3 } from 'components/Markdown';
import { mobileBreakpoint, materialSMBreakpoint } from 'assets/theme/sizes';

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
    margin: 1.5rem 0;
  }
`;
