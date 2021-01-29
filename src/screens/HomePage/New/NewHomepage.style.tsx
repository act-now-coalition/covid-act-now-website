import styled from 'styled-components';
import { mobileBreakpoint, materialSMBreakpoint } from 'assets/theme/sizes';
import {
  StyledLink,
  SkeletonWrapper,
} from 'components/RegionItem/RegionItem.style';

export const ColumnCentered = styled.div<{ topBottomSpacing?: boolean }>`
  display: flex;
  margin: ${({ topBottomSpacing }) =>
    topBottomSpacing ? '1rem auto' : 'auto'};
  width: fit-content;
  flex-direction: column;
`;

export const Content = styled.div`
  max-width: 1000px;
  margin: auto auto 3rem;
`;

export const SectionWrapper = styled.div`
  margin-bottom: 2.5rem;
`;

export const Section = styled.div`
  margin-bottom: 2.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
  @media (min-width: ${mobileBreakpoint}) {
    margin-left: 0;
    margin-right: 0;
  }
`;

export const RegionItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin: auto;

  ${StyledLink},${SkeletonWrapper} {
    &:last-of-type {
      margin: .5rem 0 2.5rem;
    }
  }

  @media (min-width: ${materialSMBreakpoint}) {
    flex-direction: row;

    ${StyledLink},${SkeletonWrapper} {
      &:last-of-type {
        margin: 0 0 0 1.5rem;
      }
    }
  }
`;
