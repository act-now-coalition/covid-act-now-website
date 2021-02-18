import styled, { css } from 'styled-components';
import { MarkdownContent, Heading3 } from 'components/Markdown';
import { COLOR_MAP } from 'common/colors';

export const Container = styled.div``;

const listWithCheckmark = css`
  ul > li::marker {
    content: '✓  ';
    color: ${COLOR_MAP.GREEN.BASE};
  }
`;

export const PhaseDescription = styled(MarkdownContent)<{
  $currentlyEligible: boolean;
}>`
  ul {
    margin: 12px auto;
    margin-inline-start: 1em;
    padding-inline-start: 0.5em;
  }

  ${props => (props.$currentlyEligible ? listWithCheckmark : '')}
`;

export const PhaseTitle = styled(Heading3)`
  margin-bottom: 4px;
`;

export const StyledEligibilityPanel = styled.div``;

export const StartDate = styled.span`
  color: ${COLOR_MAP.GREY_4};
  font-size: 13px;
`;
