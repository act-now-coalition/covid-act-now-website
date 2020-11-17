import styled from 'styled-components';
import { Heading2, Heading3 } from 'components/Markdown';
import { COLORS } from 'common';
import { mobileBreakpoint } from 'assets/theme/sizes';

export const SectionName = styled(Heading2)`
  font-size: 1.25rem;
  padding: 2rem 0 1.5rem;

  &:first-of-type {
    margin-top: 0;
  }

  &:not(:first-of-type) {
    border-top: 1px solid ${COLORS.LIGHTGRAY};
  }

  @media (min-width: ${mobileBreakpoint}) {
    &:first-of-type {
      margin-top: 2rem;
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

export const ItemsContainer = styled.div`
  padding: 0 0.5rem;

  @media (min-width: ${mobileBreakpoint}) {
    padding: 0 1.25rem;
  }
`;
