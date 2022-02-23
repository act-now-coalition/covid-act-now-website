import styled, { css } from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';
import { MarkdownContent, anchorStyles } from 'components/Markdown';
import { FilledButton, OutlinedButton } from 'components/ButtonSystem';

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
  padding: 0.75rem;
  flex-direction: column;

  max-width: 900px;
  width: 100%;

  @media (min-width: ${materialSMBreakpoint}) {
    border: 1px solid ${COLOR_MAP.GREY_2};
    flex-direction: row;
    padding: 1rem 1rem 0 1rem;
  }
`;

export const RecommendationContent = styled.div``;

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

  ${anchorStyles};
`;

export const Icon = styled.img`
  margin-right: 1.25rem;
  min-width: 2rem;
`;

export const ButtonStyles = css`
  width: 100%;
  margin: 0.5rem 0;

  @media (min-width: ${materialSMBreakpoint}) {
    width: initial;
    margin: 0.75rem 0 1rem 0;
  }
`;

export const StyledFilledButton = styled(FilledButton)`
  ${ButtonStyles};
`;

export const StyledOutlinedButton = styled(OutlinedButton)`
  ${ButtonStyles};
`;
