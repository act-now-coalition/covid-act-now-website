import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';
import { MarkdownContent } from 'components/Markdown';

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: ${materialSMBreakpoint}) {
    width: 50%;

    &:first-of-type {
      padding: 0 0.75rem 0 0.5rem;
    }

    &:last-of-type {
      padding: 0 0.5rem 0 0.75rem;
    }
  }
`;

export const RecommendationItem = styled.div<{ highlight: boolean }>`
  display: flex;
  padding: 0.75rem;
  align-items: flex-start;
  background-color: ${({ highlight }) =>
    highlight && `${COLOR_MAP.LIGHT_YELLOW}`};
  border-radius: 4px;

  @media (min-width: ${materialSMBreakpoint}) {
    padding: 0.5rem 0.25rem;
  }
`;

export const RecommendationsContainer = styled.div`
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  padding: 1.5rem;
  flex-direction: column;

  max-width: 900px;
  width: 100%;

  @media (min-width: ${materialSMBreakpoint}) {
    flex-direction: row;
  }
`;

export const RecommendationBody = styled(MarkdownContent)`
  margin: auto 0;

  p,
  ul,
  li {
    line-height: 1.4;
    margin: 0;
    color: ${COLOR_MAP.GRAY_BODY_COPY};
  }

  strong {
    color: black;
  }

  a {
    text-decoration: underline;
    color: ${COLOR_MAP.BLUE};
    &:hover {
      color: ${COLOR_MAP.BLUE};
    }
  }
`;

export const Icon = styled.img`
  margin-right: 1.25rem;
  min-width: 2rem;
`;
